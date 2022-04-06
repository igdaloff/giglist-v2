import React, { useState, useEffect } from 'react';
import { Header } from './Components/Header';
import { CitySelect } from './Components/CitySelect';
import { SpotifyEmbed } from './Components/SpotifyEmbed';

const cityOptions = {
  "new-york": {
    label: "New York",
    value: "new-york",   
    id: 7644
  },
  "los-angeles": {
    label: "Los Angeles",
    value: "los-angeles",    
    id: 17835
  },
  "columbus": {
    label: "Columbus",
    value: "columbus",   
    id: 9480
  }
};


//Generate the Songkick API url (MOVE THIS INTO CUSTOM HOOK AND SEPARATE FILE EVENTUALLY)
function getSongkickUrl(songkickCityId){   
  const songkickAPIKey = process.env.REACT_APP_SONGKICK_API_KEY;
  let songkickUrl = "https://api.songkick.com/api/3.0/metro_areas/" + songkickCityId + "/calendar.json?apikey=" + songkickAPIKey;
  return songkickUrl;
};

function App() {

  const [ city, setCity ] = useState('new-york');
  let cityData = cityOptions[city];
  const songkickId = cityData.id;

  //Fetch list of gigs in selected city from Songkick API
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [artist, setArtist] = useState('');

  useEffect(() => {
    const cachedResultJson = localStorage.getItem(`cache-${songkickId}`);

    // If cached Songkick data exists, retrieve from there
    if(cachedResultJson) {
      setIsLoaded(true);
      const cachedResult = JSON.parse(cachedResultJson);
      setItems(cachedResult.resultsPage.results.event);

    // If no cached Songkick data, fetch from API and send to localstorage
    } else {
      let songkickUrl = getSongkickUrl(songkickId);
      fetch(songkickUrl)
        .then(res => res.json())
        .then(
          (response) => {
            setIsLoaded(true);
            setItems(response.resultsPage.results.event);
            localStorage.setItem(`cache-${songkickId}`, JSON.stringify(response));
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
  }, [songkickId]);

  if(!isLoaded || !items.length){
    return <h1>Loading...</h1>
  }

  const randomGig = items[Math.floor(Math.random()*items.length)];
  const randomGigVenue = randomGig.venue.displayName;
  const randomGigUrl = randomGig.uri;
  const randomGigArtist = randomGig.performance[0].artist.displayName;
  const randomGigArtistId = randomGig.performance[0].artist.id;

  return (
    <div>
      <Header />
      <p>Random Gig in {cityData.label}</p>                      
      <h2><a href={randomGigUrl}>Go see <strong>{randomGigArtist}</strong> at <strong>{randomGigVenue}</strong></a></h2>

      <CitySelect
        city={city}
        setCity={setCity}
        cityOptions={cityOptions}
      />

      <SpotifyEmbed artist={randomGigArtist} artistId={randomGigArtistId}/>      

      <button onClick={() => setArtist({randomGigArtist})}>Refresh</button>

    </div>
  );
}

export default App;
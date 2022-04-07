import React, { useState, useEffect } from 'react';
import { Header } from './Components/Header';
import { CitySelect } from './Components/CitySelect';
import { SpotifyEmbed } from './Components/SpotifyEmbed';
import { Footer } from './Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRandom, faAngleDown } from '@fortawesome/free-solid-svg-icons';

library.add(faRandom, faAngleDown);

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
  const randomGigDate = randomGig.start.date;
  const randomGigArtist = randomGig.performance[0].artist.displayName;
  const randomGigArtistId = randomGig.performance[0].artist.id;

  return (
    <>
      <main className="">      
        <div className="m-auto text-center mt-48 mb-16 ">
          <div className="inline-block m-auto">
            <h1 className="text-2xl">Discover live music in</h1>
            <CitySelect
              city={city}
              setCity={setCity}
              cityOptions={cityOptions}          
            />
          </div>
        </div>

        <div className="grid grid-cols-8 md:grid-cols-12">
          <div className="col-start-2 col-span-6 md:col-start-5 md:col-span-4">  
            <div className="results p-6 text-xl">                 
              <p>
                <a className="hover:underline inline-block decoration-1" href={randomGigUrl}><strong>{randomGigArtist}</strong> is playing at
                  <br /><strong>{randomGigVenue}</strong> on<br />
                  {randomGigDate} →
                </a>
              </p>
              <SpotifyEmbed artist={randomGigArtist} artistId={randomGigArtistId}/> 
            </div>     
            <div className="block text-center p-4">          
              <button className="hover:underline" onClick={() => setArtist({randomGigArtist})}>
                <FontAwesomeIcon icon="random" className="pr-2"/>Get Another
              </button>
            </div>
          </div>
        </div>      
      </main>
      <Footer />
    </>
  );
}

export default App;
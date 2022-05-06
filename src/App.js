import React, { useState, useEffect } from 'react';
import { CitySelect } from './Components/CitySelect';
import { Results } from './Components/Results';
import { SpotifyEmbed } from './Components/SpotifyEmbed';
import { SearchAgain } from './Components/SearchAgain';
import { Footer } from './Components/Footer';
import songkickCityData from './Data/songkickCityData';

//Generate the Songkick API url (MOVE THIS INTO CUSTOM HOOK AND SEPARATE FILE EVENTUALLY)
function getSongkickUrl(songkickCityId){   
  const songkickAPIKey = process.env.REACT_APP_SONGKICK_API_KEY;
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  let songkickUrl = `https://api.songkick.com/api/3.0/metro_areas/${songkickCityId}/calendar.json?min_date=${today}&apikey=${songkickAPIKey}`;
  return songkickUrl;
};

function App() {

  const [ city, setCity ] = useState('new-york');
  let cityData = songkickCityData[city];
  const songkickId = cityData.id;

  //Fetch list of gigs in selected city from Songkick API
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [artist, setArtist] = useState('');

  useEffect(() => {
    const CACHE_MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours in ms
    const cachedResultJson = localStorage.getItem(`cache-${songkickId}`);
    const cachedResult = cachedResultJson && JSON.parse(cachedResultJson);

    // If cached Songkick data exists and is less than the max cache
    // age, retrieve from there
    if(cachedResult && Date.now() - cachedResult.createdAt < CACHE_MAX_AGE) {
      setIsLoaded(true);
      setItems(cachedResult.response.resultsPage.results.event);      
    // If no cached Songkick data, fetch from API and send to localstorage
    } else {    
      let songkickUrl = getSongkickUrl(songkickId);
      fetch(songkickUrl)
        .then(res => res.json())
        .then(
          (response) => {
            setIsLoaded(true);
            setItems(response.resultsPage.results.event);

            // Cache the response
            const dataToCache = {
              createdAt: Date.now(),
              response,
            }
            localStorage.setItem(`cache-${songkickId}`, JSON.stringify(dataToCache));
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
  }, [songkickId]);

  if(!isLoaded || !items.length){
    return <div className="flex h-full items-center justify-center"><span className="">Loading...</span></div>
  }

  const randomGig = items[Math.floor(Math.random()*items.length)];
  const randomGigVenue = randomGig.venue.displayName;
  const randomGigUrl = randomGig.uri;
  const randomGigDate = new Date(randomGig.start.datetime);
  const randomGigDayOfWeek = randomGigDate.toLocaleString('default', { weekday: 'long' });
  const randomGigMonth = randomGigDate.toLocaleString('default', { month: 'long' });
  const randomGigDay = randomGigDate.getDate();
  const randomGigArtist = randomGig.performance[0].artist.displayName;  
  const randomGigArtistId = randomGig.performance[0].artist.id;

  return (    
    <>
      <main className="max-w-xl m-auto px-4 md:px-8"> 

        <CitySelect
          city={city}
          setCity={setCity}
          songkickCityData={songkickCityData}          
        />      
        
        <Results
          randomGigUrl={randomGigUrl}
          randomGigArtist={randomGigArtist}
          randomGigDayOfWeek={randomGigDayOfWeek}
          randomGigMonth={randomGigMonth}
          randomGigDay={randomGigDay}
          randomGigVenue={randomGigVenue}
        >
          <SpotifyEmbed
            artist={randomGigArtist}
          />
        </Results>

        <SearchAgain 
          setArtist={setArtist}
          randomGigArtist={randomGigArtist}
        />

      </main>
      <Footer />  
    </>  
  );
}

export default App;
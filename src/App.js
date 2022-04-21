import React, { useState, useEffect } from 'react';
import { CitySelect } from './Components/CitySelect';
import { SpotifyEmbed } from './Components/SpotifyEmbed';
import { Footer } from './Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRandom, faAngleDown } from '@fortawesome/free-solid-svg-icons';

library.add(faRandom, faAngleDown);

const cityOptions = {
  "amsterdam": {
    label: "Amsterdam",
    value: "amsterdam",    
    id: 31366
  },
  "austin": {
    label: "Austin",
    value: "austin",    
    id: 9179
  },
  "barcelona": {
    label: "Barcelona",
    value: "barcelona",    
    id: 28714
  },
  "berlin": {
    label: "Berlin",
    value: "berlin",    
    id: 28443
  },
  "boston": {
    label: "Boston",
    value:"boston",
    id: 18842
  },
  "charlotte": {
    label: "Charlotte",
    value: "charlotte",    
    id: 13579
  },
  "chicago": {
    label: "Chicago",
    value: "chicago",   
    id: 9426
  },
  "columbus": {
    label: "Columbus",
    value: "columbus",   
    id: 9480
  },
  "dallas": {
    label: "Dallas",
    value: "dallas",    
    id: 35129
  },
  "denver": {
    label: "Denver",
    value: "denver",    
    id: 6404
  },
  "detroit": {
    label: "Detroit",
    value: "detroit",    
    id: 18073
  },
  "houston": {
    label: "Houston",
    value: "houston",   
    id: 15073
  },
  "indianapolis": {
    label: "Indianapolis",
    value: "indianapolis",    
    id: 25521
  },
  "jacksonville": {
    label: "Jacksonville",
    value: "jacksonville",    
    id: 24578
  },
  "las-vegas": {
    label: "Las Vegas",
    value: "las-vegas",    
    id: 8396
  },
  "london": {
    label: "London",
    value: "london",    
    id: 24426
  },
  "los-angeles": {
    label: "Los Angeles",
    value: "los-angeles",    
    id: 17835
  },
  "madrid": {
    label: "Madrid",
    value: "madrid",    
    id: 28755
  },
  "milan": {
    label: "Milan",
    value: "milan",    
    id: 30338
  },
  "munich": {
    label: "Munich",
    value: "munich",    
    id: 28549
  },
  "nashville": {
    label: "Nashville",
    value: "nashville",    
    id: 11104
  },
  "new-york": {
    label: "New York City",
    value: "new-york",   
    id: 7644
  },
  "paris": {
    label: "Paris",
    value: "paris",    
    id: 28909
  },
  "philadelphia": {
    label: "Philadelphia",
    value: "philadelphia",    
    id: 5202
  },
  "phoenix": {
    label: "Phoenix",
    value: "phoenix",    
    id: 23068
  },
  "portland": {
    label: "Portland, OR",
    value: "portland",    
    id: 12283
  },
  "prague": {
    label: "Prague",
    value: "prague",    
    id: 28425
  },
  "rome": {
    label: "Rome",
    value: "rome",    
    id: 30366
  },
  "san-antonio": {
    label: "San Antonio",
    value: "san-antonio",    
    id: 7554
  },
  "san-diego": {
    label: "San Diego",
    value: "san-diego",    
    id: 11086
  },
  "san-francisco": {
    label: "San Francisco",
    value: "san-francisco",    
    id: 26330
  },
  "seattle": {
    label: "Seattle",
    value: "seattle",    
    id: 2846
  },
  "washington-dc": {
    label: "Washington D.C.",
    value: "washington-dc",    
    id: 1409
  }
};

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
  let cityData = cityOptions[city];
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

        <div className="text-center mt-24 md:mt-32 mb-16">
          <div className="inline-block m-auto">
            <h1 className="text-3xl sm:text-4xl inline mr-3">Discover live music<br /> in</h1>
            <CitySelect
              city={city}
              setCity={setCity}
              cityOptions={cityOptions}          
            />
          </div>
        </div>
        
        <div className="results relative p-6 text-xl">                 
          <p>
            <a className="no-underline hover:underline inline-block decoration-1" href={randomGigUrl}><strong>{randomGigArtist}</strong> is playing on
              <br /><strong>{randomGigDayOfWeek}, {randomGigMonth} {randomGigDay}</strong> at {randomGigVenue}&nbsp;→
            </a>
          </p>
          <SpotifyEmbed artist={randomGigArtist} songkickArtistId={randomGigArtistId}/>
        </div>     
        <div className="block text-center p-4">          
          <button className="hover:underline" onClick={() => setArtist({randomGigArtist})}>
            <FontAwesomeIcon icon="random" className="pr-2"/>Get Another
          </button>
        </div>

      </main>
      <Footer />  
    </>  
  );
}

export default App;
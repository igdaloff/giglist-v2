import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Results(props){

  const [token, setToken] = useState('');
	const [src, setSrc] = useState('');		
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);
	const [spotifyArtistId, setSpotifyArtistId] = useState('');

	useEffect(() => {

	  // API call for retrieving Spotify token
	  axios('https://accounts.spotify.com/api/token', {
	    headers: {
	      'Content-Type' : 'application/x-www-form-urlencoded',
	      'Authorization' : 'Basic ' + btoa(process.env.REACT_APP_SPOTIFY_API_KEY)
	    },
	    data: 'grant_type=client_credentials',
	    method: 'POST'
	  })
	  .then(tokenResponse => {
	    setToken(tokenResponse.data.access_token);

	    // If cached Spotify data exists, retrieve from there	    			
			const cachedResultJson = localStorage.getItem(`cache-${spotifyArtistId}`);
	    if(cachedResultJson){	    	
	    	setIsLoaded(true);
	    	
	    	const cachedResult = JSON.parse(cachedResultJson);
	    	setItems(cachedResult);			

				let spotifyArtistId = cachedResult.data.artists.items[0].id;	      
				let src = `https://open.spotify.com/embed/artist/${spotifyArtistId}`;

				setSrc(src);				
	    } else {
				//Artist query to get artist's Spotify ID
				axios(`https://api.spotify.com/v1/search?q=${props.artist}&type=artist&limit=1`,
					{
				  'method': 'GET',
				  'headers': {
				    'Content-Type': 'application/json',
				    'Accept': 'application/json',
				    'Authorization': 'Bearer ' + tokenResponse.data.access_token
				  }
				})

				//Populate artist URL for embed using API response from above
				.then(artistresponse=> { 
					
					if(artistresponse.data.artists.items.length > 0){
						setIsLoaded(true);

						let spotifyArtistId = artistresponse.data.artists.items[0].id;
						let src = `https://open.spotify.com/embed/artist/${spotifyArtistId}`	      	      				  
		
						setSrc(src);	  
						setItems(artistresponse);
						localStorage.setItem(`cache-${spotifyArtistId}`, JSON.stringify(artistresponse));	
					}
				
				}).catch(error=> console.log(error))
	    }	    
	  }).catch(error => console.log(error));
	},[props.artist]);

  return(
		<div className="results relative p-6 text-xl">                 
			<p>
				<a className="no-underline hover:underline inline-block decoration-1" href={props.randomGigUrl}><strong>{props.randomGigArtist}</strong> is playing on
					<br /><strong>{props.randomGigDayOfWeek}, {props.randomGigMonth} {props.randomGigDay}</strong> at {props.randomGigVenue}&nbsp;→
				</a>
			</p>			
			
			{/* This line is necessary in order to render SpotifyEmbed */}
			{props.children} 
		</div>     
  )
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function SpotifyEmbed(props) {

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

	if ( src ) {			
		return <iframe className="mt-6 w-full" artist={props.artist} src={src} title={"Spotify player for " + props.artist} width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
	} else {				
		return <em className="text-gray-600 text-sm pt-4 block">[Artist not found on Spotify]</em>	
	}
};
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function SpotifyEmbed(props) {

	const [token, setToken] = useState('');
	const [src, setSrc] = useState('');		
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);
	const [artistId, setArtistId] = useState('');

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

	    const cachedResultJson = localStorage.getItem(`cache-${props.artistId}`);

	    // If cached Spotify data exists, retrieve from there	    
	    if(cachedResultJson){
	    	
	    	setIsLoaded(true);
	    	
	    	const cachedResult = JSON.parse(cachedResultJson);
	    	
	    	setItems(cachedResult);

	    } else {

				//Artist query to get artist's Spotify ID
				axios(`https://api.spotify.com/v1/search?q=${props.artist}&type=artist&limit=1`,{
				  'method': 'GET',
				  'headers': {
				    'Content-Type': 'application/json',
				    'Accept': 'application/json',
				    'Authorization': 'Bearer ' + tokenResponse.data.access_token
				  }
				})

				//Populate artist URL for embed using API response from above
				.then(artistresponse=> { 
					
					setIsLoaded(true);

				  const spotifyArtistId = artistresponse.data.artists.items[0].id;	      
				  const src = `https://open.spotify.com/embed/artist/${spotifyArtistId}`	      	      

				  setSrc(src);	  
				  setItems(artistresponse);

				  localStorage.setItem(`cache-${props.artistId}`, JSON.stringify(artistresponse));

				}).catch(error=> console.log(error))
	    }	    
	  }).catch(error => console.log(error));
	},[props.artist]);

	if ( src ) {		
		return <iframe artist={props.artist} src={src} width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>			
	} else {
		return null
	}
};
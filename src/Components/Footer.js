import React from 'react';
import { Link } from "react-router-dom";

export function Footer(){
	return(
		<footer className="absolute max-w-4xl left-0 right-0 bottom-0 m-auto p-6 text-s text-gray-400">
			<p>Giglist makes it easy to discover live music by displaying a random upcoming show and the performer's top track from Spotify.
			Made by <a href="//igdaloff.com">Nathan Igdaloff</a> in 2022. <Link to="/about">More about this project</Link>.</p>			
		</footer>
	)
}
import React from 'react';

export function Footer(){
	return(
		<footer className="grid grid-cols-8 md:grid-cols-12 absolute bottom-0">
			<div className="col-start-2 col-span-6 md:col-start-5 md:col-span-4">
				<p className="text-gray-400 text-md">Giglist encourages you to go see live music by showing a random nearby concert happenning soon, and a song to help you decide if you’re into it.</p>
				<p className="text-gray-400 text-xs mt-8 mb-8">Made for you by <a className="underline" href="igdaloff.com">Nathan Igdaloff</a> | <a className="underline" href="">About</a></p>
			</div>
		</footer>
	)
}
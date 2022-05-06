import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRandom } from '@fortawesome/free-solid-svg-icons';

library.add(faRandom);


export function SearchAgain(props){
  return(
		<div className="block text-center p-4">          
			<button className="hover:underline" onClick={() => props.setArtist(props.randomGigArtist)}>
				<FontAwesomeIcon icon="random" className="pr-2"/>Get Another
			</button>
		</div>    
  )
}
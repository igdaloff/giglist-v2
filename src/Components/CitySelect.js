import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function CitySelect(props) { 
	const {
		city,
		setCity,
		cityOptions
	} = props;
	
  const cityData = props.cityOptions[props.city];

	return (
		<div className="city-select">
			<select className="bg-gray-500 hover:bg-gray-600 text-2xl p-1 mt-2 font-medium rounded-sm border-r-4 border-gray-500 hover:border-gray-600 cursor-pointer" value={city} onChange={ (event) => props.setCity(event.target.value) }>
				{Object.values(props.cityOptions).map((option) => (
					<option key={option.value} value={option.value}>{option.label}</option>
			  ))}
			</select>		
		</div>			
	);	
}
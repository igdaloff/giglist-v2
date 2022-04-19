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
		<div className="city-select relative inline">
			<select className="bg-gray-700 hover:bg-gray-800 text-2xl sm:text-3xl py-2 px-3 mt-2 font-light rounded-sm border-gray-700 hover:border-gray-800 cursor-pointer" value={city} onChange={ (event) => props.setCity(event.target.value) }>
				{Object.values(props.cityOptions).map((option) => (
					<option key={option.value} value={option.value}>{option.label}</option>
			  ))}
			</select>		
		</div>			
	);	
}
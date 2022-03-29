import React, { useState } from 'react'
import ReactDOM from 'react-dom'

export function CitySelect(props) { 
	const {
		city,
		setCity,
		cityOptions,
	} = props;
	
  const cityData = props.cityOptions[props.city];

  //Populate the city select dropdown
	return (
		<div className="flex justify-center content-center h-full p-0 m-0">

			<select className="m-auto" value={city} onChange={ (event) => props.setCity(event.target.value) }>
				{Object.values(props.cityOptions).map((option) => (
					<option key={option.value} value={option.value}>{option.label}</option>
			  ))}
			</select>		

		</div>			
	);	
}
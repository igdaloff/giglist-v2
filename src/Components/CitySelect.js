import React from 'react'

export function CitySelect(props) { 
	const {
		city
	} = props;
	
	return (
		<div className="mb-16 text-center">
			<div className="inline-block m-auto">
				<h1 className="text-3xl sm:text-4xl inline mr-3">Find a concert in</h1>
				<div className="city-select relative inline">
					<select className="bg-gray-600 hover:bg-gray-700 text-2xl sm:text-3xl py-2 px-3 mt-2 font-light rounded-sm border-gray-600 hover:border-gray-700 cursor-pointer" value={city} onChange={ (event) => props.setCity(event.target.value) }>
						{Object.values(props.songkickCityData).map((option) => (
							<option key={option.value} value={option.value}>{option.label}</option>
						))}
					</select>		
				</div>		
			</div>
		</div>				
	);	
}
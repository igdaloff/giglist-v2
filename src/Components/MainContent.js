import React from 'react';

	function MainContent(){
		
		function findGeo() {
			
			const status = document.querySelector('#status');

			function success(position) {
    		const latitude  = position.coords.latitude;
    		const longitude = position.coords.longitude;
    		status.textContent = latitude + ', ' + longitude;
    	}

    	function error() {
   			status.textContent = 'Unable to retrieve your location';
  		}

  		if(!navigator.geolocation) {
   			status.textContent = 'Geolocation is not supported by your browser';
  		} else {
    		status.textContent = 'Locating…';
    		navigator.geolocation.getCurrentPosition(success, error);
  		}

		}

		return (
			<div className="flex justify-center content-center h-full p-0 m-0">
				<span 
					className="m-auto"					
					onClick={findGeo}

				>Get my location</span>
				<span id="status"></span>
			</div>
		);
	}

export default MainContent;
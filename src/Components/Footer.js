import React from 'react';
import { Link } from "react-router-dom";

export function Footer(){
	return(
		<footer className="absolute max-w-4xl left-0 right-0 bottom-0 m-auto p-6 text-s text-gray-400 text-center">
			<p>Made by <a className="hover:text-white" href="//igdaloff.com">Nathan Igdaloff</a> | <Link to="/about" className="hover:text-white">About</Link> | <a className="hover:text-white" href="https://g09lldp01b5.typeform.com/to/OoHX2k42">Feedback</a></p>			
		</footer>
	) 
}
import { Link } from "react-router-dom";

export default function About() {
  return ( 
    <div className="max-w-md m-auto p-8 md:px-0 pt-32">
      <h1>About this Project</h1>
      <p className=""><a href="//igdaloff.com">Nathan Igdaloff</a> built this project in 2022 to learn ReactJS and to encourage people to see live music. It's an iteration of a <a href="https://github.com/jshakes/giglist">previous version</a> built with <a href="https://jshakespeare.com/">James Shakespeare</a>, who also lent a hand with this one.</p>
      <p>Concert data is from the <a href="https://www.songkick.com/developer">Songkick API</a>. Artist query and player embed from the <a href="https://developer.spotify.com/">Spotify API</a>. And most of the icons are from <a href="https://fontawesome.com/">Font Awesome</a>.</p>
      <p>The code is available to view on <a href="https://github.com/igdaloff/giglist-v2">Github</a>.</p>
      <p>Ideas for improvement? <a href="https://g09lldp01b5.typeform.com/to/OoHX2k42">Let me know!</a></p>
      <Link className="absolute top-6 left-6 no-underline text-2xl hover:bg-white w-8 h-8 hover:text-black text-center rounded-full" to="/">←</Link>      

    </div>    
  );
}
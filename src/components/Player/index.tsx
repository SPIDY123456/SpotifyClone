import React, { useEffect,useState } from 'react'
import { getTracks } from "../API/searchTrack.tsx";
import styles from "../Player/Player.module.css"; 
import SpotifyPlayer from 'react-spotify-web-playback';





const Player = () => {


   
    const[searchInput,setSearchInput] = useState("");
    const[searchResults,setSearchResults] = useState([]);
    const[currentTrack,setCurrentTrack] = useState("");
    const[access_token,setAccessToken] = useState("");
    const getCurrentTrack = (currentTrackURI: string) => {

         setCurrentTrack(currentTrackURI);
    }

 

    
    const fetchTracks = async () => {
    if(searchInput) {
      let response = await getTracks(searchInput);
      setSearchResults(response.tracks.items.map((track : {
        name : "";
        uri: "";
       album : {
       name : "";
        images : [{
        url:"";
       },
       {
        url:"";
       }
      ];
     }; 
     
      }) => {

      return {
        name :track.name,
        uri :track.uri,
        images: track.album.images[1].url,
        albumName :track.album.name,

      }
      }) || {});
    }

    };

    useEffect(() => {
        let debounced =setTimeout(() => {
        fetchTracks();

        },100);


     return  () => clearTimeout(debounced); 

    },[searchInput]);

    useEffect(() => {
      let token = sessionStorage.getItem("access_token");
      setAccessToken(token || "");
    },[])
    console.log(access_token);
  return (
    <div className={styles.her}>
        <input type="text" placeholder="Search a Track..." 
        value={searchInput}
        onChange={(event) => {
            setSearchInput(event.target.value);
        }}
        className={`input input-bordered w-full max-w-xs ${styles.input}`} 
        />
        <div className={styles.grid}>
         {searchResults.map((track: { name : "" ; images:" " ;uri:""}) => { 
            return (
              <div className={styles.cover} onClick={() => getCurrentTrack(track.uri)}>
                <img className= {styles.trackImage} src ={track.images}/>
                <p className={styles.tracks}>{track.name}</p>
                
                  {/* <button className={`btn btn-accent ${styles.playbtn}`}> Play </button> */}
                </div>
            )
          })}
          
        </div>

     
        <div className={styles.spotifyPlayer}>
        {access_token ? (
        <SpotifyPlayer
          token={access_token}
          play
          styles ={{
            bgColor: '#333',
            color: '#fff',
            loaderColor: '#fff',
            sliderColor: '#1cb954',
            sliderHandleColor:'whitesmoke',
            trackArtistColor: '#ccc',
            trackNameColor: '#fff',

          }}
          uris={[currentTrack]}
          // uris={searchResults.map((item: {uri : ""}) => item.uri)}  
          
        />
          ):(
          <></>
        )}    
        </div>
    </div>
  );
}


export default Player;

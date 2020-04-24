import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const [finalImage, setFinalImage] = useState("http://placehold.it//300x300/28ffef/?text=Hello");
  const [finalImages, setFinalImages] = useState([""]);
  const [color, setColor] = useState(["FFFFFF"]);
  const [missed, setMissed] = useState(0);
  const missedWord = [
    "",
    "Beginners combo!!",
    "Mega Combo!",
    "Ultra Combo!",
    "Giga Combo!",
    "Pizza Combo!",
    "Supreme Combo!",
    "Ultimate Combo!",
    "Redneck Combo!",
    "Yo mama Combo!",
    "Better luck next crime Combo!",
    "*M1 Garand Ping*!",
    "SUPERB!!",
    "SUPERB++!",
    "NO SHIT!",
    "AYE!",
    "SICK!",
    "LUNATIC!",
    "STOP IT!",
  ]
  const audioSrc = ['click.mp3','come-on-1.wav','come-on-2.wav','come-on-3.wav','come-on-come-on-1.wav','come-on-come-on-2.wav','come-on-you-can-do-it.wav'];
  const playSound = (src) => {
    var audio = new Audio(src);
    audio.volume = 0.2;
    audio.play();
  }
  const getImages = () => {
    
    console.log("getting images");
    let hash = getHash();
    fetch(`https:/prnt.sc/en/${hash}`).then(res=>{
      return res.text();
    }).then((data)=>{
      let image = document.createElement( 'html' );
      image.innerHTML = data;
      let imageEl = image.querySelector("#screenshot-image");
      
      if (imageEl && imageEl.src.includes('prntscr')){
        getColor();
        playSound(audioSrc[missed]);
        setMissed(missed+1);
        setFinalImage("http://placehold.it//300x300/00000f/ffffff?text=Forbidden");  
        return;
      }
     
      if (imageEl){
        setFinalImage(imageEl.src || '');
        setMissed(0);
      } else {
        setMissed(missed+1);
        
      }
      playSound(audioSrc[missed]);
    });
  }
  const getBundleImages = (number) => {
    const images= [];
    for (let i = 0; i < 2; i++){
      let image = getImages();
      console.log("imaege", image)
      images.push(image);
    }
    console.log(images);
    setFinalImages(images);
  }
  const letsInterval = () => {
    window.interval = setInterval(()=>{
      getImages();
    }, 3000);
  }
  const stopInterval = () => {
    clearInterval( window.interval);
  }
  const getHash = () => {
    let result = "";
    let characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    return result;
      
  }
  const getColor = () => {
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    setColor(`rgb(${r},${g},${b})`);
  }
  return (
    <div className="App">
        <button style={{position: "fixed", top: 20, left: '50%'}} onClick={getImages}>Get Image</button>
        <button style={{position: "fixed", top: 50, left: '50%'}} onClick={getBundleImages}>Get Bundle</button>
        <button style={{position: "fixed", top: 80, left: '50%'}} onClick={letsInterval}>Lets timout</button>
        <button style={{position: "fixed", top: 110, left: '50%'}} onClick={stopInterval}>Halt!</button>
      <header className="App-header">
      <div className='container'>
       <img src={finalImage} className='image' key={finalImage} style={{width: 800}} alt='slik' />
       <div class='content'>
       <h5 style={{color: color}}>{missedWord[missed]}</h5>
       <br />
       <p>{missed}</p>

       </div>

      </div>
        {/* {finalImages.map(image => <img src={image} key={image} style={{width: 400}} alt='slik' />)} */}
      </header>
    </div>
  );
}

export default App;

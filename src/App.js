import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Signin from './components/Signin/Signin.js'
import Register from './components/Register/Register.js'


const app = new Clarifai.App({
 apiKey: '9e86a7be1b414d35be54637f97ee4438'
});
    
const particlesOptions ={
  particles: {
    number:{
      value :30,
      density: {
        enable:true,
        value_area: 130,
      }
    }
  }
}

class App extends Component{

  constructor(){
    super();
    this.state ={
      input: '', 
      imageUrl:'',
      box :{},
      route: 'signin',
      isSignedIn: false,
    }
  }

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width= Number(image.width);
    const height= Number(image.height);
    return{
      leftCol     : clarifaiFace.left_col * width,
      topRow      : clarifaiFace.top_row * height,
      rightCol    : width - (clarifaiFace.right_col * width),
      bottomRow   : height -(clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox =(box) =>{
    this.setState({box : box})
  }

  onInputChange= (event) =>{
    this.setState({input : event.target.value});
  } 

  onButtonSubmit=()=>{
    this.setState({imageUrl: this.state.input })
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL , this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(error => console.log(error));
  }

  onRouteChange = (route) =>{
    // if(route === 'signin'){
    //   this.setState({isSignedIn: false})
    // }
    if(route ==='home'){
      this.setState({isSignedIn: true})
    }
    else{
      this.setState({isSignedIn: false})
    }
    this.setState({route: route})
  } 

  render(){
    return (
      <div className='App'>
        <Particles className= 'particles' params={particlesOptions}/>
        <Navigation isSignedIn= {this.state.isSignedIn} onRouteChange ={this.onRouteChange} />
        {this.state.route === 'home'
          ?<div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box ={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
          :(this.state.route === 'signin'
            ?<Signin onRouteChange = {this.onRouteChange}/>
            :<Register onRouteChange = {this.onRouteChange}/>
            )
        } 
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Clarifai from 'clarifai';
import FaceRecog from './Components/FaceRecog/FaceRecog';




const particlesOptions={
            		particles: {
                  number:{
                    value: 80,
                    density:{
                      enable: true,
                      value_area: 800
                    }
                  }
            	}
            }

const initialState = {
  input: ' ',
  imageUrl: '',
  box: [{}],
  route: 'signin',
  isSignedIn: false,
  user:{
    id:'',
    name:'',
    email:'',
    password:'',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  componentDidMount(){
    document.title = "The Smart Brain"
  }

loadUser = (data) => {
  this.setState({user:{
    id:data.id,
    name:data.name,
    email:data.email,
    password:data.password,
    entries: data.entries,
    joined: data.joined
  }})
}

 calculateFaceLocation = (data) => {
   console.log(data);
   let clarifaiFace = {};
   const bx = [{}];
   const image = document.getElementById('inputimage');
   const width= Number(image.width);
   const height= Number(image.height);
   for(var i = 0; i<(data.outputs[0].data.regions.length); i++){
     clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
     bx.push({
       leftCol: clarifaiFace.left_col * width,
       topRow: clarifaiFace.top_row * height,
       rightCol: width - (clarifaiFace.right_col * width),
       bottomRow: height - (clarifaiFace.bottom_row * height)
     });
   }
   return bx;
}

displayFaceBox = (box) => {
  this.setState({ box : box});
}
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://agile-basin-17843.herokuapp.com/imageUrl', {
        method:'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then((response) => {
      if(response !== 'Unable to work with API'){
        fetch('https://agile-basin-17843.herokuapp.com/image', {
            method:'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          })
          .catch(console.log);
      }
      this.displayFaceBox(this.calculateFaceLocation(response))})
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route==='signout'){
      this.setState(initialState);
    }
    else if( route==='home'){
      this.setState({isSignedIn: true});
    }
  this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions}/>
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home' ?
        <div>
         <Logo />
         <Rank name={this.state.user.name} entries={this.state.user.entries} />
         <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
         <FaceRecog box={this.state.box} imageUrl={this.state.imageUrl}/>
       </div>
        :(
          this.state.route === 'signin'?
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          :
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )

    }
  </div>
    );
  }
}

export default App;

import React from 'react';

class Signin extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      signInEmail:'',
      signInPassword: ''
    }
  }
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }

  onSubmitSignIn = () => {
  fetch('https://agile-basin-17843.herokuapp.com/signin',{
      method:'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
      email: this.state.signInEmail,
      password: this.state.signInPassword
    })
  })
  .then(response => response.json())
    .then(user => {
      if(user.id){
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
    })
  }
render(){
    const { onRouteChange } = this.props;
  return(
    <article className="br2 ba white b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 white fw6 ph0 mh0 center">Sign In</legend>
            <div className="mt3">
              <label className="db white fw6 lh-copy f5" htmlFor="email-address">Email</label>
              <input onChange={this.onEmailChange} className="pa2 white input-reset ba b--mid-gray bg-transparent hover-bg-mid-gray hover-black w-100" type="email" name="email-address"  id="email-address"/>
            </div>
            <div className="mv3">
              <label className="db white fw6 lh-copy f5" htmlFor="password">Password</label>
              <input onChange={this.onPasswordChange} className="b white pa2 input-reset ba b--mid-gray bg-transparent hover-bg-mid-gray hover-black w-100" type="password" name="password"  id="password"/>
            </div>
          </fieldset>
          <div className="">
            <input onClick={this.onSubmitSignIn} className="b white ph3 pv2 input-reset ba b--mid-gray bg-transparent bg-animate hover-bg-mid-gray grow pointer f4 dib" type="submit" value="Sign in"/>
          </div>
          <div className="lh-copy mt3">
            <p onClick={() => onRouteChange('register')} className="f5 white link dim black db pointer">Not a user?Register</p>
          </div>
        </div>
      </main>
    </article>
  );
}
}

export default Signin;

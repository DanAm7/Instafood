import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { browserHistory } from 'react-router-dom';
import { useHistory } from "react-router-dom";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    LocalLogIn = (email) => { 
         localStorage.setItem('logged', email);
    }

    ApiLogIn = (email) => {
        fetch('https://shrouded-crag-44494.herokuapp.com/login', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email
    })
})
}
    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value});
    }

    onSubmitSignIn = () => {
        if (this.state.signInEmail && this.state.signInPassword) {
        fetch('https://shrouded-crag-44494.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        }) .then(response => response.json())
        .then(user => {
          if (user.id) {
            this.props.loadFeed();
            this.props.loadUser(user.email);
            this.props.onRouteChange('home');
            this.LocalLogIn(user.email);
              } else {
                  alert('Wrong email or password');
              }
          })
        } 
    }

   render() {
       console.log(this.props.isSignIn)
        if (this.props.isSignIn) {
        return <Redirect to='/' />
      }
   
    return (
        <div>
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center forms">
        <main className="pa4 black-80">
        <div className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <legend className="f1 fw6 ph0 mh0 tc font3">Sign In</legend>
        <div className="mt3">
            <label className="db fw6 lh-copy font21" htmlFor="email-address">Email</label>
            <input onChange={this.onEmailChange} className="pa2 input-reset ba  hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
        </div>
        <div className="mv3">
            <label className="db fw6 lh-copy font21" htmlFor="password">Password</label>
            <input onChange={this.onPasswordChange} className="b pa2 input-reset ba  hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
        </div>
        </fieldset>
        <div className="tc">
        <input className="b ph3 pv2 input-reset ba b--black  grow pointer f6 dib" type="submit" value="Sign in" onClick={this.onSubmitSignIn}/>
        </div>
        <div className="tc lh-copy mt3">
        <Link to='/register'>
        <p className="f6 link dim black db pointer" onClick={() => this.props.onRouteChange('register')}>Register</p>
        </Link>
    </div>
  </div>
</main>
</article> 
         
        </div>
    );
   }

}

export default SignIn;
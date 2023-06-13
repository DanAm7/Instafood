import React from 'react';
import { Redirect } from 'react-router-dom';

class Register extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            ValidLogIn: false
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

    onNameChange = (event) => {
        this.setState({ name: event.target.value });
    }
    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value});
    }

    onSubmitRegister = () => {
        if (this.state.email && this.state.password && this.state.name) {
        fetch('https://shrouded-crag-44494.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        }).then(response => response.json())
          .then(user => {
              if (user.id) {
                this.props.loadFeed();
                this.props.loadUser(user.email);
                this.props.onRouteChange('home');
                this.LocalLogIn(user.email);
              } else {
                  alert('This email alredy in use');
              }
          })
        } else {
            console.log(this.state.password, this.state.name, this.state.email);
            alert('Ops! some information is missing');
        }
    }


    render() {
        if (this.props.isSignIn) {
            return <Redirect to='/' />
          }
    return (
        <div>
        <article className=" br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
        <div className="measure">
        
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <legend className="tc f1 fw6 ph0 mh0 font3">Register</legend>
        <div className="mt3">
            <label className="db fw6 lh-copy font21" htmlFor="name">Name</label>
            <input onChange={this.onNameChange} className="pa2 input-reset ba  hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
        </div>
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
        <input className="b ph3 pv2 input-reset ba b--black  grow pointer f6 dib" type="submit" value="Register" onClick={this.onSubmitRegister}/>
        </div>
        <div className="lh-copy mt3">
    </div>
  </div>
</main>
</article>
        </div>
    );
    }

}

export default Register;
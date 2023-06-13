import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navigation2 from './components/Navigation/Navigation2';
import FoodList from './components/FoodList/FoodList';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import AddNewPost from './components/AddNewPost/AddNewPost';
import Profile from './components/MyProfile/Profile';
import Recipe from './components/Recipe/Recipe';
import Categories from './components/Categories/Categories';


const clrstate = {
  feed: [],
  searchfield: '',
  route: 'signin',
  isSignIn: false,
  profilename: '',
  profilefeed: [],
  clikedname: '',
  recipe: '',
  recipename: '',
  ownname: '',
  user: {
     id: '',
     name: '',
     email: '',
     recipeid: ''
  } 
}


class App extends Component {
  constructor() {
    super()
    this.state = {
      feed: [],
      searchfield: '',
      route: 'signin',
      isSignIn: false,
      profilename: '',
      profilefeed: [],
      clikedname: '',
      recipe: '',
      recipename: '',
      recipeimg: '',
      ownname: '',
      user: {
         id: '',
         name: '',
         email: '',
         recipeid: ''
      } 
    }
  }

  SaveStates = () => {
     localStorage.setItem("states", JSON.stringify({
      searchfield: this.state.searchfield,
      route: this.state.route,
      isSignIn: this.state.isSignIn,
      profilename: this.state.profilename,
      profilefeed: this.state.profilefeed,
      clikedname: this.state.clikedname,
      recipe: this.state.recipe,
      recipename: this.state.recipename,
      recipeimg: this.state.recipeimg,
      ownname: this.state.ownname,
      user: this.state.user
     })
    )
  }

  LoadStates = () => {
    const oldStates = localStorage.getItem("states");
    const x = JSON.parse(oldStates)
      console.log("trx", x)
      this.setState(x);
    
  }

       isLogged = () => {
        const logged = localStorage.getItem('logged');
        if (logged === null) {
          return
        } else {
         if (logged.length) {
           this.setState({ isSignIn:true });
           this.LoadUser(logged);
         }
        }
    }

  onCategories = (cat) => {
    this.setState({ route:'' });
    fetch('https://evening-beach-61667.herokuapp.com/categories', {
      method: 'post',
          headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                type: cat    
    })
       }).then(feed => feed.json())
       .then(feed => {
         this.setState({ profilefeed: feed })
         this.setState({ profilename: cat })
       })
  }


  onDel = (id, own_name, profile_name) => {
    if (own_name != profile_name) {
      return
    }
    fetch('https://evening-beach-61667.herokuapp.com/del', {
      method: 'post',
          headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: id
    })
       })
        if (this.state.route === 'profile') {
          this.profileFeed(this.state.user.name)
        } else {
          this.loadFeed()
        }
  }

  onRecipeClick = (recipe, name, ownname, img) => { 
    this.setState({ recipe: recipe });
    this.setState({ recipename: name });
    this.setState({ ownname: ownname });
    this.setState({ recipeimg: img });
    this.setState({ route: 'recipe' })
  }
  
    

  onSearchClick = () => {
    if (this.state.route === 'home') {
      const filteredfeed = this.state.feed.filter( recipe => {
        return recipe.name.toLowerCase().includes(this.state.searchfield.toLocaleLowerCase());})
        this.setState({ feed: filteredfeed });
    }
     else {
         const filteredfeed = this.state.profilefeed.filter( recipe => {
        return recipe.name.toLowerCase().includes(this.state.searchfield.toLocaleLowerCase());})
        this.setState({ profilefeed: filteredfeed });
    }
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
    }


  MyProfile = () => {
      fetch('https://evening-beach-61667.herokuapp.com/profile', {
        method: 'post',
            headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  name: this.state.user.name    
      })
         })
           .then(feed => feed.json())
           .then(feed => {
             if (feed) {
             this.setState({ profilefeed: feed })
             }
          })
           this.setState({ profilename: this.state.user.name })
           this.setState({ route: 'profile' });
  }

  LoadUser = (email) => {
    fetch('https://evening-beach-61667.herokuapp.com/user', {
      method: 'post',
          headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                email: email 
    })
       })
         .then(user => 
           user.json())
         .then(user => {
           this.setState({ user: user[0] })
          })
         
  }
  
  loadFeed = () => {
    fetch('https://evening-beach-61667.herokuapp.com/getfeed', {
      method: 'get',
      headers: {'Content-Type': 'application/json'}
       })
         .then(feed => feed.json())
         .then(feed => {this.setState({ feed: feed })})
        }


  profileFeed = (name) => {
    fetch('https://evening-beach-61667.herokuapp.com/profile', {
      method: 'post',
          headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                name: name    
    })
       })
         .then(feed => feed.json())
         .then(feed => {this.setState({ profilefeed: feed })})

        this.setState({ route: 'profile' });
        this.setState({ profilename: name});
  }
  

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(clrstate)
      localStorage.setItem('logged', '');
    } else if (route === 'home') {
      this.setState({ isSignIn: true })
      this.loadFeed();
    }
    this.setState({ route: route });
    
  }

  render() {
    if (this.state.isSignIn === false) {
    this.isLogged();
    }
   

    return (
      <div>
         
         <Router>
        
              <Navigation2 isSignIn={this.state.isSignIn} onRouteChange={this.onRouteChange} MyProfile={this.MyProfile} onSearchClick={this.onSearchClick} onSearchChange={this.onSearchChange} Categori={this.onCategories} />
              <Route path='/signin' exact render={(props)=> 
              <SignIn {...props} loadUser={this.LoadUser}
                    loadFeed={this.loadFeed}
                    onRouteChange={this.onRouteChange}
                    isSignIn={this.state.isSignIn}

              /> } />
              <Route path='/register' exact render={(props) => 
              <Register {...props} 
                  clrstate={clrstate}
                  SaveStates={this.SaveStates}
                  LoadStates={this.LoadStates}
                  StateObject={this.state}
                  loadFeed={this.loadFeed} 
                  loadUser={this.LoadUser} 
                  onRouteChange={this.onRouteChange} 
                  isSignIn={this.state.isSignIn}  />
              } />
              <Route path='/' exact render={(props) => 
              <FoodList {...props} 
                    SaveStates={this.SaveStates}
                    LoadStates={this.LoadStates}
                    StateObject={this.state}
                    onDel={this.onDel} 
                    username={this.state.user.name} 
                    onRecipeClick={this.onRecipeClick} 
                    profileFeed={this.profileFeed} 
                    feed={this.state.feed}
                    isSignIn={this.state.isSignIn} 
                    loadFeed={this.loadFeed}
                    email={this.state.user.email} />
              } />
              <Route path='/profile' exact render={(props) => 
              <Profile {...props} 
                    clrstate={clrstate}
                    SaveStates={this.SaveStates}
                    LoadStates={this.LoadStates}
                    StateObject={this.state}
                    onRecipeClick={this.onRecipeClick} 
                    onDel={this.onDel} 
                    name={this.state.profilename} 
                    feed={this.state.profilefeed} 
                    username={this.state.user.name} 
                    profileFeed={this.profileFeed} 
                    email={this.state.user.email}  />
              } />
              <Route path='/recipe' exact render={(props) => 
              <Recipe {...props}
                    clrstate={clrstate} 
                    SaveStates={this.SaveStates}
                    LoadStates={this.LoadStates}
                    StateObject={this.state}
                    Recipe={this.state.recipe}
                    name={this.state.recipename} 
                    ownname={this.state.ownname} 
                    img={this.state.recipeimg} />
              } />
              <Route path='/addnewpost' exact render={(props) => 
                    <AddNewPost {...props} 
                    clrstate={clrstate}
                    SaveStates={this.SaveStates}
                    LoadStates={this.LoadStates}
                    StateObject={this.state}
                    ownname={this.state.user.name} 
                    loadFeed={this.loadFeed} 
                    onRouteChange={this.onRouteChange}
                    isSignIn={this.state.isSignIn}   />
              } />

              <Route path='/categories' exact render={(props) => 
              <Categories {...props} 
                    SaveStates={this.SaveStates}
                    LoadStates={this.LoadStates}
                    StateObject={this.state}
                    onRecipeClick={this.onRecipeClick} 
                    onDel={this.onDel} 
                    name={this.state.profilename} 
                    feed={this.state.profilefeed} 
                    username={this.state.user.name}
                    profileFeed={this.profileFeed} 
                    cat={this.state.profilename} />
              } />
            
         </Router>
      </div>
    );
  }
}


export default App;

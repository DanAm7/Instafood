import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png'
import MyProfile from '../MyProfile/Profile';

const Navigation2 = ({ isSignIn, onRouteChange, MyProfile, onSearchChange, onSearchClick, Categori }) => {
  if (isSignIn) {
    return (
        <nav className="bg-lightest-blue ttu tracked navbar navbar-expand-lg navbar-light">
        <Link to='/'>
        <img src={logo} onClick={() => onRouteChange('home')} className="navbar-brand logo" width='160' height='50px' />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          <Link to='/'>
            <li className="nav-item active">
              <a onClick={() => onRouteChange('home')} className="nav-link" href="#">Home<span className="sr-only">(current)</span></a>
            </li>
            </Link>
            <Link to='/profile'>
            <li className="nav-item">
              <a onClick={() => MyProfile()} className="nav-link" href="#">MyProfile</a>
            </li>
            </Link>
            <li className="nav-item dropdown">
              {/* <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Categories
              </a> */}
              {/* <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to='categories'>
                <a onClick={() => Categori('Lunch')} className="dropdown-item" href="#">Lunch</a>
                <a onClick={() => Categori('Breakfest')} className="dropdown-item" href="#">Breakfest</a>
                <a onClick={() => Categori('Dinner')} className="dropdown-item" href="#">Dinner</a>
                <a onClick={() => Categori('Dessert')} className="dropdown-item" href="#">Dessert</a>
                <a onClick={() => Categori('Other')} className="dropdown-item" href="#">Other</a>
                </Link>
                </div> */}
              
            </li>
            <Link to='/addnewpost'>
            <li className="nav-item">
              <a onClick={() => onRouteChange('addpost')} className="nav-link" href="#">NewPost</a>
            </li>
            </Link>
          </ul>


          <div className="form-inline my-2 my-lg-0">
          
          
          <input onChange={onSearchChange} className="form-control mr-sm-2 ml1" type="search" placeholder="Search" aria-label="Search" />

          <button onClick={onSearchClick} className="btn btn-outline-dark my-2 my-sm-0" >Search</button>


          <Link to='/'>
          <a onClick={() => {localStorage.clear(); onRouteChange('signin')}} className="nav-link signout" href="#">SignOut</a>
          </Link>

          </div>
        </div>
      </nav>
    )
  }
 else {
     return (
        <nav className="bg-lightest-blue navbar navbar-expand-lg navbar-light">
        <a onClick={() => onRouteChange('home')} className="navbar-brand" href="#">InstaFood</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav signin">
            <Link to='/register'>
                <li className="nav-item active">
                  <a onClick={() => onRouteChange('register')} className="nav-link signin" href="#">Register<span className="sr-only">(current)</span></a>
                </li>
            </Link>
            <Link to='/'>
              <li className="nav-item">
              <a onClick={() => onRouteChange('signin')} className="nav-link signin" href="#">SignIn</a>
              </li>
            </Link>
          </ul>
        </div>
      </nav>
     )
 }
}


export default Navigation2;
import React from 'react';
import searchicon from './searchicon.png'
import addfood from './addfood.png'

const Navigation = ({isSignIn, onRouteChange}) => {
  if (isSignIn) {
    return (
        <div id='nav'>
           <div id='titel'>
               <h1>Instafood</h1>
           </div>
           <div className='btn'>
               <button id='search' className='btn pa1 shadow-5 ma2'><img id='searchicon' src={searchicon} /></button>
            </div>
            <div className='searchinput'>
               <input type='text' placeholder='Search'></input>
            </div>
           
           <div className='btn'>
           <button id='add' className='btn pa1 shadow-5 ma2'><img id='searchicon' src={addfood} /></button>
           </div>
           <div className='signin'>
               <h3 className='signin'>Sign Out</h3>
           </div>
        </div>
    )
  }
 else {
     return (
    <div id='nav'>
        <div id='titel'>
            <h1>Instafood</h1>
        </div>
        <div className='signin'>
           <h2 onClick={() => onRouteChange('signin')} className='signin pointer'>SignIn</h2>
        </div>
        <div className='btn'>
        </div>
     </div>
     )
 }
}


export default Navigation;
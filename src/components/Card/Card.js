import React from 'react';
import { Link } from 'react-router-dom';
import arrowup from './arrowup.png';
import arrowdown from './arrowdown.png';

class Card extends React.Component {
    constructor() {
       super()
          this.state = {
             Rating: ''
          }
    }

    getRating = (id) => {
      fetch('https://evening-beach-61667.herokuapp.com/getrating', {
         method: 'post',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({ id: id })
      })
      .then(response => {
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         return response.json();
      })
      .then(rating => {
         if (rating && Array.isArray(rating) && rating.length > 0 && rating[0].hasOwnProperty('rating')) {
            this.setState({ Rating: rating[0].rating });
         } else {
            throw new Error('Unexpected data structure');
         }
      })
      .catch(error => {
         console.error('There was a problem with the fetch operation:', error.message);
      });
   }
   
   

// getRating = (id) => {
//    fetch('https://evening-beach-61667.herokuapp.com/getrating', {
//       method: 'post',
//           headers: {'Content-Type': 'application/json'},
//               body: JSON.stringify({
//                 id: id  
//     })
//        }).then(rating => rating.json())
//        .then(rating => {
//           this.setState({ Rating: rating[0].rating })             
//        }).catch(console.log('Catch Error2'))
// }
   
// onRating = (id, email, action) => {
//    try { 
//       fetch('https://evening-beach-61667.herokuapp.com/rating', {
//           method: 'post',
//               headers: {'Content-Type': 'application/json'},
//                   body: JSON.stringify({
//                     id: id,
//                     email: email,
//                     action: action    
//         })
//            }).then(rating => rating.json())
//            .then(rating => {
//               this.setState({ Rating: rating })             
//            }).catch()
//   } catch {}

// }
onRating = (id, email, action) => {
   // Validate that all parameters are non-empty strings
   if (typeof id !== "string" || id.trim() === "" ||
       typeof email !== "string" || email.trim() === "" ||
       typeof action !== "string" || action.trim() === "") {
       console.error("Invalid parameters provided. All parameters must be valid strings.");
       return; // Exit the function early if validation fails
   }

   fetch('https://evening-beach-61667.herokuapp.com/rating', {
       method: 'post',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
           id: id,
           email: email,
           action: action    
       })
   })
   .then(response => {
       // Check if the response is successful (status code in the range 200-299)
       if (!response.ok) {
           throw new Error(`HTTP error! Status: ${response.status}`);
       }
       return response.json();
   })
   .then(rating => {
       this.setState({ Rating: rating });
   })
   .catch(error => {
       console.error("There was a problem with the fetch operation:", error.message);
       // Handle the error as needed e.g., display a notification to the user or update the state.
   });
}





 render() {
 const username = this.props.username;
 const ownname = this.props.ownname;
 const onNameClick = this.props.onNameClick;
 const onDel = this.props.onDel;
 const onRecipeClick = this.props.onRecipeClick;
 var img = this.props.img;
 const type = this.props.type;
 const name = this.props.name;
 const recipe = this.props.recipe;
 const tags = this.props.tags;
 const id = this.props.id;
 const onRating = this.onRating;
 const email = this.props.email;
 if (this.props.img === 7) {
    img = 'noimg.jpg'
 } 
 if (!this.state.Rating) {
   try {
    this.getRating(id);
   } catch(error) {}
 }
 if (username === `${ownname}` || 'Dan Amir') {
    return ( 
        <div className='navy tc dib br3 pa3 ma2 bw2 shadow-5 card'>
            <div className='top'>
               <Link style={{ textDecoration: 'none' }} to='/profile'>
               <h2 onClick={() => {onNameClick(`${ownname}`) }} className='tl ownname pointer font1'>{ownname}</h2>
               </Link>
               <h4 className='type font3'>{type}</h4>
               <img onClick={() => {onDel(`${id}`,  `${ownname}`, `${username}`) }} className='del pointer' src='https://cdn.iconscout.com/icon/premium/png-512-thumb/delete-1432400-1211078.png' width='35px' height='35px' />
            </div>
            <Link style={{ textDecoration: 'none' }} to='/recipe'>
            <img onClick={() => {onRecipeClick(`${recipe}`, `${name}`, `${ownname}`,`${img}`) }} className='recipeimg pointer tc' alt='recipe' src={img} width='300px' height='300px' />
            </Link>
            <div className='info'>
            <div className='infol'>
               <div className='name'>
                <Link style={{ textDecoration: 'none' }} to='/recipe'>
                <h3 onClick={() => {onRecipeClick(`${recipe}`, `${name}`, `${ownname}`,`${img}`) }} className='font4 pointer ma0'>{name}</h3>
                </Link>
               </div>
               <div className='tags tl'>
                  <h5 className='tags font2 tl'>{tags}</h5>
               </div>
            </div>
               <div className='rating'>
                  <img onClick={() => {onRating(`${id}`, email, 'up') }} src={arrowup} className='pointer' width='30px' height='30px' />  
                     <h6>{this.state.Rating}</h6>
                  <img onClick={() => {onRating(`${id}`, email, 'down') }} src={arrowdown} className='pointer' width='30px' height='30px' />  
                </div>
                
            </div>
            
        </div>
            );
        
 } else {
    return ( 
    <div className='navy tc br3 pa3 ma2 bw2 shadow-5 card'>
      <div className='top'>
        <Link style={{ textDecoration: 'none' }} to='/profile'>
        <h2 onClick={() => {onNameClick(`${ownname}`) }} className='tl ownname pointer font1'>{ownname}</h2>
        </Link>
        <h4 className='type font3'>{type}</h4>
        </div>
        <Link style={{ textDecoration: 'none' }} to='/recipe'>
        <img onClick={() => {onRecipeClick(`${recipe}`, `${name}`, `${ownname}`,`${img}`) }} className='recipeimg pointer tc' alt='recipe' src={img} width='300px' height='300px' />
        </Link>
        <div className='info'>
            <div className='infol'>
               <div className='name'>
                <Link style={{ textDecoration: 'none' }} to='/recipe'>
                <h3 onClick={() => {onRecipeClick(`${recipe}`, `${name}`, `${ownname}`,`${img}`) }} className='font4 pointer ma0'>{name}</h3>
                </Link>
               </div>
               <div className='tags tl'>
                  <h5 className='tags font2 tl'>{tags}</h5>
               </div>
            </div>
               <div className='rating'>
                  <img onClick={() => {onRating(`${id}`, email, 'up') }} src={arrowup} className='pointer' width='30px' height='30px' />  
                     <h6>{this.state.Rating}</h6>
                  <img onClick={() => {onRating(`${id}`, email, 'down') }} src={arrowdown} className='pointer' width='30px' height='30px' />  
                </div>
                
            </div>
    </div>
        );
    }
   }
    
    }
    


export default Card;
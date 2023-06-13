import React from 'react';

const Recipe = ({Recipe, name, ownname, img, SaveStates, LoadStates, StateObject}) => {
   if (!StateObject.recipeimg.length) {
      LoadStates();
  }
      SaveStates();

   console.log('trxxxxxx', img)

    return (
   <div className='ma4'>
     <div className=''>
        <h1 className='font3'>{name}</h1><h3 className='font51'>by {ownname}</h3>
     </div>
     <div>
     <img className='recimg pointer tr' alt='recipe' src={img} width='200px' height='200px' />
        <p>{Recipe}</p>
     </div>
   </div>
   )
}

export default Recipe;
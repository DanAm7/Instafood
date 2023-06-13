import React from 'react';
import Card from '../Card/Card';


class Categories extends React.Component {
    constructor() {
        super()
    }

    render() {
    const SaveStates = this.props.SaveStates;
    const LoadStates = this.props.LoadStates;
    const StateObject = this.props.StateObject;
    const feed = this.props.feed;
    const onDel = this.props.onDel;
    const username = this.props.username;
    const onRecipeClick = this.props.onRecipeClick;
    const profileFeed = this.props.profileFeed;
    const cat = this.props.cat;

    if (!StateObject.profilefeed.length) {
        LoadStates();
    }
        SaveStates();


    if (!feed.length) {
        return <h1 className='font1'>Loading...</h1>
    }
    return (
       <div>
           <div >
            <h1 className='tc center font5'>Recipes for {cat}</h1>
            </div>
        <div className="tc list">

           
           {
               feed.map((info, i) => {
                    return (
                    <Card onDel={onDel}
                    username={username}
                    onRecipeClick={onRecipeClick}
                    onNameClick={profileFeed} 
                    key={i}
                    img={feed[i].imgsrc}
                    ownname={feed[i].ownname}
                    name={feed[i].name}
                    type={feed[i].type}
                    tags={feed[i].tags}
                    recipe={feed[i].recipe}
                    />
                    )
               })
           }
        </div>
        </div>
    )
}
}


export default Categories;
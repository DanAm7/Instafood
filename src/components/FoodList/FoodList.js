import React from 'react';
import { Redirect } from 'react-router-dom';
import Card from '../Card/Card';


class FoodList extends React.Component {
    constructor() {
        super()
        this.state = {
            feed: [],
            searchfield: ''
        }
    }


    onSearchClick = () => {
        if (this.state.route === 'profile') {
          const filteredfeed = this.state.profilefeed.filter( recipe => {
          return recipe.name.toLowerCase().includes(this.state.searchfield.toLocaleLowerCase());})
          this.setState({ profilefeed: filteredfeed });
        } else {
        const filteredfeed = this.state.feed.filter( recipe => {
        return recipe.name.toLowerCase().includes(this.state.searchfield.toLocaleLowerCase());})
        this.setState({ feed: filteredfeed });
        
        }
      }
    

    render() {
    
    
   if (!this.props.feed[0]) {
   this.props.loadFeed();
   } 
    const isSignIn = this.props.isSignIn;
    const feed = this.props.feed;
    if (feed.length === 0) {
        return <h1 className='font1'>Loading Feed...</h1>
    }
    if (!isSignIn) {
        return <Redirect to='/signin' />
    }
    return (
        <div className="list tc center">
           {
               feed.map((info, i) => {
                    return (
                    <Card 
                    onDel={this.props.onDel}
                    username={this.props.username}
                    onRecipeClick={this.props.onRecipeClick}
                    onNameClick={this.props.profileFeed} 
                    email={this.props.email}
                    key={i}
                    rating={feed[i].rating}
                    id={feed[i].id}
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
    )
        }
}


export default FoodList;
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class AddNewPost extends React.Component  {
    constructor(props) {
        super(props);
        
        this.state = {
            ownname: this.props.ownname,
            img: '',
            name: '',
            type: '',
            tags: '',
            recipe: '',
            GoHome: false
        }
    }

   

    GoHome = () => {
       this.setState({ GoHome: true });
    }
    
    ClearForm = () => {
        document.querySelector('.nameadd').value='';
        document.querySelector('.tagsadd').value='';
        document.querySelector('.recipeadd').value='';

    }

    onInputChange = () => {
        const file = document.getElementById('select').files[0];
        if (file.type.match(/image.*/)) {
        var imgel = document.createElement("img");   
        var prediv = document.getElementById('prediv');  
        imgel.id = 'preview';              
        prediv.appendChild(imgel); 
        var img = document.getElementById('preview');
        img.src = window.URL.createObjectURL(file);
        } else {
            alert('This file is not an image!')
        }
        
    
    }

    Next = () => {
        this.props.onRouteChange('home');
        this.ClearForm();
        this.GoHome();
    }

    onPost = () => {
        var Self = this;
        const ownname = this.props.ownname;
        const type = document.querySelector('.typeadd').value;
        const tags = document.querySelector('.tagsadd').value;
        const recipe = document.querySelector('.recipeadd').value;
        const name = document.querySelector('.nameadd').value.substring(0, 10);
        const file = document.getElementById('select').files[0];

        if (!file || !name) {
            alert('Please Insert image and name for your new recipe');
        } else {
        if (file) {
        if (file.type.match(/image.*/)) {
            var canvasel = document.createElement("canvas");   
            var prediv = document.getElementById('prediv');  
            canvasel.id = 'canvas';              
            prediv.appendChild(canvasel);
            var img = document.getElementById('preview');
            var canvas = document.getElementById('canvas');
        var MAX_WIDTH = 800;
        var MAX_HEIGHT = 600;
        var width = img.width;
        var height = img.height;

        if (width > height) {
        if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
        }
        } else {
        if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
        }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        img.remove();
        var dataurl = canvas.toDataURL("image/png");

        function After() { 
            alert('Posting Please wait');
            const formData = new FormData();
            formData.append('img', dataurl);
            alert('1')
           fetch('https://evening-beach-61667.herokuapp.com/upload', {
            method: 'POST',
            body: formData
        }) .then(res => {
            Self.Next();
            // Next(route, clear, home);
        }).catch(alert('123'))
    }
         
/////////////////////////////////////////////////////////////////////////////////////////////
       
        // //////////////////////////////////////////////////////////////////////////////
        const formData = new FormData();
        formData.append('ownname', ownname);
        formData.append('name', name);
        formData.append('type', type);
        formData.append('tags', tags);
        formData.append('recipe', recipe);
        alert('2')
        fetch('https://evening-beach-61667.herokuapp.com/addpost', {
            method: 'POST',
            body: formData
        }) 

        .then(res => {
            After(Self);
        }).catch(alert('444'))
        
    } else {
        alert('Please choose an image');
    }
}
        }
    }


    render() {
        var self = this;
        if(this.props.isSignIn === false) {
            return <Redirect to='/signin' />
        }
    
        if (this.state.GoHome) {
           return <Redirect to='/' />
        }
    const file = document.getElementsByClassName('fileinput');
    return (
        <div>
        <article className=" br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
        <div className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <legend className="f1 fw6 ph0 mh0">New Recipe Post</legend>
        <div className="mt3">
            <label className="db fw6 lh-copy font21 ">image</label>
            <input type='file' accept="image/*" className='fileinput' id='select' onChange={this.onInputChange} /> 
            <div id='prediv'>
            </div>
            {/* <input className="pa2 input-reset ba  hover-bg-black hover-white w-100 imgadd" placeholder='Image Url' type="text" name="name"  id="name" /> */}
        </div>
        <div className="mt3">
            <label className="db fw6 lh-copy font21">Recipe Name</label>
            <input onChange={this.onNameChange} className="pa2 input-reset ba  hover-bg-black hover-white w-100 nameadd" type="email" name="email-address"  id="email-address" />
        </div>
        <div className="mv3">
            <label className="db fw6 lh-copy font21" >Type</label>
            <select onChange={this.onTypeChange} className="pa2 input-reset ba  hover-bg-black hover-white w-100 typeadd" type="text" name="password"  id="password">
                <option value="Lunch">Lunch</option>
                <option value="Breakfest">Breakfest</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div className="mt3">
            <label className="db fw6 lh-copy font21">Description</label>
            <textarea onChange={this.onTagsChange} className="pa2 input-reset ba  hover-bg-black hover-white w-100 tagsadd" type="textarea" name="name"  id="name" />
        </div>
        <div className="mt3">
            <label className="db fw6 lh-copy font21">Recipe</label>
            <textarea onChange={this.onRecipeChange} className="pa2 input-reset ba  hover-bg-black hover-white w-100 recipeadd" type="textarea" name="name"  id="name" />
        </div>
        </fieldset>
        <div className="">
        <button className="b ph3 pv2 input-reset ba b--black  grow pointer f6 dib btn" onClick={this.onPost}>Post</button>
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

export default AddNewPost;
# SD Intro to React Workshop

## Learning Competencies

* Components
* Props 
* State
* State Driven vs. Event Driven JavaScript

## Summary
In this workshop we'll be creating a comment section using React. React is a JavaScript library that is used to handle the view layer of your application. It uses JSX (JavaScript XML) to create a virtual DOM renders an re-render very quickly. Some of the syntax we're using may look a bit funky and that's because we're using the ES2015 JavaScript syntax. It can take a bit of getting used to but it's really great and is the future of JavaScript!

React's use of modular components means the code is designed for reusability. The components are nested in a heirarchy providing a one-way data flow from the top component through it's. It differs from many JavaScript libraries because it is state driven rather than event driven. To see what that means let's take the example of showing and hiding a form when a button is clicked (spoiler alert, this is something we'll actually be doing!). In an event driven library when you click a button, that action would be directly responsible for showing and hiding the form. Because React is state driven, the component's state would be 


The example here was created using Facebook's [react-create-app](https://github.com/facebookincubator/create-react-app) generator. This handles all of the build configuration so we don't have to spend time worrying about things like webpack (which bundles our javascript) and babel (which transpiles our JavaScript into ES5 to run in all browsers) and can get straight to working with React. This configuration is outside of the scope of the workshop but it's worth noting these things are running under the hood. If you want to research these further you can check out the Webpack documentation [here](https://webpack.github.io/docs/) and the babel documentation [here](https://babeljs.io/docs/setup/)

## Releases

### Release 0: 
Open up your terminal and in the the root directory of the project type `yarn install` then `yarn start`. The first command will load all of the JS libraries listed in the `package.json` file. The second command will start a local server so we can view the project in a browser.

Now let's open a browser and visit `http://localhost:3000/`. This static comment section is what we're going to be working with through these releases. The button to add new comments isn't working, but don't worry we'll take care of that shortly.

First we're going to take a look at the files and see what's happening. If we open the `public` folder we can see an `index.html` file. As we'd expect, this is the file that's being rendered on the page when we visit `localhost:3000`. But it looks empty. Where's all the markup?

Let's take a look in the App.js file. In this file we can see something that looks really similar to HTML that matches up with what we have in our comment section. This is JSX! This is also our first React component. At a minimum, every React component needs to have a `render()` function that returns some JSX. So far in this example `App` is responsible for rendering all the jsx that we see when the page loads. Not super useful, but a good place for us to get started.

But how is the component being rendered into `index.html`? If we open `index.js` we can see this bit of code:

``` JavaScript
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
This is the connection between React and our page. We're calling the `render()` function on the ReactDOM API and telling it to render the `App` component into the element on the page with the id `root`. React components are a heirarchy. We'll only be using this `ReactDOM.render()` function once per page and all of our other components will be rendered into this one.

You can check out further documentation on `ReactDOM` [here](https://facebook.github.io/react/blog/2015/10/01/react-render-and-top-level-api.html) and it's `render()` function [here](https://facebook.github.io/react/docs/react-dom.html#render)

### Release 1: Breaking Things Into Components

#### Defining A Component
Let's take a look in `App.js` to see how to define a component. On line 1 we are importing `Component` from the `react` library. 
``` JavaScript
import React, { Component } from 'react';
```
On line 4 we are creating an `App` class using ES2015 syntax and extending React's `Component` class to make it a component.  We can define as many functions as we want here for the class's use though we only need a render for now. 
``` JavaScript
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* All the JSX! */}
      </div>
    );
  }
}
```
We're then exporting our App component on line 41 so other files can import it.
``` JavaScript
export default App;
```

#### Component Architecture
We can start by creating a `components` folder in our `src` directory. React will let you organize your components however you like and there are a lot of opinions of what the best way is. When you start building real React applications it's worth looking into but for the purpose of this excercise we'll keep all of our components in the `components` folder.

Let's take a look at the page and determine what we want our component heirarchy to look like. We can start with a `CommentsContainer` component. This component will act as a wrapper around the comments and be in charge of handling the add comment button. Once this component is created we need to render it in `App.js`.

To do this we first need to import the code from `CommentsContainer` at the top of the file. 
``` JavaScript
import CommentsContainer from './components/CommentsContainer';
```
This will set the exported class from the `CommentsContainer` file as a variable `CommentsContainer` that we can use.

To render a compent we just need to wrap the `CommentsContainer` variable in a self closing tag in our `App.js` component's JSX. While we're at it, let's remove the existing markup because that's all going to get moved into sub components.

``` JavaScript
return (
  <div className="App">
    <CommentsContainer
   />
  </div>
);
```

Nested in CommentsContainer we can create a `comments` component. This component will be in charge of rendering all of the comments. We'll import and render this component in the CommentsContainer component in the same way we did earlier.
``` JavaScript
import Comments from './Comments'
```
``` JavaScript
render() {
  return (
    <div className="CommentsContainer">
      <Comments />
    </div>
  );
  ```

Finally we'll add a `comment` component. This is where we'll really leverage componetization because we can use the same component for all comments just by changing the data we pass in. We'll need to import it at the top of `Comments`.
``` JavaScript
import Comment from './Comment';
```
Because comment is a much simpler component that does not rely on state we can create it as a functional component. Rather than defining a whole class we will just define a function and export it in the same way. 
``` JavaScript
import React from 'react';

const Comment  = () => (
  <div className="Comment">
    <div className="Comment__body">
      comment body
    </div>
    <div className="Comment__author">
      <span className="Comment__author-name">author</span>
      comment author
    </div>
  </div>
)

export default Comment;
  ```
We did a lot in this section and we want to make sure we're on the right track. Before moving on to release 2 take a moment to checkout the `release_1` branch and view the example code and make sure it matches what we have.

### Release 2: Add Some Data
#### State and Props
React components have two important data attributes, state and props. These are both just plain JavaScript objects. Props are date that has been passed in to a component when it is rendered. State holds information about the component's current status, what should be displayed, what should be hidden, etc. Every time state is updated, the component will re-render.  
#### Adding Comments
Now that we have an idea of how components can handle data, let's add some! We're going to add the comments as an array with comment objects inside. Each comment should have an author and a body. So it should look something like this:

You can read more about state in the React docs [here](https://facebook.github.io/react/docs/state-and-lifecycle.html)
``` JavaScript
const comments = [
  {
    author: "Kurt Vonnegut", 
    body: "I urge you to please notice when you are happy, and exclaim or murmur or think at some point, 'If this isn’t nice, I don’t know what is.'"
  }, 
  {
    author: "Tom Robbins", 
    body: "You should never hesitate to trade your cow for a handful of magic beans."
  }
];
```
We're going to add this to the state of the CommentsContainer component which is the parent component. We'll then pass it to the child components as props. 

We want to define the comments in the parent component, which in this case is the CommentsContainer and pass it to the child components as props. 

To set the initial state of the CommentsContainer component we need to add a base constructor and set the state there. This function will get called once when the component mounts.
``` JavaScript
  constructor(props) {
    super(props);

    this.state = { 
      comments: commentsjj
    };
  }
```
And to pass it as props to the child components we will add it to the self closing tags. 
``` JavaScript
 <Comments comments={this.state.comments} />
 ```
 We will then be able to access a comments attribute on the Comments component by calling `this.props.comments` and whenever the state gets updated in the parent component the data will flow through all of the components. 
#### Rendering Comments
The comment data is now accessible in the comments component but how do we create a list of comments? The good news is React is really good at rendering JSX. We can write a function that maps over the collection, renders a Comment component for each item, and passes that item's data into the component as props. Then all we have to do is call this function in the Comments component render function.
``` JavaScript
  const renderComments = (comments) => {
    if(comments){
      return comments.map( (comment, index) => 
        <Comment key={index} comment={comment}/>
      )
    }
  }
```
``` JavaScript
  return (
    <div Name="Comments">
      <div className="Header">
        Comments
        </div>
      {renderComments(comments)}
    </div>
  );
```
You'll notice in the code above that we are adding a prop called key to the Comment. Keys are used by React to help identify which items have changed so it only needs to re-render what is necessary and help it to be so performant. You can read more about it in the React docs [here](https://facebook.github.io/react/docs/lists-and-keys.html)

Now we just need to update our `Comment` component to use the props we're passing in rather than the static data we had added previously. The '({comment})' may look a little weird. We're using ES2015's destructuring to pull out the comment object from the props passed in. For more on that check out the docs [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
``` JavaScript
import React from 'react';

const Comment  = ({comment}) => (
  <div className="Comment">
    <div className="Comment__body">
      {comment.body}
    </div>
    <div className="Comment__author">
      <span className="Comment__author-name">author</span>
      {comment.author}
    </div>
  </div>
)

export default Comment;
```
Check out the code on the `release-2` branch to see the completed code.

### Release 3: Add Form
#### Adding a Form Component
Now that we're displaying a list of comments let's get that add comment button working! The first thing we are going to need is a Form component. This form will just have a text input for an author and a text field for the comment body. Let's go ahead and add a cancel button as well to close the form. We'll wire up functionality for the button a little later, right now we just need the element.
``` JavaScript
class Form extends Component { 

  render() {
    return (
      <div>
      <form className="Form" onSubmit={this.props.handleFormSubmit}>
        <textarea name="body" placeholder="comment"/><br/>
        <input type="text" name="author" placeholder="author"/><br/>
        <input type="submit" value="Submit"/>
      </form>
        <a className="btn__cancel" href="#" cancel</a>
      </div>
    );
  }
}
```
Don't forget to export!
``` JavaScript
export default Form;
```
#### Rendering the Form
We're going to need to render the form, but we don't want it to be displayed all the time. We only want the form to display when the create comment button is clicked. We can do this by adding some state to the CommentsContainer component where we're going to display the form. In the base constructor function where the comments is being added to the state, let's add another piece of state called `displayForm` and give it a boolean value of `false`.
``` JavaScript
constructor(props) {
  super(props);

  this.state = { 
    showForm: false,
    comments: comments()
  };
}
```
We can use this state to write a function that will display the Form component when the showForm state is true and display the add comment button when it is false.
``` JavaScript
  renderForm() {
    if(this.state.showForm){
      return <Form />
    } else {
      return <button>Add Comment</button>
    }
  }
```
and call `renderForm()` in the component's render function. This function will get evaluated on render and return the correct element.
``` JavaScript
  render() {
    return (
      <div className="CommentsContainer">
        <Comments comments={this.state.comments} />
        {this.renderForm()}
      </div>
    );
  }

```

#### Release 4: Show and Hide the Form
So the form only displays when the `displayForm` state is `true`, but how do we change the state? We want the state to change when the button is clicked so let's add a click handler that calls a function that updates the state.

First let's add a `showCommentForm` function. All we have to do to update the state is call the `setState()` function on the component and pass it the object we want to update. This will only update the key value pair we are passing in. All other pairs in the state object will stay the same.
``` JavaScript
showCommentForm(e) {
  e.preventDefault();
  this.setState({ showForm: true })
}
```
Now we can bind this to the show comment button returned in the `renderForm()` function. We need to bind the context of `this` to the function because it will be called at a later time. !!!(is this the correct explanation for binding this?)!!!
``` JavaScript
<button onClick={this.showCommentForm.bind(this)}>Add Comment</button>
```
And we're going to want to close the form when the cancel button is clicked so let's add a `hideCommentForm()` function as well.
``` JavaScript
hideCommentForm(e) {
  e.preventDefault();
  this.setState({ showForm: false })
}
 ```
 To bind this to the cancel button we're going to have to do something a little different. We need to pass this function to the Form component in the `renderForm()` function as a prop, once again binding `this`.
``` JavaScript
  <Form hideCommentForm={this.hideCommentForm.bind(this)} />
```
and then add a click handler to the cancel button in the Form component
``` JavaScript
 <a className="btn__cancel" href="#" onClick={this.props.hideCommentForm}>cancel</a>
 ```
 
Checkout the branch for release-4 to see this code in action

### Release 5: Add Form Submit Handler
We can show and hide the form but it's not doing anything yet. We need to add a submit handler for this form that will add the comment we created to the comments in the CommentsContainer component's state. To do this we'll also need a utility method that can create an object from our form values.
``` JavaScript
getFormValues(form) {
  var kvpairs = {};
  for ( var i = 0; i < form.elements.length; i++ ) {
    var e = form.elements[i];
    if(e.name){
      kvpairs[e.name] = e.value;
    }
  }
  return kvpairs;
}
```
This is just looping over each form input and creating a key/value pair with the key being the input's name and the value being it's value.

We can the create our submit handler function that will use `getFormValues` to create a "comment object", add it to the comment list and update the state.
``` JavaScript
handleFormSubmit(event) {
  event.preventDefault();
  let newComment = this.getFormValues(event.target)
  let list = [...this.state.comments, newComment]
  this.setState({ 
    showForm: false,
    comments: list
  })
}
```
Now we can pass this `submitHandler()` function to the Form component as a prop
``` JavaScript
<Form handleFormSubmit={this.handleFormSubmit.bind(this)} hideCommentForm={this.hideCommentForm.bind(this)} />
```
and add a submit handler to the Form component
``` JavaScript
  <form className="Form" onSubmit={this.props.handleFormSubmit}>
```
Because we're defining the `handleFormSubmit()` function in CommentsContainer and passing it through as props it will update the state of CommentsContainer and that update will flow through the child components automatically. !!!(Say something about this being a cornerstone of React)!!!

Check out the completed code on the release-5 branch

### Release 6: Simple Client Side Validation
One last thing, there's a small issue with our comment form. What happens when we submit an empty comment? Luckily because our submit handler is just plain old JavaScript adding some validation is super easy! To validate for presence we can just check to see if there is a title and author before updating the state

``` JavaScript
handleFormSubmit(event) {
  event.preventDefault();
  let newComment = getFormValues(event.target)
  if(newComment.body && newComment.author){
    let list = [...this.state.comments, newComment]
    this.setState({ 
      showForm: false,
      comments: list
    })
  }
}
```
And this could be extended to any validations we want. Say we want to attribute quotes with no author to "anonymous". That's easy too! Just set the value if it's empty in `handleFormSubmit()`.
``` JavaScript
handleFormSubmit(event) {
  event.preventDefault();
  let newComment = getFormValues(event.target)
  newComment.author = newComment.author ? newComment.author : "anonymous"
  if(newComment.body){
    let list = [...this.state.comments, newComment]
    this.setState({ 
      showForm: false,
      comments: list
    })
  }
}
```

### Stretch Challenges
- Add a validation to make sure the first and last name of a user are capitalized
- Some stretch that uses state
- Some stretch that uses passed in props


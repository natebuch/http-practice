import React, {Component} from 'react';
import request from 'superagent'
import axios from 'axios'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      response: [],
      text: ""
    }
  } 

  componentDidMount = () => {
  fetch('https://jsonplaceholder.typicode.com/posts/?_limit=10')
    .then((response => { 
     return response.json()
    }))
    .then((data => { 
      console.log("This is your data", data)
      this.setState({
        response: data
      })
    }))
  }

  createPostFetch = () => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: "POST",
      body: JSON.stringify({
        title: "new post fetch title",
        body: "this is a new post",
        userId: 1
      }),
    })
    .then((response => { 
      return response.json()
    }))
    .then((data => { 
      const posts = this.state.response
      posts.push(data)
      this.setState({
        response: posts
      })
    }))
    console.log(this.state.response)
  }

  createPostAxios = () => {
    axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: "new post axios title",
      body: "this is a new axios post",
      userId: 1
    })
    .then((response) => {
      const data = response.data
      const posts = this.state.response
      posts.push(data)
      this.setState({
        response: posts
      })
    })
    console.log(this.state.response)
  }

  createPostSuperAgent = () => {
    request.post('https://jsonplaceholder.typicode.com/posts', {
      title: "new post superagent title",
      body: "this is a new superagent post",
      userId: 1
    })
    .then((response) => {
      const data = response.body
      const posts = this.state.response
      posts.push(data)
      this.setState({
        response: posts
      })
    })
    console.log(this.state.response)
  }

  displayTitles = () => {
    const response = this.state.response
    return response.map(response => 
        <li style={{ listStyleType: "none"}}>{ response.title }</li>
      )
  }

  render() { 
    return (  
      <div>
        <h1>SuperAgent Practice</h1>
        <button onClick={this.createPostFetch}>Create Fetch Post</button>
        <button onClick={this.createPostAxios}>Create Axios Post</button>
        <button onClick={this.createPostSuperAgent}>Create SuperAgent Post</button>
          { this.displayTitles() }
      </div>
    );
  }
}
 


export default App;

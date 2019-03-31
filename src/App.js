import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import Todos from './components/Todos';
import Axios from "axios";

import "./App.css";

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({ todos: res.data }))
  }

  toggleComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    })});
  }

  delTodo = (id) => {
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] })).catch(err => console.error('delete error:' + err))
  }

  addTodo = (title) => {
    Axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      complated: false,
    }).then(res => this.setState({
      todos: [...this.state.todos, res.data]
    })).catch(err => console.error('add errro: ' + err))
  }

  render() {
    return (
      <Router>     
        <div className='app'>
          <div className="container">
            <Header />
            <Route  exact path='/' render={props => (
              <React.Fragment>
                <AddTodo addTodo = { this.addTodo } />
                <Todos 
                  markComplete = { this.toggleComplete } 
                  todos = { this.state.todos } 
                  delTodo = { this.delTodo } 
                />
              </React.Fragment>
            )} />
            <Route path='/about' component={About} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;

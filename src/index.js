import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import ExcelReader from './ExcelReader';
import { Provider } from 'react-redux';
import store from './redux/store';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <Provider store = {store}>
        <ExcelReader/>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));

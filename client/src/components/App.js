//import React, { Component } from 'react';

//import logo from './logo.svg';
//import './App.css';



import { BrowserRouter, Route} from 'react-router-dom';
import React, { Component } from 'react';
import  Header from './Header'; 
import Body from './Body';

//const Header = () => <h2>Header</h2>
//const Body = () => <h2>Body</h2>

class App extends Component {
  render() {
    return (
      <div className="container">
          <BrowserRouter>
            <div>
              <Header />
              <Body />
              <Route path="/" component={Body} />
            </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;


/*
const App = () => {
//class App extends Component {
//  render() {
    return
      <div>
          Hi there!
      </div>;
  }
//}

export default App;
*/
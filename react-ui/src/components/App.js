import React, { Component } from 'react';
import { BrowserRouter} from 'react-router-dom';

import {languages} from "../utils/constants";
//helpers
import ClassNames from 'classnames';
import i18n from '../utils/i18n';

//components
import NavBar from './navbar/navbar';
import Routes from "./Routes";

//style
import '../assets/stylesheets/style.css';

class App extends Component {
  render() {
      const { className } = this.props;
      const newClassName = ClassNames(
          'wrapper', i18n.locale,
          languages.filter(function(languages) {
              return languages.code === i18n.locale;
          })[0].dir,
          className
      );
    return (
        <BrowserRouter>
            <div className={newClassName}>
                <NavBar />
                <Routes/>
            </div>
        </BrowserRouter>

    );
    }
}

export default App;

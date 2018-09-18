import React, { Component } from 'react';
//import logo from './curadiv_logo.jpg';
import MainCard from './MainCard';

class Body extends Component {
render() {
    return (
        
            <section className="section">
            <div className="container">
                <MainCard />
            </div>
            </section>
        
    );
}
}

export default Body;


/*
<h1 className="title">Welcome to the Best Website in the World!</h1>
<h2 class="subtitle">This page is a work in progress and will improve shortly</h2>
    <img src={logo} className="image is-3by1" alt="logo" />
*/
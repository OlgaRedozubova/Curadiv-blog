import React, { Component } from 'react';
import logo from './curadiv_logo.jpg';

class Header extends Component {
render() {
    return (
    <div class="column is-9">
    <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
        <li><a href="../">Explainers</a></li>
        <li><a href="../">Topics</a></li>
        <li><a href="../">Podcast</a></li>
        <li class="is-active"><a href="#" aria-current="page">Latest</a></li>
    </ul>
    </nav>
    <section class="hero is-info welcome is-small">
    <div class="hero-body">
        <div class="container"> 
            
            <h1 class="title">
             Curadiv    
            </h1>
            <h3 class="subtitle">
            Curated Knowledge.  Unlimited Potential.
            </h3>
        </div>
    </div>
    </section>
    </div>
    );
}
}

export default Header;

//<img src={logo} className="image is-3by1"/>
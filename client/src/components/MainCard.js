import React, { Component } from 'react';
//import logo from './curadiv_logo.jpg';

class MainCard extends Component {
render() {
    return (



<div className="columns">
  <div className="column">
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3"> <img src="https://source.unsplash.com/random/800x600" alt="Image"></img></figure>

      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image" style="height: 40px; width: 40px;"> <img src="https://source.unsplash.com/random/96x96" alt="Image"></img></figure>
          </div>
          <div className="media-content">
            <p className="title is-4">John Smith</p>
            <p className="subtitle is-6">@johnsmith</p>
          </div>
        </div>
        <div className="content"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
          <a>@bulmaio</a>.
          <a>#css</a>
          <a>#responsive</a>
          <br></br> <small>11:09 PM - 1 Jan 2016</small> </div>
      </div>
    </div>
  </div>
  <div className="column">
    
  </div>
</div>



    );
}
}

export default MainCard;

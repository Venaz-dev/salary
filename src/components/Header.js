import React from 'react';
//import { Link } from 'react-router-dom';
//import { auth } from '../services/firebase';

function Desktopheader() {
  return (
    <header className="main-header">
      <div class="logo-wrap is-logo-image site-branding">
        <a href="http://techietainment.io/" class="logo" title="Techie-Tainment">
          <img class="logo-default logo-sticky-retina logo-retina"  width="276" src="http://techietainment.io/wp-content/uploads/2020/06/t4a-01.png" alt="Techie-Tainment"/>
        </a>
      </div>
      <a href="http://techietainment.io/" className="main-menu">Home</a>
      <a href="http://techietainment.io/category/tech-news/" className="main-menu">Tech News</a>
      <a href="http://techietainment.io/category/hackhaton/" className="main-menu">Hackhaton</a>
      <a href="http://techietainment.io/category/freebies/" className="main-menu">Freebies</a>
      <a href="http://techietainment.io/category/conferences-meetups/" className="main-menu">Comferences/Meetups</a>
      <a href="http://techietainment.io/category/scholarships/" className="main-menu">Scholarships</a>
      <div className="search-icon float-right">
        <a href="http://techietainment.io/"></a>
      </div>
    </header> 

  )
}

export default Desktopheader
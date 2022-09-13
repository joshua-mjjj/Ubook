import React from 'react';

import { Footer, Blog, Possibility, Features, WhatGPT3, Services, Header } from '../containers';
import { CTA, Brand, Navbar, Banner, TopNav, Showcase } from '../components';

import '../App.css';

const StartPage = () => {
  return (
	  <div className="App">
	    <div className="">
	      <TopNav />
	      {/*<Banner />*/}
	      <Navbar />
	    </div>
	    <div className="">
	    	{/*<Showcase />*/}
	    	<Header />
	      <Services />
	    </div>
	   {/* <WhatGPT3 />*/}
	   {/* <Features />*/}
	    <CTA />
	   {/* <Brand />*/}
	    <Possibility />
	    <Blog />
	    <Footer />
	  </div>
)
};

export default StartPage;

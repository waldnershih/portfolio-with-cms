import React from 'react';

import {
	About,
	Contact,
	Header,
	Skills,
	Work,
	// Testimonial,
	Experiences,
} from './containers';
import { Navbar, SocialMedia, Footer } from './components';
import './App.scss';

const App = () => {
	return (
		<div className="app">
			<Navbar />
			<SocialMedia />
			<Header />
			<About />
			<Work />
			<Experiences />
			<Skills />
			{/* <Testimonial /> */}
			<Contact />
			<Footer />
		</div>
	);
};

export default App;

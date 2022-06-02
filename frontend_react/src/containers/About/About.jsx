import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { urlFor, client } from '../../services/sanity-client';
import { AppWrapper } from '../../wrapper';

import './About.scss';

const About = () => {
	const [abouts, setAbouts] = useState([]);

	useEffect(() => {
		const query = '*[_type == "about"]{descriptions, imgUrl}';
		client.fetch(query).then(data => {
			setAbouts(data);
		});
	}, []);

	const renderDescriptions =
		abouts.length &&
		abouts[0].descriptions.map((description, index) => (
			<p className="p-text" key={`description-${index}`}>
				{description}
			</p>
		));

	const renderImage = abouts.length && urlFor(abouts[0].imgUrl);
	const renderTitle = abouts.length && abouts[0].title;

	return (
		<div className="app__about app__flex app__section">
			<h2 className="head-text">
				<span>About </span> me
			</h2>
			<div className="app__about-container">
				<motion.div
					whileInView={{ x: [-50, 0], opacity: [0, 1] }}
					transition={{ duration: 0.5 }}
					className="app__about-article"
				>
					{renderDescriptions}
				</motion.div>
				<div className="app__about-image">
					<img src={renderImage} alt={renderTitle} />
				</div>
			</div>
		</div>
	);
};

export default AppWrapper(About, 'about', 'app__snowbg');

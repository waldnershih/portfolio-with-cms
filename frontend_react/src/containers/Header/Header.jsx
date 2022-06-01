import React from 'react';
import { motion } from 'framer-motion';
import { images } from '../../constants';

import { AppWrapper } from '../../wrapper';
import './Header.scss';

const arrowMotion = {
	rest: { x: 0, ease: 'easeOut', duration: 0.2, type: 'tween' },
	hover: {
		x: 8,
		transition: {
			duration: 0.4,
			type: 'tween',
			ease: 'easeIn',
		},
	},
};

const textMotion = {
	rest: {
		borderBottom: '1px solid transparent',
		transition: {
			duration: 2,
			ease: 'easeIn',
		},
	},
	hover: {
		borderBottom: '1px solid var(--secondary-color)',
		transition: {
			duration: 0.4,
			ease: 'easeOut',
		},
	},
};

const technologies = [
	{ alt: 'androidStudio', src: images.androidStudio, x: [0, -80], y: [0, -150] },
	{ alt: 'react', src: images.react, x: [0, -180], y: [0, 0] },
	{ alt: 'nodejs', src: images.node, x: [0, -80], y: [0, 150] },
	{ alt: 'redux', src: images.mongodb, x: [0, 80], y: [0, -150] },
	{ alt: 'react', src: images.aws, x: [0, 180], y: [0, 0] },
	{ alt: 'nodejs', src: images.docker, x: [0, 80], y: [0, 150] },
];

const Header = () => {
	const rederedTechnologies = technologies.map(technology => (
		<motion.div
			whileInView={{ x: technology.x, y: technology.y, opacity: [0, 1] }}
			transition={{ duration: 1.5, ease: 'easeInOut' }}
			className="app__flex circle-cmp"
			key={`circle-${technology.alt}`}
		>
			<img src={technology.src} alt={technology.alt} />
		</motion.div>
	));

	return (
		<div className="app__header">
			<motion.div
				whileInView={{ y: [100, 0], opacity: [0, 1] }}
				transition={{ duration: 0.5 }}
				className="app__header-info"
			>
				<h1 className="head-text">
					Hi, I am HsuanYu, <span>Web</span> and <span>Android</span> Developer
				</h1>

				<p className="p-text">
					I build and design a fully functional website and android application for
					business. Looking forwards to being a software developer with the creative team
					in Melbourne. If you consider me a good fit for your company, send me an email.
				</p>

				<motion.div
					initial="rest"
					whileHover="hover"
					animate="rest"
					className="app__header-link"
				>
					<motion.a href="#work">
						<motion.div variants={textMotion} className="link-text">
							See My Work
						</motion.div>
						<motion.img
							variants={arrowMotion}
							src={images.arrowRight}
							alt="arrow icon"
						/>
					</motion.a>
				</motion.div>
			</motion.div>
			<div className="app__header-circles">{rederedTechnologies}</div>
		</div>
	);
};

export default AppWrapper(Header, 'home');

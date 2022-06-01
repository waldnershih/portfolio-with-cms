import React, { useState, useEffect } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

import { images, pages } from '../../constants';

import './Navbar.scss';

const Navbar = () => {
	const [toggle, setToggle] = useState(false);
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleScroll = () => {
		setScrollY(window.pageYOffset);
	};

	const navbarPagesList = pages.map(page => (
		<li className="app__flex p-text" key={`link-${page}`}>
			<a href={`#${page}`}>
				<p className="p-text">{page}</p>
			</a>
		</li>
	));

	const menuPagesList = pages.map(page => (
		<li key={page}>
			<a href={`#${page}`} onClick={() => setToggle(false)}>
				<p className="p-text">{page}</p>
			</a>
		</li>
	));

	return (
		<nav className={`app__navbar ${scrollY > 1 && 'app__grey25bg'}`}>
			<div className="app__navbar-logo">
				<a href={`#home`}>
					<img src={images.logo} alt="logo" />
				</a>
			</div>
			<ul className="app__navbar-links">{navbarPagesList}</ul>

			<div className="app__navbar-menu">
				<div className="app__navbar-icon" onClick={() => setToggle(true)}>
					<HiMenuAlt4 />
				</div>

				<AnimatePresence>
					{toggle && (
						<motion.div
							key="menu"
							initial={{ opacity: 0, x: 400 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 400 }}
							transition={{ duration: 0.65, ease: 'easeInOut' }}
							className="app__navbar-menu-pages"
						>
							<HiX onClick={() => setToggle(false)} />
							<ul>{menuPagesList}</ul>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</nav>
	);
};

export default Navbar;

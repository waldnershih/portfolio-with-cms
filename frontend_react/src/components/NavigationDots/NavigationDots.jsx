import React from 'react';
import { pages } from '../../constants';

import './NavigationDots.scss';

const NavigationDots = ({ currentPage, setCurrentPage }) => {
	const navbarPagesList = pages.map((page, index) => (
		<a
			key={`${page}-${index}`}
			href={`#${page}`}
			className="app__navigation-dot"
			style={currentPage === page ? { backgroundColor: '#1c75eb' } : {}}
			onClick={() => setCurrentPage(page)}
		>
			{' '}
		</a>
	));

	return <div className="app__navigation">{navbarPagesList}</div>;
};

export default NavigationDots;

import React from 'react';
// import { NavigationDots, SocialMedia } from '../components';

const AppWrapper = (Components, idName, classNames) =>
	function HOC() {
		return (
			<div className={`app__container ${classNames}`}>
				<div id={idName} className="app__wrapper">
					<Components />
				</div>
			</div>
		);
	};

export default AppWrapper;

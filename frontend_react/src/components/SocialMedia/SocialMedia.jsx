import React from 'react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { FaGitlab } from 'react-icons/fa';

import './SocialMedia.scss';

const SocialMedia = () => {
	return (
		<div className="app__social">
			<a
				href="https://www.linkedin.com/in/hsuan-yu-shih-70a4a21b3/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<div>
					<BsLinkedin />
				</div>
			</a>
			<a href="https://github.com/waldnershih" target="_blank" rel="noopener noreferrer">
				<div>
					<BsGithub />
				</div>
			</a>
			<a href="https://gitlab.com/waldner0043" target="_blank" rel="noopener noreferrer">
				<div>
					<FaGitlab />
				</div>
			</a>
		</div>
	);
};

export default SocialMedia;

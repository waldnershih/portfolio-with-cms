import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AppWrapper, MotionWrapper } from '../../wrapper';
import { urlFor, client } from '../../services/sanity-client';

import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

import './Skills.scss';

const sortKeysByValues = (a, b) => {
	const lenA = a.value;
	const lenB = b.value;
	if (lenA > lenB) return -1;
	if (lenA < lenB) return 1;
	return 0;
};

const Skills = () => {
	const [skills, setSkills] = useState([]);
	const [skillsCategories, setSkillsCategories] = useState({});
	const [keysCategories, setKeysCategories] = useState([]);
	useEffect(() => {
		const skillsQuery = '*[_type == "skills"]|order(tags[0]){name,icon,tags}';
		client.fetch(skillsQuery).then(data => {
			setSkills(data);
		});
	}, []);

	useEffect(() => {
		if (skills) {
			const newSkillsCategories = {};
			for (let skill of skills) {
				let category = skill.tags[0];
				if (newSkillsCategories[category]) {
					newSkillsCategories[category].push(skill);
				} else {
					newSkillsCategories[category] = [skill];
				}
			}
			setSkillsCategories(newSkillsCategories);
		}
	}, [skills]);

	useEffect(() => {
		if (Object.keys(skillsCategories)) {
			const keysOb = Object.keys(skillsCategories).map(keyOb => ({
				name: keyOb,
				value: skillsCategories[keyOb].length,
			}));
			const keys = keysOb.sort(sortKeysByValues).map(keyOb => keyOb.name);
			setKeysCategories(keys);
		}
	}, [skillsCategories]);

	const renderedSkills = keysCategories.map((category, index) => {
		return (
			<motion.div
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.5, type: 'tween' }}
				className="app__skills-card"
				key={`${category}-${index}`}
			>
				<h2 className="subHead-text">{category}</h2>
				{skillsCategories[category] && (
					<motion.div className="app__skills-card-items">
						{skillsCategories[category].map(skill => {
							return (
								<motion.div
									whileInView={{ opacity: [0, 1] }}
									transition={{ duration: 0.5 }}
									className="app__skills-card-item"
									key={skill.name}
								>
									<Tooltip
										TransitionComponent={Zoom}
										placement="top"
										title={<p className="p-text-tooltip">{skill.name}</p>}
									>
										<div
											className="app__flex"
											style={{ backgroundColor: skill.bgColor }}
										>
											{skill.icon && (
												<img src={urlFor(skill.icon)} alt={skill.name} />
											)}
										</div>
									</Tooltip>
								</motion.div>
							);
						})}
					</motion.div>
				)}
			</motion.div>
		);
	});
	return (
		<>
			<h2 className="head-text">Skills</h2>

			<div className="app__skills-container">{renderedSkills}</div>
		</>
	);
};

export default AppWrapper(MotionWrapper(Skills, 'app__skills'), 'skills', 'app__primarybg');

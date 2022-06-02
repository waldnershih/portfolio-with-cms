import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AppWrapper } from '../../wrapper';
import { client } from '../../services/sanity-client';

import './Experiences.scss';

const Experiences = () => {
	const [experiences, setExperiences] = useState([]);
	const [educations, setEducations] = useState([]);

	useEffect(() => {
		const experiencesQuery =
			'*[_type == "experiences"]|order(year desc){yearStringForm, works}';
		const educationsQuery =
			'*[_type == "educations"]|order(date desc){dateStringForm, school, degree, major, location}';

		client.fetch(experiencesQuery).then(data => {
			setExperiences(data);
		});

		client.fetch(educationsQuery).then(data => {
			setEducations(data);
		});
	}, []);

	const renderExperiences = experiences.map(experience => (
		<div className="app__experiences-exp-item" key={experience.yearStringForm}>
			<div className="app__experiences-exp-year">
				<h4 className="p-text bold-text">{experience.yearStringForm}</h4>
			</div>
			<div className="app__experiences-exp-works">
				{experience.works.map(work => (
					<div key={work.name}>
						<div className="app__experiences-exp-work">
							<h4 className="p-text bold-text">{work.name}</h4>
							<p className="caption-text">{work.company}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	));

	const renderEducation = educations.map(education => (
		<div className="app__experiences-exp-item" key={education.dateStringForm}>
			<div className="app__experiences-exp-year">
				<h4 className="p-text bold-text">{education.dateStringForm}</h4>
			</div>
			<div className="app__experiences-exp-works">
				<div
					whileInView={{ opacity: [0, 1] }}
					transition={{ duration: 0.5 }}
					className="app__experiences-exp-work"
				>
					<h4 className="p-text bold-text">{`${education.degree} of ${education.major}`}</h4>
					<p className="caption-text">{`${education.school}, ${education.location}`}</p>
				</div>
			</div>
		</div>
	));

	return (
		<motion.div
			whileInView={{ x: [-50, 0], opacity: [0, 1] }}
			transition={{ duration: 0.5, ease: 'easeInOut' }}
			className="app__experiences app__section"
		>
			<div className="app__experiences-container">
				<h2 className="head-text">Experiences</h2>

				<div className="app__experiences-exps">
					<div className="app__experiences-exp">{renderExperiences}</div>
				</div>
			</div>
			<div className="app__experiences-container">
				<h2 className="head-text">Educations</h2>

				<div className="app__experiences-exps">
					<div className="app__experiences-exp">{renderEducation}</div>
				</div>
			</div>
		</motion.div>
	);
};
export default AppWrapper(Experiences, 'experiences', 'app__snowbg');

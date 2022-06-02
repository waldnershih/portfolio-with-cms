import React, { useEffect, useState } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { urlFor, client } from '../../services/sanity-client';
import { AppWrapper, MotionWrapper } from '../../wrapper';

import './Work.scss';

const workCategories = ['All', 'UI/UX', 'Mobile', 'Web', 'Game'];

const Work = () => {
	const [activeFilter, setActiveFilter] = useState('All');
	const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
	const [works, setWorks] = useState([]);
	const [filterWorks, setFilterWorks] = useState([]);

	useEffect(() => {
		const query = `*[_type == "works"]|order(finishTime desc){title,finishTime,isLatest,description,projectLink,codeLink,tags,imgUrl}`;

		client.fetch(query).then(data => {
			setWorks(data);
			setFilterWorks(data);
		});
	}, []);

	const handleWorkFilter = category => {
		setActiveFilter(category);
		setAnimateCard([{ y: 100, opacity: 0 }]);

		setTimeout(() => {
			setAnimateCard([{ y: 0, opacity: 1 }]);

			if (category === 'All') {
				setFilterWorks(works);
			} else {
				setFilterWorks(works.filter(work => work.tags.includes(category)));
			}
		}, 500);
	};

	const renderWorkCategories = workCategories.map((category, index) => (
		<div
			key={`${category}-${index}`}
			onClick={() => handleWorkFilter(category)}
			className={`app__work-filter-item app__flex p-text ${
				activeFilter === category ? 'item-active' : ''
			}`}
		>
			{category}
		</div>
	));

	const renderFilterWorks = filterWorks.map((work, index) => (
		<motion.div
			whileHover={{ scale: [1, 1.05] }}
			transition={{ duration: 0.3, ease: 'easeInOut' }}
			className="app__work-item app__flex"
			key={index}
		>
			<div className="app__work-img app__flex">
				<img src={urlFor(work.imgUrl)} alt={work.name} />

				<motion.div
					whileHover={{ opacity: [0, 1] }}
					transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
					className="app__work-hover app__flex"
				>
					{work.projectLink && (
						<a href={work.projectLink} target="_blank" rel="noreferrer">
							<motion.div
								whileInView={{ scale: [0, 1] }}
								whileHover={{ scale: [1, 0.9] }}
								transition={{ duration: 0.25 }}
								className="app__flex"
							>
								<AiFillEye />
							</motion.div>
						</a>
					)}

					{work.codeLink && (
						<a href={work.codeLink} target="_blank" rel="noreferrer">
							<motion.div
								whileInView={{ scale: [0, 1] }}
								whileHover={{ scale: [1, 0.9] }}
								transition={{ duration: 0.25 }}
								className="app__flex"
							>
								<AiFillGithub />
							</motion.div>
						</a>
					)}
				</motion.div>
			</div>

			<div className="app__work-content app__flex">
				<h4 className="p-text  bold-text">{work.title}</h4>
				<p className="p-text-16" style={{ marginTop: 10 }}>
					{work.description}
				</p>
				<div className="app__work-tag">
					<div>
						<p className="caption-text">{work.tags[0]}</p>
					</div>
					<div>
						<p className="caption-text">{work.tags[1]}</p>
					</div>
					{work.isLatest && (
						<div className="tag-latest">
							<p className="caption-text">Latest</p>
						</div>
					)}
				</div>
			</div>
		</motion.div>
	));

	return (
		<>
			<h2 className="head-text">
				Creative<span> Portfolio</span>
			</h2>
			<div className="app__work-filter">{renderWorkCategories}</div>
			<motion.div
				animate={animateCard}
				transition={{ duration: 0.5, delayChildren: 0.5 }}
				className="app__work-portfolio"
			>
				{renderFilterWorks}
			</motion.div>
		</>
	);
};

export default AppWrapper(MotionWrapper(Work, 'app__work'), 'work', 'app__primarybg');

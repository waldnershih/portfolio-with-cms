import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { AppWrapper, MotionWrapper } from '../../wrapper';
import { urlFor, client } from '../../services/sanity-client';

import './Testimonial.scss';

const Testimonial = () => {
	const [testimonials, setTestimonials] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleClick = index => {
		setCurrentIndex(index);
	};

	useEffect(() => {
		const testimonialQuery = '*[_type == "testimonials"]{company, feedback, name, imageUrl}';

		client.fetch(testimonialQuery).then(data => {
			setTestimonials(data);
		});
	}, []);

	return (
		<>
			{testimonials.length && (
				<>
					<div className="app__testimonial-item app__flex">
						{testimonials[currentIndex].imageUrl && (
							<img
								src={urlFor(testimonials[currentIndex].imageUrl)}
								alt={testimonials[currentIndex].name}
							/>
						)}

						<div className="app__testimonial-content">
							<p className="p-text">{testimonials[currentIndex].feedback}</p>
							<div>
								<h4 className="p-text">{testimonials[currentIndex].name}</h4>
								<h5 className="caption-text">
									{testimonials[currentIndex].company}
								</h5>
							</div>
						</div>
					</div>

					<div className="app__testimonial-btns app__flex">
						{currentIndex !== 0 ? (
							<div
								className={`app__flex testimonial-btns-active`}
								onClick={() => handleClick(currentIndex - 1)}
							>
								<HiChevronLeft />
							</div>
						) : (
							<div className={`app__flex testimonial-btns-non-active`}>
								<HiChevronLeft />
							</div>
						)}

						{currentIndex !== testimonials.length - 1 ? (
							<div
								className={`app__flex testimonial-btns-active`}
								onClick={() => handleClick(currentIndex + 1)}
							>
								<HiChevronRight />
							</div>
						) : (
							<div className={`app__flex testimonial-btns-non-active`}>
								<HiChevronRight />
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default AppWrapper(
	MotionWrapper(Testimonial, 'app__testimonial'),
	'testimonial',
	'app__primarybg',
);

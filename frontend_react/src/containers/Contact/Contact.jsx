import React, { useState, useEffect } from 'react';

import { AppWrapper, MotionWrapper } from '../../wrapper';

import emailjs from '@emailjs/browser';
import { validation } from '../../utils';
import { client, urlFor } from '../../services/sanity-client';

import './Contact.scss';

const initialData = {
	username: '',
	email: '',
	message: '',
	subject: 'Message from Hsuanyu Portfolio Website',
	isValid: {
		hasUsername: true,
		hasEmail: true,
		hasMessage: true,
	},
};
const initSubmittedResult = {
	isSubmitted: false,
	isSuccess: false,
	errorMessage: '',
};

const Contact = () => {
	const [formData, setFormData] = useState(initialData);
	const [formSubmittedResult, setFormSubmittedResult] = useState(initSubmittedResult);
	const [loading, setLoading] = useState(false);

	const { username, email, message } = formData;

	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		const contactQuery = '*[_type == "contact"]|order(title){title, description, link, imgUrl}';

		client.fetch(contactQuery).then(data => {
			setContacts(data);
		});
	}, []);

	const handleChangeInput = e => {
		const { name, value } = e.target;
		setFormData(preData => ({ ...preData, [name]: value }));
	};

	const isFormValidity = () => {
		const { username, email, message } = formData;
		return username && validation.validateEmail(email) && message;
	};

	const handleSubmit = () => {
		const { username, email, message } = formData;
		if (isFormValidity()) {
			setLoading(true);

			emailjs
				.send(
					process.env.REACT_APP_SERVICE_ID,
					process.env.REACT_APP_TEMPLATE_ID,
					formData,
					process.env.REACT_APP_PUBLIC_KEY,
				)
				.then(
					result => {
						console.log(result.text);
						setLoading(false);
						setFormSubmittedResult(preState => ({
							...preState,
							isSubmitted: true,
							isSuccess: true,
						}));
					},
					error => {
						console.log(error.text);
						setLoading(false);
						setFormSubmittedResult(preState => ({
							...preState,
							isSubmitted: true,
							errorMessage:
								'Something Went Wrong. Please send the message by my email provided above.',
						}));
					},
				);
		} else {
			const isValidData = {
				hasUsername: username && true,
				hasEmail: email && validation.validateEmail(email) && true,
				hasMessage: message && true,
			};
			setFormData(preData => ({ ...preData, isValid: isValidData }));
		}
	};

	const renderContacts = contacts.map(({ title, description, link, imgUrl }) => (
		<a
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			key={title}
			className="app__contact-card"
		>
			<div>
				{imgUrl && <img src={urlFor(imgUrl)} alt={title} />}

				<p className="p-text">{description}</p>
			</div>
		</a>
	));

	return (
		<>
			<h2 className="head-text">chat with me</h2>

			<div className="app__contact-cards">{renderContacts}</div>

			{!formSubmittedResult.isSubmitted ? (
				<div className="app__contact-form app__flex">
					<div className="app__flex">
						<input
							className="p-text"
							type="text"
							placeholder="Your Name"
							name="username"
							value={username}
							onChange={handleChangeInput}
						/>
					</div>
					{!formData.isValid.hasUsername && (
						<div className="app__contact-invalid-message">
							<p className="p-text">Name is required</p>
						</div>
					)}

					<div className="app__flex">
						<input
							className="p-text"
							type="email"
							placeholder="Your Email"
							name="email"
							value={email}
							onChange={handleChangeInput}
						/>
					</div>
					{!formData.isValid.hasEmail && (
						<div className="app__contact-invalid-message">
							<p className="p-text">Email is required and need to be correct form.</p>
						</div>
					)}
					<div>
						<textarea
							className="p-text"
							placeholder="Your Message"
							value={message}
							name="message"
							onChange={handleChangeInput}
						/>
					</div>
					{!formData.isValid.hasMessage && (
						<div className="app__contact-invalid-message">
							<p className="p-text">Message is required.</p>
						</div>
					)}
					<button type="button" className="p-text" onClick={handleSubmit}>
						{!loading ? 'Send Message' : 'Sending...'}
					</button>
				</div>
			) : formSubmittedResult.isSuccess ? (
				<div className="app__contact-submitted-success">
					<p className="p-text">
						Thank you for getting in touch! I'll give you response sooner.
					</p>
				</div>
			) : (
				<div className="app__contact-submitted-error">
					<p className="p-text">{formSubmittedResult.errorMessage}</p>
				</div>
			)}
		</>
	);
};

export default AppWrapper(MotionWrapper(Contact, 'app__contact'), 'contact', 'app__snowbg');

import React, { useState } from "react";
import "./Faq.css"; // Make sure to style your FAQ page in this CSS file

const Faq = () => {
	const [activeIndex, setActiveIndex] = useState(null);

	const faqs = [
		{
			question: "What is your return policy?",
			answer: "You can return any unworn items within 30 days for a full refund.",
		},
		{
			question: "How do I track my order?",
			answer: "You will receive a tracking number via email once your order has shipped.",
		},
		{
			question: "What payment methods do you accept?",
			answer: "We accept credit cards, PayPal, and Apple Pay.",
		},
		{
			question: "How can I contact customer service?",
			answer: "You can reach us via the contact form on our website or by calling our support line.",
		},
		{
			question: "Do you offer international shipping?",
			answer: "Yes, we ship to most countries. Shipping fees and delivery times vary.",
		},
	];

	const toggleAnswer = (index) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<div className='faq-container'>
			<h1>Frequently Asked Questions</h1>
			<div className='faq-list'>
				{faqs.map((faq, index) => (
					<div key={index} className='faq-item'>
						<div className='faq-question' onClick={() => toggleAnswer(index)}>
							<h3>{faq.question}</h3>
							<span>{activeIndex === index ? "-" : "+"}</span>
						</div>
						{activeIndex === index && (
							<div className='faq-answer'>
								<p>{faq.answer}</p>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Faq;

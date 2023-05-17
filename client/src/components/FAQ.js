import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { FaqContext } from '../App.js';
import styles from './ComponentStyles.module.css';

function FAQ(props) {
    const faqData = useContext(FaqContext);

    const relevantFaqs = {
        europeanGrades: faqData.europeanGrades[props.filter],
        americanGrades: faqData.americanGrades[props.filter],
    }

    // Convert FAQs to schema format
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            ...relevantFaqs.europeanGrades.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            })),
            ...relevantFaqs.americanGrades.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        ]
    };


    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            </Helmet>
            <h2>FAQ</h2>
            <div className={styles.faqContainer}>
                {(props.isGradingSystem === 'american' ? faqData.americanGrades[props.filter] : faqData.europeanGrades[props.filter]).map((faq, index) => (
                    <div className={styles.faq} key={index}>
                        <h5>{faq.question}</h5>
                        <p>{faq.answer}</p>
                        <br />
                    </div>
                ))}
            </div>
        </>
    );
}

export default FAQ;

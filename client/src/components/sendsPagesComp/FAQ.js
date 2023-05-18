import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { FAQcontext } from '../../App.js';
import styles from './FAQ.module.css';

function FAQ(props) {
    const faqData = useContext(FAQcontext);
    const filter = props.filter.discipline + props.filter.gender.charAt(0).toUpperCase() + props.filter.gender.slice(1);

    const relevantFaqs = {
        europeanGrades: faqData.europeanGrades[filter],
        americanGrades: faqData.americanGrades[filter],
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
            <div className={styles.FAQcontainer}>
                {(props.isGradingSystem === 'american' ? faqData.americanGrades[filter] : faqData.europeanGrades[filter]).map((faq, index) => (
                    <div className={styles.FAQ} key={index}>
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

import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { FAQcontext } from '../../App.js';
import styles from './FAQ.module.css';

function FAQ(props) {
    console.log('inside FAQ component')


    const faqData = useContext(FAQcontext);
    console.log('faqData:', faqData)
    // Construct the filter for the specific discipline and gender in format 'sportMan' or 'boulderWoman'
    const filter = props.filter.discipline + props.filter.gender.charAt(0).toUpperCase() + props.filter.gender.slice(1);

    // Gather the relevant FAQs for the current page context based on filter
    const relevantFaqs = {
        europeanGrades: faqData.europeanGrades[filter],
        americanGrades: faqData.americanGrades[filter],
    }

    // Convert FAQs to schema format for SEO purposes
    // This JSON-LD (JavaScript Object Notation for Linked Data) format helps search engines understand content and structure of data
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            // Mapping European and American grades FAQ to the schema
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

    // Use Helmet to inject the metadata into the head of the document
    // Renders questions and answers using the same data
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

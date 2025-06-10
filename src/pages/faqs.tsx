import React from 'react';

export const Faqs = (): React.ReactElement => {
  return (
    <div className="grid-container usa-section faqs-container">
      <div className="grid-row">
        <div className="grid-col">
          <h1 className="faqs-heading">
            Frequently <span className="highlight">Asked</span> Questions
          </h1>
        </div>
      </div>

      <div className="grid-row grid-gap faqs-grid">
        <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-3 faq-box">
          <h2 className="faq-question">
            <b>What is Leo?</b>
          </h2>
          <p className="faq-answer">
            Leo is an AI-powered tool designed to analyze resumes and discover
            top talent.
          </p>
        </div>

        <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-3 faq-box">
          <h2 className="faq-question">
            <b>Why use Leo?</b>
          </h2>
          <p className="faq-answer">
            To save time by utilizing various data sources such as SharePoint
            Repo and Greenhouse for job requisitions.
          </p>
        </div>

        <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-3 faq-box">
          <h2 className="faq-question">
            <b>How does Leo work?</b>
          </h2>
          <p className="faq-answer">
            Leo matches resumes with internal roles using systems like
            Greenhouse and SharePoint.
          </p>
        </div>

        <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-3 faq-box">
          <h2 className="faq-question">
            <b>Who can use Leo?</b>
          </h2>
          <p className="faq-answer">
            Leo is designed for talent acquisition teams to streamline resume
            analysis and role matching.
          </p>
        </div>
      </div>
    </div>
  );
};

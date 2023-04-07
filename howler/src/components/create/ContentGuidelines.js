import React, { useState } from 'react';
import './ContentGuidelines.css';

function ContentGuidelines() {
    const guidelines = [
        {
          title: "No unrelated posts",
          details: "All posts must be directly related to UW, UW students or the greater UW community.",
        },
        {
          title: "No racism/bigotry",
          details: "We expect users to exhibit civility and respectful behavior. Abusive or harassing behavior, including racist, homophobic, or otherwise discriminatory language towards others is strictly banned.",
        },
        {
          title: "No academic misconduct",
          details: "Users are expected to display academic integrity at all times. Cheating or academic misconduct of any kind is prohibited.",
        },
        {
          title: "No spamming",
          details: "Posting repetitive content or unwanted advertisements is not allowed.",
        },
        {
          title: "No personal attacks",
          details: "Posts that personally attack or insult an individual or group are not allowed.",
        },
        {
          title: "No NSFW content",
          details: "Posting sexually explicit, violent, or otherwise inappropriate content is strictly prohibited.",
        },
        {
          title: "No doxxing",
          details: "Releasing personal or private information about an individual or group without their consent is not allowed.",
        },
        {
            title: "No personal information",
            details: "Please do not share any personal information that could identify you or others. This includes names, addresses, phone numbers, and other personally identifiable information.",
        },
      ];
      

  const [activeIndexes, setActiveIndexes] = useState([]);

  const toggleDetails = (index) => {
    if (activeIndexes.includes(index)) {
      setActiveIndexes(activeIndexes.filter((i) => i !== index));
    } else {
      setActiveIndexes([...activeIndexes, index]);
    }
  };

  return (
    <div className="content-guidelines-wrapper">
      <h2 className="content-guidelines-title">Community Guidelines</h2>
      <div className="rules-container">
        {guidelines.map((rule, index) => (
          <div key={index} className="guideline" onClick={() => toggleDetails(index)}>
            <div className="guideline-summary">
              {rule.title}
            </div>
            {activeIndexes.includes(index) && (
              <div className="guideline-details">
                {rule.details}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentGuidelines;

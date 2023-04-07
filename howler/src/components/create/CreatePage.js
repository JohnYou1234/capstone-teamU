import React from 'react';
import Create from './Create';
import ContentGuidelines from './ContentGuidelines';
import './CreatePage.css';

function CreatePage() {
    return (
        <div className="create-page-container">
            <Create />
            <ContentGuidelines />
        </div>
    )
}

export default CreatePage;

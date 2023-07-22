import React from 'react';
import './NotFound.css'; // Import the CSS file for styling

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">Page Not Found</p>
        <div className="not-found-gif">
          {/* You can add a fancy 404 animation or image here */}
          {/* For example, you can use a GIF or an SVG animation */}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

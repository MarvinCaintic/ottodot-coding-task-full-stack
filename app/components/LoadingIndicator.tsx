import React from "react";

export default function LoadingIndicator() {
  return (
    <div className="loading-indicator">
      <span className="loading-spinner" />
      <span className="loading-text">Loading...</span>
    </div>
  );
}

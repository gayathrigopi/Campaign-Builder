import React, { useState } from "react";

const CompaignDetails = ({ formData, updateFormData, nextStep }) => {
  const [error, setError] = useState("");
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };
  const validate = () => {
    if (!formData.campaignName.trim()) {
      setError("Campaign Name is required");
    } else {
      setError("");
      nextStep();
    }
  };
  return (
    <div className="form-step">
      <label>Campaign Name*</label>
      <input
        type="text"
        className="input"
        name="campaignName"
        value={formData.campaignName}
        onChange={handleChange}
      />
      {error && <span className="error">{error}</span>}
      <div className="descriptionDiv">
        <label>Campaign Description</label>
        <textarea
          name="campaignDescription"
          className="input"
          value={formData.campaignDescription}
          onChange={handleChange}
        />
      </div>
      <div className="navigation-buttons">
        <button className="btn btn-primary" onClick={validate}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CompaignDetails;

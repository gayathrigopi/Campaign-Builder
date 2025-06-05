import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AudienceSegment = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [error, setError] = useState("");

  const handleAudienceChange = (e) => {
    updateFormData({
      audience: e.target.value,
      customSegment: {
        platform: [],
        country: '',
        signupDateRange: [null, null],
      },
    });
    setError("");
  };

  const handleCustomChange = (field, value) => {
    updateFormData({
      customSegment: {
        ...formData.customSegment,
        [field]: value,
      },
    });
    setError(""); // Clear error on any custom segment update
  };

  const handleNext = () => {
    if (formData.audience === "Custom Segment") {
      const [start, end] = formData.customSegment.signupDateRange || [];
      if (!start || !end) {
        setError("Signup date range is required.");
        return;
      }
    }
    setError("");
    nextStep();
  };

  return (
    <div className="form-step">
      <label>Audience Segment</label>
      <select
        className="select-box"
        value={formData.audience}
        onChange={handleAudienceChange}
      >
        <option>All Users</option>
        <option>New Users</option>
        <option>Inactive Users</option>
        <option>Custom Segment</option>
      </select>

      {formData.audience === "Custom Segment" && (
        <div className="custom-segment">
          <label>Platform</label>
          <div className="platform-options">
            {["Web", "Android", "iOS"].map((option) => (
              <label
                key={option}
                className={`platform-btn ${
                  formData.customSegment.platform.includes(option)
                    ? "selected"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  value={option}
                  checked={formData.customSegment.platform.includes(option)}
                  onChange={() => {
                    const newPlatforms =
                      formData.customSegment.platform.includes(option)
                        ? formData.customSegment.platform.filter((p) => p !== option)
                        : [...formData.customSegment.platform, option];
                    handleCustomChange("platform", newPlatforms);
                  }}
                />
                {option}
              </label>
            ))}
          </div>

          <label>Signup Date Range</label>
          <DatePicker
            selectsRange
            startDate={formData.customSegment.signupDateRange?.[0]}
            endDate={formData.customSegment.signupDateRange?.[1]}
            onChange={(update) => handleCustomChange("signupDateRange", update)}
            placeholderText="Select signup date range"
            className="datepicker-input"
            wrapperClassName="datepicker-wrapper"
            maxDate={new Date()}
            isClearable
          />
        </div>
      )}

      {error && <span className="error" style={{ color: 'red' }}>{error}</span>}

      <div className="navigation-buttons">
        <button className="btn btn-outline" onClick={prevStep}>
          Back
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AudienceSegment;

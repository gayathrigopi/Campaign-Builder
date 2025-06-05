import React, { useState } from "react";
import StudioEditorMail from "./StudioEditorMail";

const ChannelMessage = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [previewMode, setPreviewMode] = useState(false);
  const [error, setError] = useState("");

  const handleChannelChange = (channel) => {
    updateFormData({ channel, message: "", email: null });
    setPreviewMode(false);
    setError(""); // Reset error when channel changes
  };

  const handleMessageChange = (value) => {
    updateFormData({ message: value });
  };

  const renderPreview = (message) => {
    return message.replace(/{{first_name}}/g, "John");
  };

  const validateAndProceed = () => {
    if (formData.channel === "Email") {
      if (!formData.email || formData.email.trim() === "") {
        setError("Email content is required.");
        return;
      }
    } else {
      if (!formData.message || formData.message.trim() === "") {
        setError(`${formData.channel} message is required.`);
        return;
      }

      if (
        formData.channel === "SMS" &&
        formData.message.length > 160
      ) {
        setError("SMS content must not exceed 160 characters.");
        return;
      }

      if (
        formData.channel === "WhatsApp" &&
        formData.message.length > 1000
      ) {
        setError("WhatsApp message should be under 1000 characters.");
        return;
      }
    }

    setError("");
    nextStep();
  };

  return (
    <div className="form-step">
      <div className="tab-container">
        {["Email", "WhatsApp", "SMS"].map((channel) => (
          <button
            key={channel}
            className={`tab ${formData.channel === channel ? "active" : ""}`}
            onClick={() => handleChannelChange(channel)}
          >
            {channel}
          </button>
        ))}
      </div>

      {formData.channel === "Email" ? (
        <StudioEditorMail
          content={formData.email}
          onChange={(updatedHtml) => updateFormData({ email: updatedHtml })}
        />
      ) : (
        <>
          {!previewMode ? (
            <textarea
              placeholder={`Enter here`}
              className="input"
              value={formData.message}
              onChange={(e) => handleMessageChange(e.target.value)}
            />
          ) : (
            <div className="preview-box">
              <p
                dangerouslySetInnerHTML={{
                  __html: renderPreview(formData.message).replace(/\n/g, "<br/>"),
                }}
              />
            </div>
          )}
          <div style={{ marginTop: "8px" }}>
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="preview-btn"
            >
              {previewMode ? "Edit" : "Preview"}
            </button>
            <span style={{ marginLeft: "16px", color: "#555" }}>
              Character count: {formData.message.length}
            </span>
          </div>
        </>
      )}

      {error && <div className="error">{error}</div>}

      <div className="navigation-buttons">
        <button className="btn btn-outline" onClick={prevStep}>
          Back
        </button>
        <button className="btn btn-primary" onClick={validateAndProceed}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ChannelMessage;

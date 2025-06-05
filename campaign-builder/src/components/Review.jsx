import React from "react";

const Review = ({ formData, prevStep, goToStep }) => {
//   console.log( formData.email)
//   const extractBodyInnerHTML = (html) => {
//     if(html){
//   const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
//   return match ? match[1] : html;
//     }
// };

  return (
    <div className="form-step review-step">
      <h2>Review Your Campaign</h2>

        <section className="review-section">
        <h3>Step 1: Campaign Details</h3>
        <p><strong>Campaign Name:</strong> {formData?.campaignName || '-'}</p>
        <p><strong>Campaign Type:</strong> {formData?.campaignDescription || '-'}</p>
         <button className="edit-btn" onClick={() => goToStep(1)}>
          Edit
        </button>
      </section>

         {/* Section: Audience Segment */}
      <section className="review-section">
        <h3>Audience Segment</h3>
        <p>
          <strong>Audience:</strong> {formData.audience || "-"}
        </p>
        {formData.audience === "Custom Segment" && (
          <div className="custom-segment-details">
            <p>
              <strong>Platforms:</strong>{" "}
              {formData.customSegment?.platform?.join(", ") || "-"}
            </p>
            <p>
              <strong>Signup Date Range:</strong>{" "}
              {formData.customSegment?.signupDateRange?.[0]
                ? new Date(
                    formData.customSegment.signupDateRange[0]
                  ).toLocaleDateString()
                : "-"}{" "}
              to{" "}
              {formData.customSegment?.signupDateRange?.[1]
                ? new Date(
                    formData.customSegment.signupDateRange[1]
                  ).toLocaleDateString()
                : "-"}
            </p>
          </div>
        )}
        <button className="edit-btn" onClick={() => goToStep(2)}>
          Edit
        </button>
      </section>

      {/* Section: Channel & Message */}
      <section className="review-section">
        <h3>Channel & Message</h3>
        <p>
          <strong>Channel:</strong> {formData.channel || "-"}
        </p>
        <div>
          <strong>Message:</strong>
          <div
            className="review-message"
          >
            {(formData.channel==="Email" ? formData.email : formData.message) || "<i>No message provided</i>"}
            </div>

        </div>
        <button className="edit-btn" onClick={() => goToStep(3)}>
          Edit
        </button>
      </section>

      {/* Section: Schedule */}
      <section className="review-section">
        <h3>Schedule</h3>
        <p>
          <strong>Option:</strong> {formData.scheduleOption || "-"}
        </p>
        {formData.scheduleOption === "later" && (
          <p>
            <strong>Scheduled Time:</strong>{" "}
            {formData.scheduledTime
              ? new Date(formData.scheduledTime).toLocaleString()
              : "-"}
          </p>
        )}
        <button className="edit-btn" onClick={() => goToStep(4)}>
          Edit
        </button>
      </section>

      {/* Add other sections here similarly */}

      <div className="navigation-buttons">
        <button className="btn btn-outline" onClick={prevStep}>
          Back
        </button>
        <button
          className="btn btn-primary"
          onClick={() => alert("Campaign Submitted Successfully!")}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Review;

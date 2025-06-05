import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Schedule = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [error, setError] = useState("");
  const now = new Date();

  const handleScheduleChange = (e) => {
    updateFormData({ scheduleOption: e.target.value, scheduledTime: null });
    setError("");
  };

  const handleDateChange = (date) => {
    updateFormData({ scheduledTime: date });
    setError("");
  };

  const validate = () => {
    if (formData.scheduleOption === "later") {
      if (!formData.scheduledTime) {
        setError("Please select a date and time");
        return;
      }
      if (new Date(formData.scheduledTime) < now) {
        setError("Scheduled time cannot be in the past");
        return;
      }
    }
    setError("");
    nextStep();
  };

  return (
    <div className="form-step">
      <label htmlFor="schedule">Schedule</label>
      <select
        id="schedule"
        className="select-box"
        value={formData.scheduleOption}
        onChange={handleScheduleChange}
      >
        <option value="now">Send Now</option>
        <option value="later">Schedule Later</option>
      </select>

      {formData.scheduleOption === "later" && (
        <div className="datepicker-container">
          <label htmlFor="datetime">Pick date and time<span className="required">*</span></label>
          <DatePicker
            selected={formData.scheduledTime}
            onChange={handleDateChange}
            showTimeSelect
            timeIntervals={15}
            dateFormat="Pp"
            minDate={now}
            minTime={
              formData.scheduledTime?.toDateString() === now.toDateString()
                ? now
                : new Date().setHours(0, 0)
            }
            maxTime={new Date().setHours(23, 45)}
            placeholderText="Select date and time"
            className="custom-datepicker"
            wrapperClassName="datepicker-wrapper"

          />
          {error && <div className="error">{error}</div>}
        </div>
      )}

      <div className="navigation-buttons">
        <button className="btn btn-outline" onClick={prevStep}>
          Back
        </button>
        <button className="btn btn-primary" onClick={validate}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Schedule;
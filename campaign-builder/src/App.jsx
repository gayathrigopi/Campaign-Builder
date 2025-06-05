import React, { useState } from 'react';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';


import CompaignDetails from './components/CompaignDetails';
import AudienceSegment from './components/AudienceSegment';
import ChannelMessage from './components/ChannelMessage';
import Schedule from './components/Schedule';
import Review from './components/Review';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    campaignName: '',
    campaignDescription: '',
    audience: 'All Users',
    customSegment: {
      platform: [],
      country: '',
      signupDateRange: [null, null],
    },
    channel: 'Email',
    email: null,
    message: '',
    scheduleOption: 'now',
    scheduledTime: null,
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const goToStep = (num) => setStep(num);

  const updateFormData = (newData) => {
    console.log(newData)
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CompaignDetails formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
      case 2:
        return <AudienceSegment formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <ChannelMessage formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Schedule formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <Review formData={formData} prevStep={prevStep} goToStep={goToStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Campaign Builder</h1>
      <div className="step-container">
        {renderStep()}
      </div>
    </div>
  );
};

export default App;


import React, { useState } from 'react';
import { Upload, MapPin, Camera, CheckCircle } from 'lucide-react';

const ReportIssue = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    urgency: 'medium',
    photo: null
  });
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState('');

  const categories = [
    { id: 'pothole', name: 'Pothole', icon: '🕳️' },
    { id: 'streetlight', name: 'Street Light', icon: '💡' },
    { id: 'garbage', name: 'Garbage/Waste', icon: '🗑️' },
    { id: 'water', name: 'Water Supply', icon: '💧' },
    { id: 'drainage', name: 'Drainage', icon: '🌊' },
    { id: 'road', name: 'Road Damage', icon: '🛣️' },
    { id: 'park', name: 'Park/Garden', icon: '🌳' },
    { id: 'other', name: 'Other', icon: '📝' }
  ];

  const steps = [
    { id: 1, name: 'Issue Details', description: 'Describe the problem' },
    { id: 2, name: 'Location & Media', description: 'Add location and photos' },
    { id: 3, name: 'Review & Submit', description: 'Confirm and submit' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        photo: e.target.files[0]
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key as keyof typeof formData]) {
          submitData.append(key, formData[key as keyof typeof formData] as any);
        }
      });

      const response = await fetch('/api/issues', {
        method: 'POST',
        body: submitData
      });

      const result = await response.json();
      
      if (response.ok) {
        setReportId(result.reportId);
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Report Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">Your report has been received and assigned the following ID:</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <span className="text-2xl font-mono font-bold text-green-600">{reportId}</span>
          </div>
          <p className="text-sm text-gray-500 mb-6">Please save this ID to track your report status.</p>
          <button
            onClick={() => window.location.href = '/track'}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
          >
            Track This Issue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Report a Civic Issue</h1>
            <p className="text-xl text-gray-600">Help us make your community better by reporting problems that need attention.</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step.id ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.id}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`font-semibold ${currentStep >= step.id ? 'text-green-600' : 'text-gray-600'}`}>
                      {step.name}
                    </p>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-1 w-16 lg:w-32 mx-4 ${
                      currentStep > step.id ? 'bg-green-600' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
            {/* Step 1: Issue Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                    placeholder="e.g., Large pothole on Main Street"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((category) => (
                      <label key={category.id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          onChange={handleInputChange}
                          className="sr-only"
                          required
                        />
                        <div className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
                          formData.category === category.id
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="text-2xl mb-2">{category.icon}</div>
                          <div className="text-sm font-medium">{category.name}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                    placeholder="Please provide detailed information about the issue..."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  >
                    <option value="low">Low - Can wait a few weeks</option>
                    <option value="medium">Medium - Should be addressed soon</option>
                    <option value="high">High - Needs immediate attention</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Location & Media */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                      placeholder="e.g., Near City Hospital, MG Road, Ranchi"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Provide specific landmarks or addresses</p>
                </div>

                <div>
                  <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Photo (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors duration-200">
                    <input
                      type="file"
                      id="photo"
                      name="photo"
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="sr-only"
                    />
                    <label htmlFor="photo" className="cursor-pointer">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 font-medium mb-2">Click to upload a photo</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                      {formData.photo && (
                        <p className="text-sm text-green-600 mt-2">✓ Photo uploaded successfully</p>
                      )}
                    </label>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">📱 Pro Tip</h3>
                  <p className="text-blue-700 text-sm">
                    Take clear photos that show the problem from multiple angles. This helps authorities understand and resolve the issue faster.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Review Your Report</h3>
                
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <span className="font-medium text-gray-700">Title:</span>
                    <p className="text-gray-900 mt-1">{formData.title}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Category:</span>
                    <p className="text-gray-900 mt-1">{categories.find(cat => cat.id === formData.category)?.name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Description:</span>
                    <p className="text-gray-900 mt-1">{formData.description}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Location:</span>
                    <p className="text-gray-900 mt-1">{formData.location}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Urgency:</span>
                    <p className="text-gray-900 mt-1 capitalize">{formData.urgency}</p>
                  </div>
                  {formData.photo && (
                    <div>
                      <span className="font-medium text-gray-700">Photo:</span>
                      <p className="text-green-600 mt-1">✓ Photo attached</p>
                    </div>
                  )}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Notice</h4>
                  <p className="text-yellow-700 text-sm">
                    By submitting this report, you confirm that the information provided is accurate and agree to our terms of service. 
                    False reports may result in account restrictions.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                disabled={currentStep === 1}
              >
                Previous
              </button>
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Submit Report
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;
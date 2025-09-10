import React, { useState } from 'react';
import { Search, Clock, CheckCircle, AlertCircle, Users, MapPin } from 'lucide-react';

const TrackIssue = () => {
  const [reportId, setReportId] = useState('');
  const [issueData, setIssueData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setIssueData(null);

    try {
      const response = await fetch(`/api/issues/${reportId}`);
      const data = await response.json();

      if (response.ok) {
        setIssueData(data);
      } else {
        setError(data.message || 'Issue not found');
      }
    } catch (err) {
      setError('Failed to fetch issue details');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'reviewed':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'assigned':
        return <Users className="h-5 w-5 text-orange-500" />;
      case 'in-progress':
        return <AlertCircle className="h-5 w-5 text-blue-600" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'reviewed':
        return 'bg-yellow-100 text-yellow-800';
      case 'assigned':
        return 'bg-orange-100 text-orange-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const statusSteps = [
    { id: 'submitted', name: 'Submitted', description: 'Report received and logged' },
    { id: 'reviewed', name: 'In Review', description: 'Being evaluated by authorities' },
    { id: 'assigned', name: 'Assigned', description: 'Assigned to responsible department' },
    { id: 'in-progress', name: 'In Progress', description: 'Work has begun on the issue' },
    { id: 'resolved', name: 'Resolved', description: 'Issue has been fixed' }
  ];

  const getCurrentStepIndex = (currentStatus: string) => {
    return statusSteps.findIndex(step => step.id === currentStatus);
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Track Your Issue</h1>
            <p className="text-xl text-gray-600">Enter your report ID to check the current status and progress.</p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <form onSubmit={handleSearch}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="reportId" className="block text-sm font-medium text-gray-700 mb-2">
                    Report ID
                  </label>
                  <input
                    type="text"
                    id="reportId"
                    value={reportId}
                    onChange={(e) => setReportId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                    placeholder="e.g., CR-2024-001234"
                    required
                  />
                </div>
                <div className="sm:pt-7">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 transition-colors duration-200 flex items-center justify-center"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <>
                        <Search className="h-5 w-5 mr-2" />
                        Track Issue
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Issue Details */}
          {issueData && (
            <div className="space-y-8">
              {/* Issue Info */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{issueData.title}</h2>
                    <p className="text-gray-600">Report ID: {issueData.reportId}</p>
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(issueData.status)}`}>
                    {getStatusIcon(issueData.status)}
                    <span className="ml-2 capitalize">{issueData.status.replace('-', ' ')}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Category</h3>
                    <p className="text-gray-900 capitalize">{issueData.category}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Submitted On</h3>
                    <p className="text-gray-900">{new Date(issueData.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Urgency</h3>
                    <p className="text-gray-900 capitalize">{issueData.urgency}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Location</h3>
                    <p className="text-gray-900 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {issueData.location}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{issueData.description}</p>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Progress Timeline</h3>
                <div className="space-y-6">
                  {statusSteps.map((step, index) => {
                    const currentIndex = getCurrentStepIndex(issueData.status);
                    const isCompleted = index <= currentIndex;
                    const isCurrent = index === currentIndex;

                    return (
                      <div key={step.id} className="flex items-center">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          isCompleted 
                            ? isCurrent 
                              ? 'bg-green-500 text-white' 
                              : 'bg-green-100 text-green-600'
                            : 'bg-gray-200 text-gray-400'
                        }`}>
                          {isCompleted && !isCurrent ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            getStatusIcon(step.id)
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <p className={`font-semibold ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                            {step.name}
                          </p>
                          <p className={`text-sm ${isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>
                            {step.description}
                          </p>
                        </div>
                        {isCurrent && (
                          <div className="ml-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Current
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Updates */}
              {issueData.updates && issueData.updates.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Updates</h3>
                  <div className="space-y-4">
                    {issueData.updates.map((update: any, index: number) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4">
                        <p className="font-medium text-gray-800">{update.message}</p>
                        <p className="text-sm text-gray-500">{new Date(update.timestamp).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sample Issue for Demo */}
          {!issueData && !loading && !error && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-800 mb-2">🔍 Try a Sample</h3>
              <p className="text-blue-700 text-sm mb-3">
                Want to see how tracking works? Try searching with this sample report ID:
              </p>
              <button
                onClick={() => setReportId('CR-2024-001234')}
                className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Use Sample ID: CR-2024-001234
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackIssue;
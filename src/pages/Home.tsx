import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Search, Users, CheckCircle, AlertCircle } from 'lucide-react';

interface Issue {
  _id: string;
  reportId: string;
  title: string;
  name: string;
  email: string;
  category: string;
  status: string;
  urgency: string;
  createdAt: string;
  updatedAt: string;
  location: string;
  state: string;
  pincode: string;
}

const Home = () => {
  const [recentIssues, setRecentIssues] = useState<Issue[]>([]);
  const [allIssues, setAllIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all issues and calculate stats
  const fetchRecentIssues = async () => {
    try {
      const response = await fetch('/api/issues');
      const data = await response.json();
      setAllIssues(data);
      // Get the 3 most recent issues
      const recent = data.slice(0, 3);
      setRecentIssues(recent);
    } catch (error) {
      console.error('Error fetching recent issues:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentIssues();
  }, []);

  // Helper function to get status color and icon
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'resolved':
        return {
          color: 'green',
          icon: CheckCircle,
          text: 'Resolved'
        };
      case 'in-progress':
        return {
          color: 'blue',
          icon: AlertCircle,
          text: 'In Progress'
        };
      case 'submitted':
        return {
          color: 'orange',
          icon: FileText,
          text: 'New Report'
        };
      default:
        return {
          color: 'gray',
          icon: FileText,
          text: 'Submitted'
        };
    }
  };

  // Helper function to format time ago
  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const issueDate = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - issueDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const features = [
    {
      icon: FileText,
      title: 'Report Issues',
      description: 'Easily report civic problems in your community with photos and location details.'
    },
    {
      icon: Search,
      title: 'Track Progress',
      description: 'Monitor the status of your reported issues from submission to resolution.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join thousands of citizens working together to improve our communities.'
    }
  ];

  // Calculate dynamic stats from database
  const heroStats = [
    { 
      number: allIssues.length.toLocaleString(), 
      label: 'Issues Reported' 
    },
    { 
      number: allIssues.filter(issue => issue.status === 'resolved').length.toLocaleString(), 
      label: 'Issues Resolved' 
    },
    { 
      number: new Set(allIssues.map(issue => issue.category)).size.toString(), 
      label: 'Categories' 
    },
    { 
      number: allIssues.length > 0 
        ? Math.round((allIssues.filter(issue => issue.status === 'resolved').length / allIssues.length) * 100) + '%'
        : '0%', 
      label: 'Resolution Rate' 
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section (matches screenshot) */}
      <section
        className="relative overflow-hidden text-gray-900"
        style={{ backgroundImage: "url('/cityscape-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-emerald-800/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="font-extrabold tracking-tight text-4xl md:text-6xl lg:text-7xl leading-tight text-white">
              <span className="block">Report Civic Issues.</span>
              <span className="block text-black">Build Cleaner Communities.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white max-w-3xl mx-auto">
              Empower your community by reporting civic issues instantly. Track progress in real-time and witness positive change in your neighborhood.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/report"
                className="inline-flex items-center px-6 py-3 rounded-full bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors"
              >
                Report an Issue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/track"
                className="inline-flex items-center px-6 py-3 rounded-full bg-white text-gray-800 font-semibold hover:bg-gray-100 border"
              >
                Track an Issue
                <Search className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* Stats inside hero */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
              {heroStats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-extrabold text-black">{s.number}</div>
                  <div className="text-black text-sm md:text-base">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats are rendered within the hero above to match the screenshot */}

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, effective tools to make your voice heard and create positive change in your community.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-gradient-to-br from-green-500 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Recent Activity
            </h2>
            <p className="text-xl text-gray-600">
              See how our community is making a difference every day.
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {recentIssues.map((issue) => {
                const statusInfo = getStatusInfo(issue.status);
                const StatusIcon = statusInfo.icon;
                const timeAgo = getTimeAgo(issue.createdAt);
                
                return (
                  <div key={issue._id} className={`bg-${statusInfo.color}-50 p-6 rounded-xl border border-${statusInfo.color}-200`}>
                    <div className="flex items-center mb-4">
                      <StatusIcon className={`h-6 w-6 text-${statusInfo.color}-600 mr-2`} />
                      <span className={`text-${statusInfo.color}-700 font-semibold`}>{statusInfo.text}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{issue.title}</h3>
                    <p className="text-gray-600 text-sm">
                      Reported {timeAgo} • {issue.location}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      ID: {issue.reportId} • {issue.category}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Join thousands of citizens working together to create cleaner, safer communities across Jharkhand.
          </p>
          <Link
            to="/report"
            className="inline-flex items-center px-8 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Reporting Issues
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
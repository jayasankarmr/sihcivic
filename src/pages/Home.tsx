import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Search, Users, Award, CheckCircle, AlertCircle } from 'lucide-react';

const Home = () => {
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
    },
    {
      icon: Award,
      title: 'Government Backed',
      description: 'Officially supported by the Government of Jharkhand for reliable service.'
    }
  ];

  const stats = [
    { number: '5,234', label: 'Issues Reported' },
    { number: '3,891', label: 'Issues Resolved' },
    { number: '1,200', label: 'Active Citizens' },
    { number: '98%', label: 'Resolution Rate' }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Report Civic Issues.<br />
              <span className="text-green-300">Build Cleaner, Greener Communities.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
              Empower your community through technology. Report issues, track progress, and collaborate with local government for a cleaner, safer neighborhood.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/report"
                className="inline-flex items-center px-8 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Report an Issue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/track"
                className="inline-flex items-center px-8 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-green-400"
              >
                Track an Issue
                <Search className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                <span className="text-green-700 font-semibold">Resolved</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Pothole on MG Road Fixed</h3>
              <p className="text-gray-600 text-sm">Reported 3 days ago • Resolved today</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-6 w-6 text-blue-600 mr-2" />
                <span className="text-blue-700 font-semibold">In Progress</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Streetlight Repair on Park Avenue</h3>
              <p className="text-gray-600 text-sm">Reported 1 day ago • Under review</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-orange-600 mr-2" />
                <span className="text-orange-700 font-semibold">New Report</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Overflowing Garbage Bin</h3>
              <p className="text-gray-600 text-sm">Reported 2 hours ago • Awaiting assignment</p>
            </div>
          </div>
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
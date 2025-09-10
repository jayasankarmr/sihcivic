import React from 'react';
import { Target, Users, Award, Lightbulb, CheckCircle, Heart } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To bridge the gap between citizens and government through technology, creating cleaner, greener, and more liveable communities across Jharkhand.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Every citizen has a voice. Our platform empowers individuals to actively participate in improving their neighborhoods and local infrastructure.'
    },
    {
      icon: Award,
      title: 'Government Backed',
      description: 'Officially supported by the Government of Jharkhand, ensuring reliable service delivery and accountability in addressing civic issues.'
    },
    {
      icon: Lightbulb,
      title: 'Smart Technology',
      description: 'Leveraging modern web technologies and data analytics to streamline issue reporting, tracking, and resolution processes.'
    }
  ];

  const stats = [
    { number: '50+', label: 'Cities Covered' },
    { number: '5,234', label: 'Issues Reported' },
    { number: '3,891', label: 'Issues Resolved' },
    { number: '98%', label: 'Satisfaction Rate' }
  ];

  const team = [
    {
      name: 'Smart India Hackathon Team',
      role: 'Development Team',
      description: 'Innovative students and professionals working together to solve real-world problems through technology.'
    },
    {
      name: 'Government of Jharkhand',
      role: 'Official Partner',
      description: 'Providing policy support, resources, and ensuring seamless integration with local governance systems.'
    },
    {
      name: 'Local Communities',
      role: 'Active Participants',
      description: 'Citizens across Jharkhand who actively report issues and collaborate to build better communities.'
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-green-300">Nagar Setu</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 leading-relaxed">
              A revolutionary platform born from the Smart India Hackathon initiative, connecting citizens with their government to build cleaner, greener communities.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-green-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Making a real difference in communities across Jharkhand</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-2xl shadow-lg">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
            </div>
            
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl border border-green-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Lightbulb className="h-6 w-6 text-yellow-500 mr-2" />
                  The Beginning
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Born from the Smart India Hackathon 2024, Nagar Setu emerged as a solution to bridge the communication gap between citizens and local government. Our team recognized that many civic issues go unnoticed or unreported simply because there was no easy, accessible way for citizens to communicate with authorities.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  What started as a hackathon project has evolved into a comprehensive platform that empowers communities to actively participate in local governance and infrastructure development.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-2xl border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Heart className="h-6 w-6 text-red-500 mr-2" />
                  Community First
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We believe that every citizen deserves to live in a clean, safe, and well-maintained environment. Our platform puts the power back into the hands of the people, allowing them to directly report issues, track progress, and see real results in their communities.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  By fostering collaboration between citizens and government, we're not just fixing potholes or streetlights – we're building stronger, more connected communities.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-yellow-50 p-8 rounded-2xl border border-green-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                  The Future
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  With the support of the Government of Jharkhand and active participation from communities across the state, Nagar Setu continues to evolve. We're constantly adding new features, expanding to more cities, and finding innovative ways to make civic engagement more accessible and effective.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our vision extends beyond just reporting issues – we aim to create a comprehensive ecosystem where citizens, government, and technology work together to build the cities of tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Partners</h2>
            <p className="text-xl text-gray-600">Working together to create positive change</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="bg-gradient-to-br from-green-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-green-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Transparency</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every report is tracked with complete transparency, allowing citizens to see exactly what's happening with their concerns.
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Accountability</h3>
                <p className="text-gray-600 leading-relaxed">
                  We ensure that every issue is properly assigned and tracked, creating accountability at all levels of governance.
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Accessibility</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our platform is designed to be accessible to all citizens, regardless of technical expertise or device capabilities.
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Innovation</h3>
                <p className="text-gray-600 leading-relaxed">
                  We continuously innovate to find better ways to serve our communities and improve the civic engagement experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
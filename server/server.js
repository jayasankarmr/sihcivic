const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB (using local MongoDB for demo)
mongoose.connect('mongodb://localhost:27017/civic-report', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Issue Schema
const issueSchema = new mongoose.Schema({
  reportId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['pothole', 'streetlight', 'garbage', 'water', 'drainage', 'road', 'park', 'other']
  },
  location: {
    type: String,
    required: true
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['submitted', 'reviewed', 'assigned', 'in-progress', 'resolved'],
    default: 'submitted'
  },
  photo: {
    type: String,
    default: null
  },
  updates: [{
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Issue = mongoose.model('Issue', issueSchema);

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['general', 'technical', 'feedback', 'partnership', 'media'],
    default: 'general'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('Contact', contactSchema);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Generate unique report ID
function generateReportId() {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `CR-${year}-${randomNum}`;
}

// Routes

// Submit new issue
app.post('/api/issues', upload.single('photo'), async (req, res) => {
  try {
    const { title, description, category, location, urgency } = req.body;
    
    const reportId = generateReportId();
    
    const newIssue = new Issue({
      reportId,
      title,
      description,
      category,
      location,
      urgency,
      photo: req.file ? req.file.filename : null,
      updates: [{
        message: 'Issue report submitted successfully',
        timestamp: new Date()
      }]
    });

    await newIssue.save();
    
    res.status(201).json({
      success: true,
      message: 'Issue reported successfully',
      reportId: reportId
    });
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit issue',
      error: error.message
    });
  }
});

// Get issue by report ID
app.get('/api/issues/:reportId', async (req, res) => {
  try {
    const { reportId } = req.params;
    
    const issue = await Issue.findOne({ reportId });
    
    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }
    
    res.json(issue);
  } catch (error) {
    console.error('Error fetching issue:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch issue',
      error: error.message
    });
  }
});

// Get all issues (for admin/dashboard)
app.get('/api/issues', async (req, res) => {
  try {
    const issues = await Issue.find({}).sort({ createdAt: -1 }).limit(50);
    res.json(issues);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch issues',
      error: error.message
    });
  }
});

// Update issue status (for admin)
app.patch('/api/issues/:reportId/status', async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status, updateMessage } = req.body;
    
    const issue = await Issue.findOne({ reportId });
    
    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }
    
    issue.status = status;
    issue.updatedAt = new Date();
    
    if (updateMessage) {
      issue.updates.push({
        message: updateMessage,
        timestamp: new Date()
      });
    }
    
    await issue.save();
    
    res.json({
      success: true,
      message: 'Issue status updated successfully',
      issue
    });
  } catch (error) {
    console.error('Error updating issue:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update issue',
      error: error.message
    });
  }
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message, type } = req.body;
    
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
      type
    });

    await newContact.save();
    
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form',
      error: error.message
    });
  }
});

// Create sample data for demonstration
app.post('/api/seed', async (req, res) => {
  try {
    // Create a sample issue for demo purposes
    const sampleIssue = new Issue({
      reportId: 'CR-2024-001234',
      title: 'Large pothole on MG Road',
      description: 'There is a large pothole near the City Hospital on MG Road that is causing traffic issues and poses a safety risk to vehicles and pedestrians.',
      category: 'pothole',
      location: 'MG Road, Near City Hospital, Ranchi',
      urgency: 'high',
      status: 'in-progress',
      updates: [
        {
          message: 'Issue report submitted successfully',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
        },
        {
          message: 'Report reviewed and verified by authorities',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        },
        {
          message: 'Issue assigned to Public Works Department',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
        },
        {
          message: 'Work crew dispatched to location. Repair work in progress.',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
        }
      ]
    });

    await sampleIssue.save();
    
    res.json({
      success: true,
      message: 'Sample data created successfully'
    });
  } catch (error) {
    console.error('Error creating sample data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create sample data',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
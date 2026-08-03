const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock home endpoint
app.get('/api/homes', (req, res) => {
  const mockData = {
    data: [{
      id: 1,
      heroBadge: "Welcome",
      heroTitleLine1: "ALRawafed",
      heroTitleLine2: "United",
      heroSubtitle: "Your trusted partner in construction and development",
      heroScenes: [],
      servicesKicker: "Our Services",
      servicesTitle: "What We Do", 
      servicesSubtitle: "Comprehensive construction solutions",
      servicesItems: [],
      aboutPanelTitle: "About Us",
      aboutPanelDesc: "Leading construction company with years of experience",
      aboutPoints: [
        "Quality Assurance",
        "Expert Team", 
        "Timely Delivery"
      ],
      aboutImage: null,
      techKicker: "Technology",
      techTitle: "Modern Approach",
      techSubtitle: "Using latest construction technology"
    }]
  };
  
  res.json(mockData);
});

// Mock projects endpoint
app.get('/api/projects', (req, res) => {
  res.json({
    data: [
      {
        id: 1,
        title: "Sample Project 1",
        description: "A great construction project",
        slug: "sample-project-1",
        Category: "web",
        Size: "large"
      }
    ]
  });
});

// Mock faqs endpoint
app.get('/api/faqs', (req, res) => {
  res.json({
    data: [
      {
        id: 1,
        Question: "What services do you offer?",
        Answer: "We offer comprehensive construction services.",
        Order: 1
      }
    ]
  });
});

const PORT = 1337;
app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});

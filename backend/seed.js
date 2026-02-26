require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Project.deleteMany({});
  await Project.insertMany([
    {
      title: 'INVENZO - Asset Tracker',
      shortDescription: 'Asset tracking platform for inventory, checkouts, and role-based workflows.',
      longDescription: 'Developed a full-stack asset tracking application with secure JWT authentication, role-based access for Admin/Manager/Viewer, and dashboard workflows for managing inventory and checkout records.',
      techStack: ['React','Node.js','Express.js','MySQL','JWT','RBAC','Bootstrap'],
      githubUrl: 'https://github.com/SuryaPanduri/invenzo',
      liveUrl: 'https://invenzo.onrender.com/',
      featured: true
    },
    {
      title: 'MFA-MERN',
      shortDescription: 'Multi-factor authentication with OTP verification and secure sessions.',
      longDescription: 'Built a secure MERN authentication flow with email OTP verification, session handling, OTP resend and expiration mechanisms, and cloud deployment using Render + Vercel + MongoDB Atlas.',
      techStack: ['MongoDB','Express.js','React','Node.js','JWT','SMTP'],
      githubUrl: 'https://github.com/SuryaPanduri/mfa-mern',
      liveUrl: 'https://mfa-mern.vercel.app/login',
      featured: true
    },
    {
      title: 'plagiSense',
      shortDescription: 'Text and image plagiarism detection using LCS and FMM algorithms.',
      longDescription: 'Led a 5-member team to build a plagiarism detection system for text and images, featuring similarity scoring, highlighted matched content, multi-format support, and role-based secure access.',
      techStack: ['React','Node.js','Express.js','MongoDB','Material UI','JWT'],
      githubUrl: 'https://github.com/SuryaPanduri/plagiSense',
      liveUrl: 'https://plagisense.vercel.app/',
      featured: true
    }
  ]);
  console.log('Seeded');
  process.exit(0);
}).catch(err=>console.error(err));

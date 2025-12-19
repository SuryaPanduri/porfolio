require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Project.deleteMany({});
  await Project.insertMany([
    {
      title: 'INVENZO - Asset Tracker',
      shortDesc: 'Full-stack asset tracking with role-based auth and asset CRUD.',
      fullDesc: 'INVENZO handles inventory, checkouts, and RBAC for Admins/Managers/Viewers.',
      tech: ['React','Node','Express','MySQL'],
      repoUrl: 'https://github.com/yourusername/invenzo'
    },
    {
      title: 'MFA-MERN',
      shortDesc: 'Multi-factor authentication with OTP and secure sessions.',
      tech: ['MongoDB','Express','React','Node'],
      repoUrl: 'https://github.com/yourusername/mfa-mern'
    },
    {
      title: 'plagiSense',
      shortDesc: 'Text & image plagiarism detection using LCS and FMM.',
      tech: ['React','Node','MongoDB'],
      repoUrl: 'https://github.com/yourusername/plagisense'
    }
  ]);
  console.log('Seeded');
  process.exit(0);
}).catch(err=>console.error(err));
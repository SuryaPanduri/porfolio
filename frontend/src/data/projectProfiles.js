const normalize = (value = "") =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const PROJECT_PROFILES = [
  {
    id: "invenzo",
    matchers: ["invenzo", "assettracking", "assetmanagement"],
    headline: "Asset Tracking & Management Web Application",
    summary:
      "A full-stack platform to manage asset inventory, checkouts, and role-specific operations across teams.",
    keyPoints: [
      "Implemented JWT authentication and role-based access control for Admin, Manager, and Viewer roles.",
      "Built backend services with Node.js and Express.js, with CRUD workflows for assets, users, and checkout records.",
      "Designed a responsive dashboard and rendered UI modules dynamically based on role permissions.",
      "Structured the system for reliable day-to-day inventory workflows and secure operational visibility.",
    ],
    architecture: [
      "Authentication layer with token verification and role guards.",
      "Asset lifecycle endpoints for create, assign, return, and status updates.",
      "Role-aware dashboard views to prevent unauthorized actions.",
    ],
    links: {
      liveUrl: "https://invenzo.onrender.com/",
      githubUrl: "https://github.com/SuryaPanduri/invenzo",
    },
  },
  {
    id: "mfa-mern",
    matchers: ["mfamern", "multifactorauthentication", "otp"],
    headline: "Multi-Factor Authentication Web Application",
    summary:
      "A secure MERN authentication system with email OTP verification and session-aware access control.",
    keyPoints: [
      "Built MFA login with OTP generation, resend, and expiry handling.",
      "Integrated Mailtrap SMTP for one-time password delivery during login.",
      "Implemented session-driven redirects and protected dashboard access.",
      "Deployed backend on Render and frontend on Vercel using MongoDB Atlas for cloud data storage.",
    ],
    architecture: [
      "Credential + OTP step-up login flow for improved account security.",
      "Session and token guards for protected route navigation.",
      "Cloud deployment split for frontend/backend scalability.",
    ],
    links: {
      liveUrl: "https://mfa-mern.vercel.app/login",
      githubUrl: "https://github.com/SuryaPanduri/mfa-mern",
    },
  },
  {
    id: "plagisense",
    matchers: ["plagisense", "plagiarism", "lcs", "fmm"],
    headline: "Text & Image Plagiarism Detection System",
    summary:
      "A plagiarism detection platform for both text and images, built to deliver interpretable similarity reports.",
    keyPoints: [
      "Led a 5-member team to deliver end-to-end plagiarism detection workflows.",
      "Used Longest Common Subsequence (LCS) and Frequency Modulo Method (FMM) for similarity analysis.",
      "Built dashboards, upload modules, and report views with React and Material UI.",
      "Implemented Node.js/Express APIs with JWT-based role access and MongoDB persistence.",
      "Generated reports with similarity percentages and highlighted matched content across multiple file formats.",
    ],
    architecture: [
      "Modular detection pipeline for text and image comparison flows.",
      "Report generation layer for readable evidence and match breakdowns.",
      "Dataset-driven validation to improve consistency across file types.",
    ],
    links: {
      liveUrl: "https://plagisense.vercel.app/",
      githubUrl: "https://github.com/SuryaPanduri/plagiSense",
    },
  },
];

export function getProjectProfile(project) {
  if (!project?.title) return null;
  const title = normalize(project.title);
  return (
    PROJECT_PROFILES.find((profile) =>
      profile.matchers.some((matcher) => title.includes(normalize(matcher)))
    ) || null
  );
}

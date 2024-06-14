import '@testing-library/jest-dom';


global.process.env = {
  ...process.env,
  VITE_REACT_APP_URL: 'http://localhost:3000', // Add other environment variables as needed
};
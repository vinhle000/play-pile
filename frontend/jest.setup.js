// jest.setup.js
global.importMetaEnv = (envKey) => {
  const env = {
    VITE_REACT_APP_URL: 'http://localhost:3000', // Add your environment variables here
  };

  return env[envKey];
};

// Mock import.meta.env
Object.defineProperty(global, 'importMeta', {
  value: {
    env: new Proxy({}, {
      get: (target, prop) => global.importMetaEnv(prop),
    }),
  },
});

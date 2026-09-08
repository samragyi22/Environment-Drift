require('dotenv').config();
const express = require('express');
const healthRouter = require('./routes/health');
const config = require('./config');

const app = express();

const port = config.port;
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET', 'PORT'];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

requiredEnvVars.forEach((key) => {
  console.log(`${key}: ${process.env[key] ? 'SET' : 'MISSING'}`);
});

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

app.use(express.json());

app.use('/health', healthRouter);

app.get('/auth-check', (req, res) => {
  const secret = config.jwt_secret;
  if (secret && secret.length > 0) {
    return res.json({ secret_configured: true });
  }
  return res.json({ secret_configured: false });
});

// Startup validation — ensure essential config is present
if (!config.database_url) {
  console.warn('WARNING: DATABASE_URL is not set. Database features may not work.');
}

app.listen(port, () => {
  console.log(`Node.js: ${process.version}`);
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${config.node_env}`);
});

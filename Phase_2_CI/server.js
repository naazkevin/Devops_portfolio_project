const express = require('express');
const client = require('prom-client');

const app = express();
const port = process.env.PORT || 3000;

// Create a Registry to register metrics
const register = new client.Registry();

// Add default system metrics (CPU, memory, event loop lag, etc.)
client.collectDefaultMetrics({ register });

// Define a custom counter metric for total HTTP requests
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests received',
  labelNames: ['method', 'route', 'status_code'],
});
register.registerMetric(httpRequestCounter);

// Middleware to count requests
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();
  });
  next();
});

// Basic app route
app.get('/', (req, res) => {
  res.send('Hello from Cloud-Native DevOps Portfolio App!');
});

// Expose the /metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
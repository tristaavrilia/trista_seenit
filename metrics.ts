import express, { Request, Response, NextFunction } from 'express';
import client from 'prom-client';

const app = express();
const register = new client.Registry();

client.collectDefaultMetrics({ register });

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Durasi HTTP request dalam ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [50, 100, 300, 500, 1000, 3000]
});

register.registerMetric(httpRequestDurationMicroseconds);

app.use((req: Request, res: Response, next: NextFunction) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.path, code: res.statusCode });
  });
  next();
});

app.get('/metrics', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', register.contentType);
  res.end(await register.metrics());
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Metrics server ready at http://localhost:${PORT}/metrics`);
});
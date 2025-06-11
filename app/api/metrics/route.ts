import { NextRequest } from 'next/server';
import client from 'prom-client';

if (!(global as any).prometheusMetricsInitialized) {
  client.collectDefaultMetrics();
  (global as any).prometheusMetricsInitialized = true;
}

export async function GET(req: NextRequest) {
  const metrics = await client.register.metrics();
  return new Response(metrics, {
    status: 200,
    headers: {
      'Content-Type': client.register.contentType,
    },
  });
}
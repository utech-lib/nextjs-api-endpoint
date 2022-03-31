import { NextApiHandler } from 'next';
import { HTTPThrowable } from './StatusCode/HTTPThrowable';

const methods = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'] as const;
type Method = typeof methods[number];

export function Endpoint(handlers: {
  [key in Method]?: NextApiHandler;
}): NextApiHandler {
  const supported = methods.filter(m => handlers[m] !== undefined);

  if (supported.length === 0)
    return async (req, res) => {
      res.status(404).send(null);
      return;
    };

  return async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');

    try {
      // supported methods
      for (const method of supported) {
        if (req.method !== method) continue;
        const handler = handlers[method];
        if (!handler) break;
        return await handler(req, res);
      }

      // OPTIONS or unsupported Methods
      res.status(req.method === 'OPTIONS' ? 204 : 405);
      res.setHeader('Allow', supported.join(', '));
      res.send(null);
      return;
    } catch (e: unknown) {
      if (e instanceof HTTPThrowable) {
        e.send(res);
        return;
      }

      res.status(500);
      res.send(null);
      console.error('Unknown Error', __filename, e);
      return;
    }
  };
}

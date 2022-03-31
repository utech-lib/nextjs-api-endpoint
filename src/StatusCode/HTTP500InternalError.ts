import { HTTPThrowable } from './HTTPThrowable';
import { NextApiResponse } from 'next';

export class HTTP500InternalError extends HTTPThrowable {
  public constructor(message: string, private readonly originalError?: Error) {
    super(message);
  }

  public send(res: NextApiResponse) {
    res.status(500).send(null);
    console.error('HTTP500 Internal Error', this.message, this.originalError);
  }
}

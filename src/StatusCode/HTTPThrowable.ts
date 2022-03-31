import { NextApiResponse } from 'next';

export abstract class HTTPThrowable extends Error {
  protected constructor(message: string = '') {
    super(message);
    this.name = 'HTTPThrowable';
  }

  public abstract send(res: NextApiResponse): void;
}

export abstract class HTTPThrowableWithMessage extends HTTPThrowable {
  protected abstract STATUS_CODE: number;

  public constructor(message: string = '') {
    super(message);
  }

  public send(res: NextApiResponse) {
    res.status(this.STATUS_CODE).send(this.message && { message: this.message });
  }
}

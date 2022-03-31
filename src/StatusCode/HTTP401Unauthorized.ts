import { HTTPThrowableWithMessage } from './HTTPThrowable';

export class HTTP401Unauthorized extends HTTPThrowableWithMessage {
  protected STATUS_CODE = 401;
}

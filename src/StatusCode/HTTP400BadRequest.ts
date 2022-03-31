import { HTTPThrowableWithMessage } from './HTTPThrowable';

export class HTTP400BadRequest extends HTTPThrowableWithMessage {
  protected STATUS_CODE = 400;
}

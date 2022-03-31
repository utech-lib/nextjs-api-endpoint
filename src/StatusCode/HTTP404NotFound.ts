import { HTTPThrowableWithMessage } from './HTTPThrowable';

export class HTTP404NotFound extends HTTPThrowableWithMessage {
  protected STATUS_CODE = 404;
}

import { HTTPThrowableWithMessage } from './HTTPThrowable';

export class HTTP409Conflict extends HTTPThrowableWithMessage {
  protected STATUS_CODE = 409;
}

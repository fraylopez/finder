import assert from "assert";
import { InvalidEmailError } from "./InvalidEmailError";

export class Mail {
  constructor(private readonly mail: string) {
    assert(this.isValid(mail), new InvalidEmailError());
  }
  toString() {
    return this.mail;
  }
  private isValid(mail: string) {
    return String(mail)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
}

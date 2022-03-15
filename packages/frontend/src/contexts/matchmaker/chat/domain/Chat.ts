import { ChatMessage } from "./ChatMessage";

export interface Chat {
  lines: ChatMessage[];
  next: ChatMessage[];
}

import { ChatMessage } from "./ChatMessage";

export interface ChatRepository {
  add(message: ChatMessage): Promise<void>;
  get(): Promise<ChatMessage[]>;
}
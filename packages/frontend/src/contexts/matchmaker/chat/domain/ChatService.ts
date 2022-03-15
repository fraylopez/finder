import { Chat } from "./Chat";

export interface ChatService {
  talk(uid: string, responseId: string): Promise<void>;
  get(uid: string): Promise<Chat>;
}


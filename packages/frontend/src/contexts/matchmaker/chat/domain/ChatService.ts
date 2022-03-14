export interface ChatService {
  answer(responseId: string): Promise<void>;
}
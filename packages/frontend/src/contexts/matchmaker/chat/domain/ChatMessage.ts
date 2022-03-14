export interface ChatMessage {
  value: string,
  next: { id: string, value: string; }[];

}
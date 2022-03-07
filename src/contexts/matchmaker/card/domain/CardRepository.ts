import { Card } from "./Card";

export interface CardRepository {
  insert(card: Card): Promise<void>;
  searchAll(): Promise<Array<Card>>;
}

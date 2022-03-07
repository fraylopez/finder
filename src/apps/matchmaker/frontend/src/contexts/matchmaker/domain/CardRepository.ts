import { Card } from "./Card";

export interface CardRepository {
  searchAll(): Promise<Array<Card>>;
}

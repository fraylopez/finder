import { Uuid } from "../../../_shared/domain/value-object/Uuid";
import { Card } from "./Card";

export interface CardRepository {
  add(card: Card): Promise<void>;
  searchAll(): Promise<Array<Card>>;
  find(id: Uuid): Promise<Card | null>;
}

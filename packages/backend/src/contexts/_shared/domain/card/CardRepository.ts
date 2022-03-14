import { Uuid } from "../../../_core/domain/value-object/Uuid";
import { Card } from "./Card";

export interface CardRepository {
  add(card: Card): Promise<void>;
  findAll(): Promise<Array<Card>>;
  find(id: Uuid): Promise<Card | null>;
}

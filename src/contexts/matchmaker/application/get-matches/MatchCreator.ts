import { inject, injectable } from "inversify";
import { types } from "../../../../apps/matchmaker/backend/ioc/types";
import { EventBus } from "../../../_shared/domain/EventBus";
import { Uuid } from "../../../_shared/domain/value-object/Uuid";
import { Match } from "../../domain/Match";
import { MatchRepository } from "../../domain/MatchRepository";

type Params = {
  id: string;
  title: string,
  imageUrl?: string,
};

@injectable()
export class MatchCreator {
  constructor(
    @inject(types.MatchRepository) private repository: MatchRepository,
    @inject(types.EventBus) private evetBus: EventBus,
  ) { }

  async run({ id, title, imageUrl }: Params) {
    const course = Match.create({ id: new Uuid(id), title, imageUrl });
    await this.repository.insert(course);
    this.evetBus.publish(course.pullDomainEvents());
  }
}

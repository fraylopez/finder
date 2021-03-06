import { expect } from "chai";
import { SwipeCreator } from "../../../../../../src/contexts/matchmaker/candidate/application/swipe/SwipeCreator";
import { SwipeCreatedEvent } from "../../../../../../src/contexts/matchmaker/candidate/domain/events/SwipeCreatedEvent";
import { MemoryCandidateRepository } from "../../../../../../src/contexts/matchmaker/candidate/infrastructure/MemoryCandidateRepository";
import { CardRepository } from "../../../../../../src/contexts/_shared/domain/card/CardRepository";
import { MemoryCardRepository } from "../../../../../../src/contexts/matchmaker/card/infrastructure/MemoryCardRepository";
import { TestUtils } from "../../../../../utils/TestUtils";
import { StubbedEventBus } from "../../../../_shared/infrastructure/bus/event/StubbedEventBus";
import { CandidateMother } from "../../domain/CandidateMother";
import { CandidateRepository } from "../../../../../../src/contexts/matchmaker/candidate/domain/CandidateRepository";
import { CardMother } from "../../../../_shared/domain/card/CardMother";

let swipeCreator: SwipeCreator;
let candidateRepository: CandidateRepository;
let cardRepository: CardRepository;
let eventBus: StubbedEventBus;

describe(`${TestUtils.getUnitTestPath(__dirname, SwipeCreator)}`, () => {
  before(() => {
    eventBus = new StubbedEventBus();
  });

  beforeEach(() => {
    candidateRepository = new MemoryCandidateRepository();
    cardRepository = new MemoryCardRepository();
    swipeCreator = new SwipeCreator(candidateRepository, cardRepository, eventBus);
  });

  it('should store a swipe', async () => {
    const candidate = CandidateMother.random();
    const card = CardMother.random();

    await candidateRepository.add(candidate);
    await cardRepository.add(card);

    await swipeCreator.swipe({
      uid: candidate.id.toString(),
      cardId: card.id.toString(),
      right: true,
    });

    const stored = await candidateRepository.find(candidate.id);
    expect(stored?.toPrimitives().swipes).lengthOf(1);
  });

  it('should emit a SwipeCreatedEvent', async () => {
    const candidate = CandidateMother.random();
    const card = CardMother.random();

    await candidateRepository.add(candidate);
    await cardRepository.add(card);

    await swipeCreator.swipe({
      uid: candidate.id.toString(),
      cardId: card.id.toString(),
      right: true,
    });

    eventBus.assertPublished(SwipeCreatedEvent);
  });
});


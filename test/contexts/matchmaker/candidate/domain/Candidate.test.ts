import { expect } from "chai";
import { container } from "../../../../../src/apps/matchmaker/backend/ioc/installer";
import { types } from "../../../../../src/apps/matchmaker/backend/ioc/types";
import { MatchEvaluator } from "../../../../../src/contexts/matchmaker/candidate/domain/MatchEvaluator";
import { Candidate } from "../../../../../src/contexts/matchmaker/candidate/domain/Candidate";
import { ScoreMatchEvaluator } from "../../../../../src/contexts/matchmaker/candidate/domain/ScoreMatchEvaluator";
import { TestUtils } from "../../../../utils/TestUtils";
import { CandidateMother } from "./CandidateMother";
import { SwipeMother } from "./SwipeMother";
import { MatchCreatedEvent } from "../../../../../src/contexts/matchmaker/candidate/domain/MatchCreatedEvent";

describe(`${TestUtils.getUnitTestPath(__dirname, Candidate)}`, () => {
  it('should set candidate as match when reaches threshold score', () => {
    const evaluator: MatchEvaluator = container.get(types.MatchEvaluator);
    const candidate = CandidateMother.random();

    candidate.swipe(SwipeMother.withScore(ScoreMatchEvaluator.MATCH_SCORE));
    candidate.match(evaluator);

    expect(candidate.toPrimitives().isMatch).eq(true);
    expect(candidate.pullDomainEvents().some((e) => e.eventName === MatchCreatedEvent.NAME)).eq(true);
  });
});
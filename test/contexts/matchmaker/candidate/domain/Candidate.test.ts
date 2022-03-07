import { expect } from "chai";
import { container } from "../../../../../src/apps/matchmaker/backend/ioc/installer";
import { types } from "../../../../../src/apps/matchmaker/backend/ioc/types";
import { MatchEvaluator } from "../../../../../src/contexts/matchmaker/candidate/domain/MatchEvaluator";
import { Candidate } from "../../../../../src/contexts/matchmaker/candidate/domain/Candidate";
import { ScoreMatchEvaluator } from "../../../../../src/contexts/matchmaker/candidate/domain/ScoreMatchEvaluator";
import { TestUtils } from "../../../../utils/TestUtils";
import { CandidateMother } from "./CandidateMother";
import { SwipeMother } from "./SwipeMother";

describe(`${TestUtils.getUnitTestPath(__dirname, Candidate)}`, () => {
  it('should set candidate as match when reaches match score', () => {
    const candidate = CandidateMother.random();
    candidate.swipe(SwipeMother.withScore(ScoreMatchEvaluator.MATCH_SCORE));

    const evaluator: MatchEvaluator = container.get(types.MatchEvaluator);
    candidate.match(evaluator);
    expect(candidate.toPrimitives().isMatch).eq(true);
  });
});
import { useEffect, useState } from 'react';
import { container } from "../../../config/ioc/installer";
import { MatchFinder } from "../../../contexts/matchmaker/application/get-matches/MatchFinder";
import { Match } from "../../../contexts/matchmaker/domain/Match";
import './MatchesView.css';

function MatchesView() {
  const [matches, setMatches] = useState<Match[]>([]);
  useEffect(() => {
    async function fetchMatches() {
      const result = await container.get(MatchFinder).find();
      setMatches(result);
    }
    fetchMatches();
  });

  return (
    <div className="MatchesView">
      <p>MATCHES</p>
      <ul>
        {matches.map(m => (
          <li key={m.id}>
            <p>{m.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MatchesView;

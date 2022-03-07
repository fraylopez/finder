import { useEffect, useState } from 'react';
import { container } from "../../../config/ioc/installer";
import { CardFinder } from "../../../contexts/matchmaker/application/get-cards/CardFinder";
import { Card } from "../../../contexts/matchmaker/domain/Card";
import './CardsView.css';

function CardsView() {
  const [matches, setMatches] = useState<Card[]>([]);
  useEffect(() => {
    async function fetchMatches() {
      const result = await container.get(CardFinder).find();
      setMatches(result);
    }
    fetchMatches();
  });

  return (
    <div className="CardsView">
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

export default CardsView;

import { useEffect, useState } from 'react';
import { container } from "../../../config/ioc/installer";
import { CardFinder } from "../../../contexts/matchmaker/application/get-cards/CardFinder";
import { Card } from "../../../contexts/matchmaker/domain/Card";
import './CardsView.css';

function CardsView() {
  const [cards, setCards] = useState<Card[]>([]);
  useEffect(() => {
    async function fetchCards() {
      const result = await container.get(CardFinder).find();
      setCards(result);
    }
    fetchCards();
  });

  return (
    <div className="CardsView">
      <p>CARDS</p>
      <ul>
        {cards.map(m => (
          <li key={m.id}>
            <p>{m.id}</p>
            <p>{m.title}</p>
            <img src={m.imageUrl} alt={m.imageUrl} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardsView;

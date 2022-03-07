import { useCallback, useEffect, useState } from 'react';
import { container } from "../../../config/ioc/installer";
import { CandidateFinder } from "../../../contexts/matchmaker/candidate/application/CandidateFinder";
import { SwipeCreator } from "../../../contexts/matchmaker/candidate/application/SwipeCreator";
import { CardFinder } from "../../../contexts/matchmaker/card/application/get-cards/CardFinder";
import { Card } from "../../../contexts/matchmaker/card/domain/Card";
import './CardsView.css';

function CardsView() {
  const [cards, setCards] = useState<Card[]>([]);
  useEffect(() => {
    async function fetchCards() {
      const result = await container.get(CardFinder).find();
      setCards(result);
    }
    fetchCards();
  }, []);

  const [isSending, setIsSending] = useState(false);
  const sendSwipe = useCallback(async (cardId: string, right: boolean) => {
    if (isSending) return;
    setIsSending(true);
    const candidate = await container.get(CandidateFinder).get();
    await container.get(SwipeCreator).swipe(candidate!.id, cardId, right);
    setIsSending(false);
  }, [isSending]);


  return (
    <div className="CardsView">
      <p>CARDS</p>
      <ul>
        {cards.map(m => (
          <li key={m.id}>
            <p>{m.id}</p>
            <p>{m.title}</p>
            <img src={m.imageUrl} alt={m.imageUrl} />
            {
              !isSending ?
                <div><button onClick={() => sendSwipe(m.id, false)} >LEFT</button> <button onClick={() => sendSwipe(m.id, true)} >RIGHT</button> </div>
                :
                null
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardsView;

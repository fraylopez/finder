import { useEffect, useState, useCallback } from 'react';
import { CandidateFinder } from "../../../contexts/matchmaker/candidate/application/CandidateFinder";
import { SwipeCreator } from "../../../contexts/matchmaker/candidate/application/SwipeCreator";
import { container } from "../../../config/ioc/installer";
import { CardFinder } from "../../../contexts/matchmaker/card/application/get-cards/CardFinder";
import { Card } from "../../../contexts/matchmaker/card/domain/Card";
import CardStack from './CardStack';
import { HeartIcon, XIcon } from '@heroicons/react/outline';

function CardsView() {
  const [cards, setCards] = useState<Card[]>([]);
  useEffect(() => {
    async function fetchCards() {
      const result = await container.get(CardFinder).find();
      setCards(result.reverse());
    }
    fetchCards();
  }, []);


  const [isSending, setIsSending] = useState(false);

  const sendSwipe = async (cardId: string, right: boolean) => {
    if (isSending) return;
    setIsSending(true);
    const candidate = await container.get(CandidateFinder).get();
    await container.get(SwipeCreator).swipe(candidate!.id, cardId, right);
    setCards(cards.slice(0, -1));
    setIsSending(false);
  };

  return (
    <div className="w-full h-full relative pt-10 pb-16 max-w-4xl mx-auto px-6 lg:px-8">
      <CardStack cards={cards} onVote={sendSwipe} />
      <div className="absolute bottom-16 right-0 left-0 px-6 my-6 flex place-content-evenly">
        <button
          type="button"
          className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <XIcon className="h-8 w-8" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <HeartIcon className="h-8 w-8" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default CardsView;

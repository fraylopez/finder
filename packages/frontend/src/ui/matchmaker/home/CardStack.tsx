import Card from "./Card";

interface CardStackProps {
  cards: {
    id: string;
    title: string;
    imageUrl: string;
  }[],
  onVote: Function
}

const CardStack = ({cards, onVote}: CardStackProps) => {


  return (
    <div className="relative justify-center items-center h-full">
      {cards.map((card, index) => <Card key={card.id} index={cards.length - index - 1} {...card} onVote={onVote} />)}
    </div>
  )

}

export default CardStack;
import { useEffect, useState } from 'react';
import { container } from "../../../config/ioc/installer";
import { CardUpdater } from "../../../contexts/matchmaker/application/get-cards/CardUpdater";
import './Header.css';

function Header() {
  const [matchCount, updateCards] = useState<number>(0);
  useEffect(() => {
    container.get(CardUpdater).register((message: any) => {
      updateCards(message.count);
    });
  });

  return (
    <header className="Header">
      <p>MATCHMAKER</p>
      <p>matchCount: {matchCount}</p>
    </header>
  );
}

export default Header;

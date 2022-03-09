import { useEffect, useState } from 'react';
import { container } from "../../../config/ioc/installer";
import { MatchUpdater } from "../../../contexts/matchmaker/candidate/application/MatchUpdater";
import './Header.css';

function Header() {
  const [matchCount, updateCards] = useState<number>(0);
  useEffect(() => {
    container.get(MatchUpdater).register((message: any) => {
      updateCards(matchCount + 1);
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

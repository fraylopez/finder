import { useEffect, useState } from 'react';
import { container } from "../../../config/ioc/installer";
import { MatchUpdater } from "../../../contexts/matchmaker/application/get-matches/MatchUpdater";
import './Header.css';

function Header() {
  const [matchCount, updateMatches] = useState<number>(0);
  useEffect(() => {
    container.get(MatchUpdater).register((message: any) => {
      updateMatches(message.count);
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

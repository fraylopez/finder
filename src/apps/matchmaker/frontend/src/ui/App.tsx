import './App.css';
import Header from "./matchmaker/home/Header";
import CardsView from "./matchmaker/home/CardsView";
import { container } from "../config/ioc/installer";
import { CandidateCreator } from "../contexts/matchmaker/candidate/application/CandidateCreator";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    async function createCandidate() {
      const candidateCreator = container.get(CandidateCreator);
      await candidateCreator.create();
    }
    createCandidate();
  }, []);


  return (
    <div className="App">
      <Header />
      <CardsView />
    </div>
  );
}

export default App;

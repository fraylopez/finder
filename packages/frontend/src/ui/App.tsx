import Header from "./matchmaker/home/Header";
import CardsView from "./matchmaker/home/CardsView";
import { container } from "../config/ioc/installer";
import { CandidateCreator } from "../contexts/matchmaker/candidate/application/CandidateCreator";
import { useEffect, useState } from "react";
import { initApp } from "./initApp";
import Chat2View from "./matchmaker/home/Chat2View";

export default function Example() {
  useEffect(() => {
    initApp();
    async function createCandidate() {
      const candidateCreator = container.get(CandidateCreator);
      await candidateCreator.create();
    }
    createCandidate();
  }, []);

  const [page, setPage] = useState<"swipe" | "chats">("swipe");

  return (
    <>
      <div className="min-h-full">
        <Header page={page} setPage={setPage} />
        <main className="h-screen pt-16">
          {page === "swipe" && (<CardsView />)}
          {page === "chats" && (<Chat2View />)}
        </main>
      </div>
    </>
  );
}

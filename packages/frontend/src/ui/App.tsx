import Header from "./matchmaker/home/Header";
import CardsView from "./matchmaker/home/CardsView";
import { container } from "../config/ioc/installer";
import { CandidateCreator } from "../contexts/matchmaker/candidate/application/CandidateCreator";
import { useEffect, useState } from "react";
import ChatView from "./matchmaker/home/ChatView";
import { initApp } from "./initApp";

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
          {page === "chats" && (<ChatView />)}
        </main>
      </div>
    </>
  );
}

import Header from "./matchmaker/home/Header";
import CardsView from "./matchmaker/home/CardsView";
import { container } from "../config/ioc/installer";
import { CandidateCreator } from "../contexts/matchmaker/candidate/application/CandidateCreator";
import { useEffect, useState } from "react";
import { initApp } from "./initApp";
import ChatView from "./matchmaker/home/ChatView";
import { Candidate } from "../contexts/matchmaker/candidate/domain/Candidate";

export default function Example() {

  const [candidate, setCandidate] = useState<Candidate>();

  useEffect(() => {
    initApp();
    async function createCandidate() {
      const candidateCreator = container.get(CandidateCreator);
      const candidate = await candidateCreator.create();
      setCandidate(candidate);
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
          {page === "chats" && (<ChatView uid={candidate?.id} />)}
        </main>
      </div>
    </>
  );
}

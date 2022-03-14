import { useEffect, useReducer } from "react";
import { container } from "../../../config/ioc/installer";
import { ChatFinder } from "../../../contexts/matchmaker/chat/application/ChatFinder";
import { ChatUpdater } from "../../../contexts/matchmaker/chat/application/ChatUpdater";
import { ChatMessage } from "../../../contexts/matchmaker/chat/domain/ChatMessage";


function Chat2View() {
  const [messages, addMessage] = useReducer((messages: ChatMessage[], message: ChatMessage): ChatMessage[] => {
    return [...messages, message];
  }, []);

  useEffect(() => {
    async function getMessages() {
      const messages = await container.get(ChatFinder).get();
      messages.forEach(addMessage);
    }
    container.get(ChatUpdater).addCallback((message: ChatMessage) => {
      addMessage(message);
    });
    getMessages();
    // return container.get(MatchUpdater).unregister();
  }, []);

  return (
    <div>
      <p>Chat</p>
      {messages.map(m =>
        <div>
          <p>company: {m.value}</p>
          {m.next.map(n => <button>{n.id}</button>)}
        </div>
      )}
    </div>
  );

};




export default Chat2View;

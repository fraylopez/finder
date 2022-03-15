import { useEffect, useReducer, useState } from "react";
import { container } from "../../../config/ioc/installer";
import { ChatCreator } from "../../../contexts/matchmaker/chat/application/ChatCreator";
import { ChatFinder } from "../../../contexts/matchmaker/chat/application/ChatFinder";
import { ChatUpdater, ReceivedMessage } from "../../../contexts/matchmaker/chat/application/ChatUpdater";
import { ChatMessage } from "../../../contexts/matchmaker/chat/domain/ChatMessage";

interface Props {
  uid?: string;
}

function Chat2View(props: Props) {
  const [nextOptions, addNextoptions] = useState<ChatMessage[]>([]);

  const [messages, addMessage] = useReducer((messages: ChatMessage[], message: ChatMessage): ChatMessage[] => {
    return [...messages, message];
  }, []);

  useEffect(() => {
    async function getMessages() {
      const chat = props.uid ?
        await container.get(ChatFinder).get(props.uid!) :
        undefined;
      if (chat) {
        chat.lines.forEach(addMessage);
        addNextoptions(chat.next);
      }
    }
    container.get(ChatUpdater).addCallback((message: ReceivedMessage) => {
      addMessage(message.current);
      addNextoptions(message.next);
    });
    getMessages();
    // return container.get(MatchUpdater).unregister();
  }, []);

  const onSubmit = (message: ChatMessage) => {
    addMessage({ from: "you", value: message.value, id: message.id });
    container.get(ChatCreator).add(props.uid!, message.id);
  };
  return (
    <div>
      <p>Chat</p>
      {messages.map(m =>
        <div key={m.id}>
          <p>{m.from}: {m.value}</p>
        </div>
      )}
      {nextOptions.map(n => <button className="bg-red-200 rounded-full p-4 hover:bg-red-300" onClick={() => onSubmit(n)}>{n.value}</button>)}
    </div >
  );

};




export default Chat2View;

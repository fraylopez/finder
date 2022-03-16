import { ChatAltIcon } from "@heroicons/react/outline";
import { m } from "framer-motion";
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
    return [message, ...messages];
  }, []);

  const [isTyping, setTyping] = useState(false);

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
      setTimeout(() => setTyping(true), 300);
      setTimeout(() => {
        addMessage(message.current);
        addNextoptions(message.next);
        setTyping(false);
      }, 2500);
    });
    getMessages();
    // return container.get(MatchUpdater).unregister();
  }, [props.uid]);

  const onSubmit = (message: ChatMessage) => {
    addMessage({ from: "you", value: message.value, id: message.id });
    container.get(ChatCreator).add(props.uid!, message.id);
  };
  return (
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-full">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <span className="absolute text-green-500 right-0 bottom-0">
              <div className="bg-green-500 h-4 w-4 rounded-full"></div>
            </span>
            {isTyping && (<span className="absolute text-green-200 right-0 bottom-0 animate-ping">
              <div className="bg-green-500 h-4 w-4 rounded-full"></div>
            </span>)}
            <img src="https://pbs.twimg.com/profile_images/1039739037425315841/GM74Yth-_400x400.jpg" alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-700 mr-3">Mr. X</span>
            </div>
            <span className="text-lg text-gray-600">{isTyping ? "is typing..." : "Misterious person"}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* {Details} */}
        </div>
      </div>
      <div id="messages" className="flex flex-col-reverse space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex-1">
        {messages.map((message) => message.from === "you" ? (
          <div className="chat-message">
            <div className="flex items-end justify-end">
              <div className="flex flex-col space-y-2 max-w-xs mx-2 order-1 items-end">
                <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">{message.value}</span></div>
              </div>
              <img src="https://www.interstatedevelopment.com/wp-content/uploads/2019/04/generic-avatar-1.jpg" alt="My profile" className="w-8 h-8 md:w-12 md:h-12 rounded-full order-2" />
            </div>
          </div>
        ) : (
          <div className="chat-message">
            <div className="flex items-end">
              <div className="flex flex-col space-y-2 max-w-xs mx-2 order-2 items-start">
                <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">{message.value}</span></div>
              </div>
              <img src="https://pbs.twimg.com/profile_images/1039739037425315841/GM74Yth-_400x400.jpg" alt="My profile" className="w-8 h-8 md:w-12 md:h-12 rounded-full order-1" />
            </div>
          </div>
        ))}
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <div className="flex-1 items-center inset-y-0 hidden sm:flex">
            {nextOptions.map(option => (
              <button type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 mr-6 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none" onClick={() => onSubmit(option)}>
                <ChatAltIcon className="h-6 w-6 mr-2" />
                <span className="font-bold">{option.value}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

};




export default Chat2View;

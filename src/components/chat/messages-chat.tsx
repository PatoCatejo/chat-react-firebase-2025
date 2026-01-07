import { useMessagesActions } from "@/hooks/use-messages-actions";
import MessageChat from "./message-chat";

interface Props {
  roomId: string;
}
const MessagesChat = ({ roomId }: Props) => {
  const { messages } = useMessagesActions(roomId);

  return (
    <div className="flex flex-col gap-3">
      {messages.length === 0 ? (
        <div className="text-center text-slate-400 text-sm py-8">
          <p>No hay mensajes aún. ¡Sé el primero!</p>
        </div>
      ) : (
        messages.map((message) => (
          <MessageChat key={message.id} message={message} />
        ))
      )}
    </div>
  );
};
export default MessagesChat;

import type { Message } from "@/schemas/room.schema";
import { useUser } from "reactfire";
import FriendEmail from "./friend-email";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

interface Props {
  message: Message;
}

const MessageChat = ({ message }: Props) => {
  const { data: user } = useUser();

  const isFriend = user?.uid !== message.senderId;

  return (
    <div className={cn("flex gap-3", !isFriend && "justify-end")}>
      <div
        className={cn(
          "max-w-xs lg:max-w-md px-4 py-2 rounded-lg text-sm wrap-break-word shadow-sm",
          isFriend
            ? "bg-slate-100 text-slate-900 rounded-bl-none"
            : "bg-blue-500 text-white rounded-br-none"
        )}
      >
        <p className="wrap-break-word">{message.text}</p>
      </div>
      {isFriend && (
        <div className="text-xs text-slate-400 flex items-end pb-1 max-w-[100px] truncate">
          <Suspense fallback="">
            <FriendEmail friendUID={message.senderId} />
          </Suspense>
        </div>
      )}
    </div>
  );
};
export default MessageChat;

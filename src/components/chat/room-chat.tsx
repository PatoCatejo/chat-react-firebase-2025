import type { Room } from "@/schemas/room.schema";
import { useUser } from "reactfire";
import { Button } from "../ui/button";
import FriendEmail from "./friend-email";
import { Suspense } from "react";
import { MessageCircle } from "lucide-react";

interface Props {
  room: Room;
  handleClickRoomId: (id: string) => void;
}

const RoomChat = ({ room, handleClickRoomId }: Props) => {
  const { data: user } = useUser();

  const friendUID = room.participants.find((id) => id !== user?.uid) || "";

  return (
    <Button
      onClick={() => handleClickRoomId(room.id)}
      variant="ghost"
      className="w-full justify-start px-4 py-3 h-auto rounded-lg hover:bg-slate-100 transition-colors"
    >
      <div className="flex flex-col items-start w-full gap-1">
        <div className="flex items-center gap-3 w-full min-w-0">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 shrink-0 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-slate-900 truncate text-sm">
              <Suspense fallback="cargando...">
                <FriendEmail friendUID={friendUID} />
              </Suspense>
            </p>
            <p className="text-xs text-slate-500 truncate">
              {room.lastMessage?.text || "Sin mensajes"}
            </p>
          </div>
        </div>
      </div>
    </Button>
  );
};
export default RoomChat;

import { UseRoomActions } from "@/hooks/use-room-actions";
import RoomChat from "./room-chat";

interface Props {
  handleClickRoomId: (id: string) => void;
}

const ListRoomChat = ({ handleClickRoomId }: Props) => {
  const { rooms } = UseRoomActions();

  return (
    <div className="flex flex-col gap-1 p-2">
      {rooms.map((room) => (
        <RoomChat
          key={room.id}
          room={room}
          handleClickRoomId={handleClickRoomId}
        />
      ))}
      {rooms.length === 0 && (
        <p className="text-center text-slate-400 text-sm py-4">
          No hay chats disponibles
        </p>
      )}
    </div>
  );
};
export default ListRoomChat;

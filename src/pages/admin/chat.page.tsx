import FormMessageChat from "@/components/chat/form-message-chat";
import FormSearchFriend from "@/components/chat/form-search-friend";
import ListRoomChat from "@/components/chat/list-room-chat";
import MessagesChat from "@/components/chat/messages-chat";
import { Suspense, useState } from "react";
import { MessageCircle } from "lucide-react";

const ChatPage = () => {
  const [roomId, setRoomId] = useState("");

  const handleClickRoomId = (id: string) => {
    setRoomId(id);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row gap-0 bg-slate-50">
      {/* Sidebar: Lista de salas */}
      <aside className="w-full md:w-80 h-1/3 md:h-full bg-white border-b md:border-r border-slate-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-200 shrink-0 bg-linear-to-r from-blue-50 to-white">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-900">Chats</h2>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Suspense
            fallback={
              <div className="p-4 text-center text-slate-500 text-sm">
                Cargando chats...
              </div>
            }
          >
            <FormSearchFriend handleClickRoomId={handleClickRoomId} />
            <ListRoomChat handleClickRoomId={handleClickRoomId} />
          </Suspense>
        </div>
      </aside>

      {/* Main: Área de mensajes */}
      <section className="w-full md:flex-1 h-2/3 md:h-full bg-white flex flex-col overflow-hidden">
        {roomId ? (
          <Suspense
            fallback={
              <div className="flex-1 flex items-center justify-center text-slate-500">
                Cargando mensajes...
              </div>
            }
          >
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4">
                <MessagesChat roomId={roomId} />
              </div>
              <div className="border-t border-slate-200 p-4 shrink-0 bg-slate-50">
                <FormMessageChat roomId={roomId} />
              </div>
            </div>
          </Suspense>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <p className="text-center">Selecciona un chat para comenzar</p>
          </div>
        )}
      </section>
    </div>
  );
};
export default ChatPage;

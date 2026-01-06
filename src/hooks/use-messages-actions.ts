import type { LastMessage, Message } from "@/schemas/room.schema";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export const useMessagesActions = (roomId: string) => {
  const { data: user } = useUser();
  const db = useFirestore();

  const messagesRef = collection(db, "rooms", roomId, "messages");

  const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));

  const { data: messages } = useFirestoreCollectionData(messagesQuery, {
    suspense: true,
    idField: "id",
  });

  const sendMessage = async (text: string) => {
    if (!user) throw new Error("useMessagesActions: 401");
    if (!text.trim()) throw new Error("useMessagesActions: 400");

    const timestamp = serverTimestamp();

    // crear mensaje
    const messageData: Omit<Message, "id"> = {
      senderId: user.uid,
      text,
      timestamp,
    };

    // await addDoc(messagesRef, messageData)

    // actualizar lastMesage en el room
    const roomRef = doc(db, "rooms", roomId);

    const LastMessage: LastMessage = {
      senderId: user.uid,
      text,
      timestamp,
    };

    // await updateDoc(roomRef, {
    //     LastMessage
    // })

    await Promise.all([
      updateDoc(roomRef, {
        LastMessage,
      }),
      addDoc(messagesRef, messageData),
    ]);
  };

  return {
    messages: messages as Message[],
    sendMessage,
  };
};

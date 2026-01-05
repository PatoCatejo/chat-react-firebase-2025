import type { Message } from "@/schemas/room.schema";
import { collection, orderBy, query } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

export const useMessagesActions = (roomId: string) => {
  const db = useFirestore();

  const messagesRef = collection(db, "rooms", roomId, "messages");

  const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));

  const { data: messages } = useFirestoreCollectionData(messagesQuery, {
    suspense: true,
    idField: "id",
  });

  return {
    messages: messages as Message[],
  };
};

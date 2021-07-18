import { useLocation } from "react-router-dom";

export const useGetRoomUid = () => {
  const ROOM_UID_INDEX = 2;
  return Number(useLocation().pathname.split("/")[ROOM_UID_INDEX]);
};

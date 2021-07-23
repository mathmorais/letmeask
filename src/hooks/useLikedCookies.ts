import Cookies from "js-cookie";

interface ILikedCookies {
  likedItems: string[];
  handleFindLikedQuestion: (questionUid: string) => boolean;
}

export const useLikedCookies = (): ILikedCookies => {
  const cookieKey = "liked";
  const likedItems = (Cookies.getJSON(cookieKey) as string[]) ?? [];

  const handleFindLikedQuestion = (questionUid: string) => {
    for (let index = 0; index < likedItems.length; index++) {
      if (questionUid === likedItems[index]) return true;
    }
    return false;
  };

  return { likedItems, handleFindLikedQuestion };
};

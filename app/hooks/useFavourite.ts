import { useCallback, useMemo } from "react";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModel";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IUseFavourite {
  currentUser?: SafeUser | null;
  listingId: string;
}

export function useFavourite({ currentUser, listingId }: IUseFavourite) {
  const LoginModal = useLoginModal();
  const router = useRouter();
  const hasFavourited = useMemo(() => {
    const list = currentUser?.favouriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavourites = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return LoginModal.onOpen();
      }

      try {
        let request;
        if (hasFavourited) {
          request = () => axios.delete(`/api/favourites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favourites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success("Success!");
      } catch (err) {
        toast.error("Error!");
      }
    },
    [LoginModal, currentUser, hasFavourited, listingId, router]
  );
  return { toggleFavourites, hasFavourited };
}

export default useFavourite;

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavourite from "../hooks/useFavourite";

interface HeartButtonProps {
  currentUser?: SafeUser | null;
  listingId: string;
}

const HeartButton: React.FC<HeartButtonProps> = function ({
  currentUser,
  listingId,
}) {
  const { toggleFavourites, hasFavourited } = useFavourite({
    currentUser,
    listingId,
  });

  return (
    <div
      className="relative hover:opacity-80 transition cursor-pointer"
      onClick={toggleFavourites}
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px] "
      />
      <AiFillHeart
        size={24}
        className={`${hasFavourited ? "fill-rose-500" : "fill-neutral-300"} `}
      />
    </div>
  );
};

export default HeartButton;

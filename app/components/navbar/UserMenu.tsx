"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModel";

import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const RegisterModal = useRegisterModal();
  const LoginModal = useLoginModal();
  const RentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const openRent = useCallback(() => {
    if (!currentUser) {
      return LoginModal.onOpen();
    }

    RentModal.onOpen();
  }, [LoginModal, currentUser, RentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={openRent}
          className="hidden sm:block text-sm font-semibold rounded-full py-3 px-4  hover:bg-gray-100 cursor-pointer transition "
        >
          Your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-2 border-[2px] sm:py-1 sm:px-2 border-neutral-300 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden sm:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {
                    router.push("/trips");
                  }}
                  label="Trips"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/favourites");
                  }}
                  label="Favourites"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/reservations");
                  }}
                  label="Reservations"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/properties");
                  }}
                  label="Properties"
                />
                <MenuItem onClick={RentModal.onOpen} label="Airbnb my home" />
                <hr></hr>
                <MenuItem
                  onClick={() => {
                    signOut();
                  }}
                  label="Log out"
                />
              </>
            ) : (
              <>
                <MenuItem onClick={LoginModal.onOpen} label="Login" />
                <MenuItem onClick={RegisterModal.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Next 13
const Logo = () => {
  const router = useRouter();
  return (
    <div>
      <Image
        className="hidden sm:block cursor-pointer"
        alt="Airbnb Logo"
        height="100"
        width="100"
        src="/images/logo.png"
        onClick={() => {
          router.push("/");
        }}
      />
    </div>
  );
};

export default Logo;

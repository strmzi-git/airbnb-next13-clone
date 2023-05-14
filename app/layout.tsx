import "./globals.css";
import { Nunito } from "next/font/google";
export const metadata = {
  title: "airbnb",
  description: "Airbnb clone",
};
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";

import RegisterModal from "./components/Models/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/Models/LoginModal";

import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/Models/RentModal";
import SearchModel from "./components/Models/SearchModel";

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <SearchModel />
          <LoginModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pt-28 pb-20">{children}</div>
      </body>
    </html>
  );
}

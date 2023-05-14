"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface FavouritesClientProps {
  currentUser: SafeUser;
  favourites: SafeListing[] | null;
}

const FavouritesClient: React.FC<FavouritesClientProps> = function ({
  currentUser,
  favourites,
}) {
  return (
    <Container>
      <div className="mt-20">
        <Heading
          title="Favourites"
          subtitle="Below are the properties you listed as your favourite."
        />
        <div className="grid mt-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-7">
          {favourites?.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FavouritesClient;

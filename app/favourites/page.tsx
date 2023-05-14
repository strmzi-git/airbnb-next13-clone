import getCurrentUser from "../actions/getCurrentUser";
import getFavourites from "../actions/getFavourites";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import FavouritesClient from "./FavouritesClient";

async function FavouritesPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="You must be signed in to view this page."
        />
      </ClientOnly>
    );
  }
  const favourites = await getFavourites({ currentUser });

  return (
    <ClientOnly>
      <FavouritesClient currentUser={currentUser} favourites={favourites} />
    </ClientOnly>
  );
}

export default FavouritesPage;

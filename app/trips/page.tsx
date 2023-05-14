import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const Trips = async function () {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please log in to continue."
        />
      </ClientOnly>
    );
  }

  const userReservations = await getReservations({
    userId: currentUser.id,
  });
  if (userReservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found."
          subtitle="Looks like you haven't booked anything!"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={userReservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default Trips;

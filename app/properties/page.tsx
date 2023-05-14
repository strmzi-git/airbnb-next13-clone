import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./TripsClient";

const Properties = async function () {
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

  const userProperties = await getListings({
    userId: currentUser.id,
  });
  if (userProperties.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found."
          subtitle="Looks like you have no properties listed for rent."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient properties={userProperties} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default Properties;

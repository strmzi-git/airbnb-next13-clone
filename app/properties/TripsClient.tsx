"use client";

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface PropertiesClientProps {
  currentUser: SafeUser;
  properties: SafeListing[];
}

const PropertiesClient: React.FC<PropertiesClientProps> = function ({
  currentUser,
  properties,
}) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const cancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Successfully deleted property listing");
          router.refresh();
        })
        .catch((err) => {
          toast.error("An error occured!");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="These are the properties you listed for rent."
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {properties.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={cancel}
            disabled={deletingId === listing.id}
            actionLabel="Cancel property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
export default PropertiesClient;

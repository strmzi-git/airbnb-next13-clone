"use client";

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
  currentUser: SafeUser;
  reservations: SafeReservation[];
}

const TripsClient: React.FC<TripsClientProps> = function ({
  currentUser,
  reservations,
}) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const cancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Successfully deleted trip");
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
      <div className="mt-20">
        <Heading title="Trips" subtitle="This is where you've been going" />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {reservations.map((res) => (
            <ListingCard
              key={res.id}
              data={res.listing}
              reservation={res}
              actionId={res.id}
              onAction={cancel}
              disabled={deletingId === res.id}
              actionLabel="Cancel reservation"
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};
export default TripsClient;

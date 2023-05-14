"use client";

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps {
  currentUser: SafeUser;
  reservations: SafeReservation[];
}

const ReservationsClient: React.FC<ReservationsClientProps> = function ({
  currentUser,
  reservations,
}) {
  const router = useRouter();
  console.log(reservations);
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Successfully deleted user reservation");
          router.refresh();
        })
        .catch(() => {
          toast.error("An error occured!");
        });
      // .finally(() => {
      //   setDeletingId("");
      // });
    },
    [router]
  );
  return (
    <Container>
      <div className="mt-20">
        <Heading title="Reservations" subtitle="Your property reservations:" />
        <div className=" grid empty-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 mb-10">
          {reservations.map((reservation) => (
            <ListingCard
              currentUser={currentUser}
              onAction={onCancel}
              actionLabel="Remove reservation"
              data={reservation.listing}
              actionId={reservation.id}
              disabled={deletingId === reservation.id}
              key={reservation.id}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ReservationsClient;

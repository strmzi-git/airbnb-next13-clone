import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";

interface IParams {
  reservationId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const { reservationId } = params;
  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID provided.");
  }

  const deletedReservation = await prisma.reservations.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(deletedReservation);
}

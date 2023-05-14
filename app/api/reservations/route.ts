import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextServer } from "next/dist/server/next";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;
  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }
  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });
  if (!listingAndReservation) {
    return NextResponse.error();
  }
  return NextResponse.json(listingAndReservation);
}

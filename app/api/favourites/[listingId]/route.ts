import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  listingId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;
  const requestedListings = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
  });
  if (!requestedListings) {
    throw new Error("Invalid ID!");
  }

  let newFavourites = [...(currentUser.favouriteIds || [])];

  newFavourites.push(listingId);
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favouriteIds: newFavourites,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  const currentFavouritedListings = currentUser.favouriteIds;
  const newFavouritedIds = currentFavouritedListings.filter(
    (listing) => listing !== listingId
  );

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favouriteIds: newFavouritedIds,
    },
  });

  return NextResponse.json(updatedUser);
}

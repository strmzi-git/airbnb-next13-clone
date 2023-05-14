import { SafeUser } from "../types";
import prisma from "../libs/prismadb";
import { NextResponse } from "next/server";
import { Listing } from "@prisma/client";

interface IParams {
  currentUser: SafeUser;
}

export default async function getFavourites({ currentUser }: IParams) {
  try {
    const favouriteListingsPromise = currentUser.favouriteIds.map(
      (listingId) => {
        const listing = prisma.listing.findUnique({
          where: {
            id: listingId,
          },
        });
        if (!listing) return;
        return listing;
      }
    );
    const favouriteListings = await Promise.all(favouriteListingsPromise);

    if (favouriteListings.length === 0) {
      return [];
    }
    const safeFavourites = favouriteListings
      .filter(
        (listing): listing is Listing =>
          listing !== null && listing !== undefined
      )
      .map((listing) => ({
        ...listing,
        createdAt: listing.createdAt.toISOString(),
      }));

    return safeFavourites;
  } catch (err: any) {
    throw new Error(err);
  }
}

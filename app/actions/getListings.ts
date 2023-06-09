import prisma from "../libs/prismadb";

export interface IListingParams {
  bathroomCount?: number;
  guestCount?: number;
  userId?: string;
  roomCount?: number;
  category?: string;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    const {
      userId,
      bathroomCount,
      guestCount,
      roomCount,
      category,
      startDate,
      endDate,
      locationValue,
    } = params;
    let query: any = {};
    if (userId) {
      query.userId = userId;
    }
    if (category) {
      query.category = category;
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }
    if (locationValue) {
      query.locationValue = locationValue;
    }
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { gte: endDate },
                endDate: { lte: endDate },
              },
            ],
          },
        },
      };
    }
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc", // Descending
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListings;
  } catch (err: any) {
    throw new Error(err);
  }
}

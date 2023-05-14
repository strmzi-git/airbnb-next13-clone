import prisma from "../libs/prismadb";
// Action for a server component, not api call
interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations({
  listingId,
  userId,
  authorId,
}: IParams) {
  try {
    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }
    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservations.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservation = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));
    return safeReservation;
  } catch (err: any) {
    throw new Error(err);
  }
}

import prisma from "../libs/prismadb";
interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;
    const uniqueListing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });
    if (!uniqueListing) {
      return null;
    }
    return {
      ...uniqueListing,
      createdAt: uniqueListing.createdAt.toISOString(),
      user: {
        ...uniqueListing.user,
        createdAt: uniqueListing.user.createdAt.toISOString(),
        updatedAt: uniqueListing.user.updatedAt.toISOString(),
        emailVerified: uniqueListing.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (err: any) {
    throw new Error(err);
  }
}

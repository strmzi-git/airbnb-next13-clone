import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const { location, price, ...rest } = await request.json();

  const listing = await prisma.listing.create({
    data: {
      locationValue: location.value,
      price: parseInt(price, 10),
      ...rest,
      userId: currentUser.id,
    },
  });
  console.log(listing);
  return NextResponse.json(listing);
}

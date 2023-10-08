import { NextResponse, NextRequest } from "next/server";
// import { headers } from "next/headers";
import httpServices from "@/services/http";
import { schemaReview } from "@/schemesJoi/review";

export async function POST(request: NextRequest) {
  const res = await request.json();

  const { error } = schemaReview.validate(res.data);

  if (error) {
    return new NextResponse(error.message, {
      status: 400,
    });
  }

  const newReview = await httpServices.createProductReviews(res);

  if (!newReview) {
    return new NextResponse("Error create review", {
      status: 400,
    });
  }

  return NextResponse.json(newReview);
}

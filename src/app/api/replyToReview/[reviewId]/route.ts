import { NextResponse, NextRequest } from "next/server";
import httpServices from "@/services/http";
import { schemaReplyToReview } from "@/schemesJoi/review";

export async function POST(
  request: NextRequest,
  { params }: { params: { reviewId: string } }
) {
  const res = await request.json();
  const reviewId = params.reviewId;

  const { error } = schemaReplyToReview.validate(res.data);

  if (error) {
    return new NextResponse(error.message, {
      status: 400,
    });
  }

  const newReply = await httpServices.createReplyToReviews(reviewId, res);

  if (!newReply) {
    return new NextResponse("Error create review", {
      status: 400,
    });
  }

  return NextResponse.json(newReply);
}

import { NextResponse, NextRequest } from "next/server";
import httpServices from "@/services/http";
import { schemaChangeReplyToReview } from "@/schemesJoi/review";

export async function POST(
  request: NextRequest,
  { params }: { params: { reviewId: string; replyId: string } }
) {
  const res = await request.json();
  const replyId = params.replyId;
  const reviewId = params.reviewId;
  console.log("🚀 ~ replyId:", replyId);
  console.log("🚀 ~ reviewId:", reviewId);

  const { error } = schemaChangeReplyToReview.validate(res.data);

  if (error) {
    return new NextResponse(error.message, {
      status: 400,
    });
  }

  const newReply = await httpServices.changeReplyToReview(
    reviewId,
    replyId,
    res
  );

  if (!newReply) {
    return new NextResponse("Error create review", {
      status: 400,
    });
  }

  return NextResponse.json(newReply);
}

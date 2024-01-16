import { NextResponse, NextRequest } from "next/server";
import httpServices from "@/services/http";

export async function POST(request: NextRequest) {
  const res = await request.json();

  const products = await httpServices.getProductsByList(res);

  if (!products) {
    return new NextResponse("Error create review", {
      status: 400,
    });
  }

  return NextResponse.json(products);
}

import { NextResponse, NextRequest } from "next/server";
import httpServices from "@/services/http";

export async function GET(
  request: NextRequest,
  { params }: { params: { typeMarkProduct: string } }
) {
  const typeMarkProduct = params.typeMarkProduct;

  const res = await httpServices.getMarkProductProxy(request, typeMarkProduct);

  return res;
}

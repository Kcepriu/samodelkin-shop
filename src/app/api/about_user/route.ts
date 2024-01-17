import { NextRequest } from "next/server";
import httpServices from "@/services/http";

export async function GET(request: NextRequest) {
  const res = await httpServices.getAboutUserProxy(request);

  return res;
}

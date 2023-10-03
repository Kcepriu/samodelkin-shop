import { NextResponse } from "next/server";
import { headers } from "next/headers";

const URL = "https://api.novaposhta.ua/v2.0/json/";

export async function POST() {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.NP_API_KEY || "",
    },
    body: JSON.stringify({ time: new Date().toISOString() }),
  });

  const data = await res.json();

  return NextResponse.json(data);
}

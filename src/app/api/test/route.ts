export async function POST(req: Request) {
  const formData = await req.formData();

  console.log("🚀 ~ req:", formData);
  console.log("🚀 ~ req:", req);

  // Extract the `messages` from the body of the request
  // const { messages } = await req.json();

  // console.log("Message", messages);

  return Response.json({ result: "OH" });
}

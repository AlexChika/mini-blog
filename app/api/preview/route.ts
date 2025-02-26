import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const draft = await draftMode();
  draft.enable();
  redirect("/");
}

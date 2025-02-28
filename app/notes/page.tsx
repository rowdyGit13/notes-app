import { getProfileByUserIdAction } from "@/actions/profiles-actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function NotesPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/login");
  }

  const response = await getProfileByUserIdAction(userId);

  if (!response.data) {
    return redirect("/signup");
  }
  if (response.data.membership === "free") {
    return redirect("/pricing");
  }
  return <div>Notes</div>;
}


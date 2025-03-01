import { getProfileByUserIdAction } from "@/actions/profiles-actions";
import { getNotesByUserIdAction } from "@/actions/notes-actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NotesContainer from "@/components/notes/NotesContainer";

export default async function NotesPage() {
  const { userId } = await auth();

  if (!userId) return redirect("/login");

  const { data: profile } = await getProfileByUserIdAction(userId);

  if (!profile) return redirect("/signup");
  if (profile.membership === "free") return redirect("/pricing");
  
  // Fetch all notes for the user
  const { data: notes } = await getNotesByUserIdAction(userId);

  return (
    <div className="flex h-screen">
      <NotesContainer notes={notes || []} userId={userId} />
    </div>
  );
}
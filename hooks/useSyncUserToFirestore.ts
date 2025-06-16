import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useSyncUserToFirestore() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn || !user) return;

    const sync = async () => {
      const ref = doc(db, "users", user.id);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress || "",
          name: user.fullName || "",
          createdAt: new Date().toISOString(),
        });
      }
    };
    sync();
  }, [user, isSignedIn]);
}

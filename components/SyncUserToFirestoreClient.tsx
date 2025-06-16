"use client";
import { useSyncUserToFirestore } from "@/hooks/useSyncUserToFirestore";

export default function SyncUserToFirestoreClient() {
  useSyncUserToFirestore();
  return null;
}

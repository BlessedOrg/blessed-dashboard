"use client";
import { Button } from "@/components/ui";
import Link from "next/link";

export const CreateEventButton = ({
  variant = "outline",
  label = "Create event",
  appId
}: {
  variant?: "green" | "yellow" | "outline";
  label?: string;
  appId: string;
}) => {

  return (
    <Button variant={variant} asChild>
      <Link href={`/${appId}/create-event`}>{label}</Link>
    </Button>
  );
};

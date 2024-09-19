import { Suspense } from "react";
import { EntranceForm } from "./Form";
export default function EntrancePage() {
  return (
    <Suspense>
      <EntranceForm />
    </Suspense>
  );
}

import { ProfileView } from "@/components/profile/ProfileView";
import { Navigation } from "@/components/navigation/Navigation";

export default async function ProfilePage() {
  return <div className="flex gap-2 flex-col">
    <Navigation />
    <ProfileView />
  </div>;
}
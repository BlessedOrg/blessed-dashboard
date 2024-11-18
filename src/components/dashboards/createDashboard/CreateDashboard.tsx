"use client";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./createDashboardContent/schema";
import { useEffect } from "react";
import { useUserContext } from "@/store/UserContext";
import { CreateDashboardSidebarFields } from "@/components/dashboards/createDashboard/createDashboardSidebarFields/CreateDashboardSidebarFields";
import { CreateDashboardContent } from "@/components/dashboards/createDashboard/createDashboardContent/CreateDashboardContent";
import { LoadingDashboardSkeleton } from "@/components/common/LoadingDashboardSkeleton";
import { DashboardSidebar } from "@/components/common/DashboardSidebar";

export const CreateDashboard = () => {
  const { isLoggedIn, isLoading } = useUserContext();
  const selectedCategory = useSearchParams().get("category") || "setup";
  const selectedTab = useSearchParams().get("tab") || "name-and-description";

  const form = useForm({
    resolver: zodResolver(schema)
  });
  const {
    watch,
    formState: { errors }
  } = form;

  const currentData = watch();

  useEffect(() => {
    console.log(currentData);
  }, [currentData]);

  return (
    <main className="flex xl:flex-row flex-col-reverse md:flex-col gap-6 w-full px-[1.5rem] max-w-[90rem] self-center">
      <CreateDashboardSidebarFields selectedCategory={selectedCategory} selectedTab={selectedTab} />
      {!isLoading && <CreateDashboardContent form={form} selectedTab={selectedTab} />}
      {isLoading && <LoadingDashboardSkeleton />}
      <DashboardSidebar />
    </main>
  );
};

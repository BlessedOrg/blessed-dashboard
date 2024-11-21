"use client";
import { createEventFields } from "@/components/dashboards/createEventDashboard/createOrEditEvent/createEventFields";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { CreateEventDashboard } from "@/components/dashboards/createEventDashboard/CreateEventDashboard";
import { generateEventSchema } from "@/components/dashboards/createEventDashboard/generateEventSchema";

const createEventSchema = generateEventSchema(createEventFields);

export const CreateEvent = ({ params }) => {
  const form = useForm({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      startsAt: new Date(),
      endsAt: new Date(),
      logoUrl: "/img/placeholder_image.jpeg",
      timezoneIdentifier: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
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
    <div className="flex w-full flex-col ">
      <Navigation appId={params.id} />
      <CreateEventDashboard defaultCategory="setup" form={form} defaultTab="name-and-description" createViewItems={createEventFields} appId={params.id} />
    </div>
  );
};
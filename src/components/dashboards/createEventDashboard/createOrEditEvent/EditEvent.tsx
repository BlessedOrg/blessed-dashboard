"use client";
import { generateEventSchema } from "@/components/dashboards/createEventDashboard/generateEventSchema";
import { createEventFields } from "@/components/dashboards/createEventDashboard/createOrEditEvent/createEventFields";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { CreateEventDashboard } from "@/components/dashboards/createEventDashboard/CreateEventDashboard";

const createEventSchema = generateEventSchema(createEventFields);

export const EditEvent = ({ params, eventData }) => {
  const form = useForm({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      startsAt: new Date(),
      endsAt: new Date(),
      logoUrl: "/img/placeholder_image.jpeg",
      timezoneIdentifier: Intl.DateTimeFormat().resolvedOptions().timeZone,
      ...eventData
    },
    mode: "onChange",
    criteriaMode: "all",
    shouldFocusError: true
  });
  const {
    watch,
    formState: { errors }
  } = form;

  const currentData = watch();

  useEffect(() => {
    console.log("Current data: ", currentData);
  }, [currentData]);
  return (
    <div className="flex w-full flex-col ">
      <Navigation appId={params.id} />
      <CreateEventDashboard defaultCategory="setup" form={form} defaultTab="name-and-description" createViewItems={createEventFields} eventId={params.eventId} appId={params.id} />
    </div>
  );
};
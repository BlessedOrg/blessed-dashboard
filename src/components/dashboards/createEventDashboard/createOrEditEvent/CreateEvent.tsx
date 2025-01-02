"use client";
import { CreateEventDashboard } from "@/components/dashboards/createEventDashboard/CreateEventDashboard";
import { createEventFields } from "@/components/dashboards/createEventDashboard/createOrEditEvent/createEventFields";
import { generateEventSchema } from "@/components/dashboards/createEventDashboard/generateEventSchema";
import { Navigation } from "@/components/navigation/Navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const eventFields = createEventFields(false);
const createEventSchema = generateEventSchema(eventFields);
console.log(eventFields)
export const CreateEvent = ({ params }) => {
  const form = useForm({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      startsAt: new Date(),
      endsAt: new Date(),
      logoUrl: "/img/placeholder_image.jpeg",
      timezoneIdentifier: Intl.DateTimeFormat().resolvedOptions().timeZone
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
    console.log(currentData);
  }, [currentData]);
  return (
    <div className="flex w-full flex-col ">
      <Navigation appId={params.id} />
      <CreateEventDashboard defaultCategory="setup" form={form} defaultTab="name-and-description" createViewItems={eventFields} appId={params.id} />
    </div>
  );
};
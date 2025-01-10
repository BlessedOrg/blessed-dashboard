"use client";
import { CreateEventDashboard } from "@/components/dashboards/createEventDashboard/CreateEventDashboard";
import { createEventFields } from "@/components/dashboards/createEventDashboard/createOrEditEvent/createEventFields";
import { Navigation } from "@/components/navigation/Navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { generateCreationSchema } from '../../creationView/generateCreationSchema';

const eventFields = createEventFields(true);
const createEventSchema = generateCreationSchema(eventFields);

export const EditEvent = ({ params, eventData }) => {
  const form = useForm({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      startsAt: new Date(),
      endsAt: new Date(),
      logoUrl: "/img/placeholder_image.jpeg",
      timezoneIdentifier: Intl.DateTimeFormat().resolvedOptions().timeZone,
      ...eventData,
      description: eventData?.description || "",
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
      <Navigation appId={params.id} eventId={params.eventId} />
      <CreateEventDashboard defaultCategory="setup" form={form} defaultTab="name-and-description" createViewItems={eventFields} eventId={params.eventId} appId={params.id} />
    </div>
  );
};
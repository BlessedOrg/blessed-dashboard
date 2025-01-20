"use client";
import { createEventFields } from "@/components/dashboards/createEventDashboard/createOrEditEvent/createEventFields";
import { Navigation } from "@/components/navigation/Navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dashboard } from '../../creationView/Dashboard';
import { schema } from './schema';

const eventFields = createEventFields(true);

export const EditEvent = ({ params, eventData }) => {
  const form = useForm({
    resolver: zodResolver(schema),
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
      <Dashboard defaultCategory="setup" form={form} defaultTab="name-and-description" createViewItems={eventFields} eventId={params.eventId} appId={params.id} />
    </div>
  );
};
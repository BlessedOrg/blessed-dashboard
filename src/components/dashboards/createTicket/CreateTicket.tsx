"use client";
import { Navigation } from "@/components/navigation/Navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { generateCreationSchema } from '../creationView/generateCreationSchema';
import { CreateTicketDashboard } from './CreateTicketDashboard';
import { createTicketFields } from './ticket-form-fields';

const ticketFields = createTicketFields(false);
const createTicketSchema = generateCreationSchema(ticketFields);

export const CreateTicket = ({ params }) => {
  const form = useForm({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
			name: "VIP Ticket",
      imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2940",
      initialSupply: 10,
      maxSupply: 1000,
      price: 0,
      symbol: "VIP",
      currency: "usd",
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
      <CreateTicketDashboard defaultCategory="setup" form={form} defaultTab="name-and-description" createViewItems={ticketFields} appId={params.id} eventId={params.eventId}/>
    </div>
  );
};
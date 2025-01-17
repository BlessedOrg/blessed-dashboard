"use client";
import { Navigation } from "@/components/navigation/Navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dashboard } from '../creationView/Dashboard';
import { generateCreationSchema } from '../creationView/generateCreationSchema';
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
      price: 1,
      symbol: "VIP",
      currency: "usd",
      paymentMethods: ["FIAT", "CRYPTO"],
			stakeholders: []
    },
    mode: "onChange",
    criteriaMode: "all",
    shouldFocusError: true
  });

	console.log(form.getValues())

  return (
    <div className="flex w-full flex-col ">
      <Navigation appId={params.id} eventId={params.eventId} />
      <Dashboard defaultCategory="setup" form={form} defaultTab="name-and-description" createViewItems={ticketFields} appId={params.id} eventId={params.eventId}/>
    </div>
  );
};
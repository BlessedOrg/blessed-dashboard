"use client";
import { Navigation } from "@/components/navigation/Navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { Dashboard } from '../creationView/Dashboard';
import { createTicketFields } from './ticket-form-fields';

const ticketFields = createTicketFields(false);

const schema = z.object({
	name: z.string().min(4, "Name must be at least 4 characters"),
	description: z.string().optional(),
	symbol: z.string().min(2, "Symbol must be at least 2 characters"),
	initialSupply: z.number().min(1, "Initial supply must be at least 1"),
	maxSupply: z.number().min(1, "Maximum supply must be at least 1"),
	price: z.number().min(0.01, "Price must be at least 0.01"),
	currency: z.string(),
	paymentMethods: z.array(z.string()).min(1, "At least one payment method must be selected"),
	stakeholders: z.array(z.object({
    feePercentage: z.number(),
    email: z.string(),
    paymentMethods: z.array(z.string()).optional()
  })).optional()
})
export const CreateTicket = ({ params }) => {
  const form = useForm({
    resolver: zodResolver(schema),
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
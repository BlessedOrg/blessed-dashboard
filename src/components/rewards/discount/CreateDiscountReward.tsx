"use client";
import { Navigation } from "@/components/navigation/Navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Dashboard } from '../../dashboards/creationView/Dashboard';
import { createDiscountFields } from './createDiscountFields';

const MAX_NAME_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 300;

const formSchema = z.object({
  name: z.string()
    .min(1, "Reward name is required")
    .max(MAX_NAME_LENGTH, `Name cannot exceed ${MAX_NAME_LENGTH} characters`),
  description: z.string()
    .min(1, "Description is required")
    .max(MAX_DESCRIPTION_LENGTH, `Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters`),
		percentage: z.number().min(0, "Discount value must be positive").max(100, "Discount value must be less than 100"),
		minOrderValue: z.number().optional(),
		prefix: z.string().optional(),
		logoUrl: z.string().optional(),
		locationLatitude: z.string().optional(),
		locationLongitude: z.string().optional(),
		locationUrl: z.string().optional(),
		validFrom: z.date(),
		validTo: z.date(),
		discountCode: z.string().optional(),
		isTemplate: z.boolean(),
		isVoucher: z.boolean(),
		reusable: z.boolean(),
		uniqueDiscountCodes: z.boolean(),
});

export const CreateDiscountReward = ({ params }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
			percentage: "20",
      validFrom: new Date(),
      validTo: new Date(),
      logoUrl: "https://blessed-images.s3.eu-central-1.amazonaws.com/events/1736959429734/1/discount.svg",
			name: "Reward Name",
			description: "Enjoy 20% off on all purchases this summer! Valid online and in-store.",
			category: "food",
			discountCode: "SUMMER20",
			minOrderValue: "1",
			locationUrl: "https://www.google.com",
			reusable: false,
			isVoucher: false,
			isTemplate: true,
			uniqueDiscountCodes: false
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
      <Dashboard defaultCategory="setup" form={form} defaultTab="name-and-description" createViewItems={createDiscountFields} appId={params.id} />
    </div>
  );
};
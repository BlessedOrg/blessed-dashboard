import { z } from "zod";

export const schema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  description: z.string().optional(),
  startsAt: z.date(),
  endsAt: z.date(),
  timezoneIdentifier: z.string().optional(),
  eventLocation: z.object({
    country: z.string(),
    city: z.string(),
    postalCode: z.string().optional(),
    street1stLine: z.string().optional(),
    street2ndLine: z.string().optional(),
    locationDetails: z.string().optional(),
    countryCode: z.string().optional(),
    stateCode: z.string().optional(),
    continent: z.string().optional(),
    countryFlag: z.string().optional(),
    countryLatitude: z.string().optional(),
    countryLongitude: z.string().optional(),
    cityLatitude: z.string().optional(),
    cityLongitude: z.string().optional(),
  }),
  logoUrl: z.string().optional(),
  stakeholders: z
    .array(
      z.object({
        feePercentage: z.number(),
        email: z.string(),
        paymentMethods: z.array(z.string()).optional(),
      })
    )
    .optional(),
});

import { DateRangeAndVenue } from "@/components/dashboards/createEventDashboard/views/DateRangeAndVenue";
import { EventPreview } from "@/components/dashboards/createEventDashboard/views/EventPreview";
import { NameAndDescriptionCard } from "@/components/dashboards/createEventDashboard/views/NameAndDescriptionCard";
import { RevenueDistributionView } from "@/components/revenue/RevenueDistributionView";

export const createEventFields = (isEditView: boolean) =>
  [
    {
      id: "setup",
      name: "Set up",
      description: "Get everything in place to kick things off.",
      icon: "/img/icons/heart.svg",
      tabs: [
        {
          name: "Name and description",
          href: "name-and-description",
          primary: true,
          customFieldComponents: [NameAndDescriptionCard],
          schemaFields: [
            { id: "name", type: "text", required: true },
            { id: "description", type: "text" },
          ],
          fields: [],
        },
        {
          name: "Date, time and venue",
          href: "date-and-time",
          customFieldComponents: [DateRangeAndVenue],
          fields: [],
          schemaFields: [
            { id: "timezoneIdentifier", type: "text" },
            { id: "startsAt", type: "date", defaultValue: new Date() },
            { id: "endsAt", defaultValue: new Date(), type: "date" },
            {
              id: "eventLocation",
              type: "object",
              fields: [
                { id: "country", type: "text", required: true },
                { id: "city", type: "text", required: true },
                { id: "postalCode", type: "text", required: false },
                { id: "street1stLine", type: "text", required: false },
                { id: "street2ndLine", type: "text", required: false },
                { id: "locationDetails", type: "text", required: false },
                { id: "countryCode", type: "text", required: false },
                { id: "stateCode", type: "text", required: false },
                { id: "continent", type: "text", required: false },
                { id: "countryFlag", type: "text", required: false },
                { id: "countryLatitude", type: "text", required: false },
                { id: "countryLongitude", type: "text", required: false },
                { id: "cityLatitude", type: "text", required: false },
                { id: "cityLongitude", type: "text", required: false },
              ],
            },
          ],
        },
      ],
    },
    isEditView
      ? null
      : {
          id: "revenue-distribution",
          name: "Revenue Distribution",
          description: "Manage revenue sharing and distributions among team members",
          icon: "/img/icons/cake.svg",
          tabs: [
            {
              name: "Revenue Distribution",
              href: "revenue-distribution",
              customFieldComponents: [RevenueDistributionView],
              schemaFields: [
                {
									id: "stakeholders",
									type: "array",
									fields: [
										{ id: "walletAddress", type: "text", required: true },
										{ id: "feePercentage", type: "number", required: true },
										{ id: "email", type: "text", required: true }
									],
								},
              ],
              fields: [],
              primary: true,
            },
          ],
        },
    {
      id: "publish",
      name: "Publish",
      description: "Publish and go live ASAP",
      icon: "/img/icons/rocket.svg",
      tabs: [
        {
          name: "Preview",
          href: "preview",
          primary: true,
          customFieldComponents: [EventPreview],
          fields: [],
        },
      ],
    },
  ].filter((i) => i !== null);

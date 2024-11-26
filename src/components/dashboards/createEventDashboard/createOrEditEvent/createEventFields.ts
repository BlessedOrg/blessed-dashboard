import { NameAndDescriptionCard } from "@/components/dashboards/createEventDashboard/views/NameAndDescriptionCard";
import { DateRangeAndVenue } from "@/components/dashboards/createEventDashboard/views/DateRangeAndVenue";
import { EventPreview } from "@/components/dashboards/createEventDashboard/views/EventPreview";

export const createEventFields = [
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
        schemaFields: [{ id: "name", type: "text", required: true }, { id: "description", type: "text" }],
        fields: []
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
            id: "eventLocation", type: "object", fields: [
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
              { id: "cityLongitude", type: "text", required: false }
            ]
          }]
      }
    ]
  },
  // {
  //   id: "customize",
  //   name: "Customize",
  //   description: "Fine-tune to your liking easily as a piece of cake",
  //   icon: "/img/icons/cake.svg",
  //   tabs: [
  //     {
  //       name: "Ticket design",
  //       href: "ticket-design",
  //       fields: [],
  //       primary: true
  //     },
  //     {
  //       name: "Payment methods",
  //       href: "payment-methods",
  //       fields: []
  //     },
  //     {
  //       name: "Discounts and promo codes",
  //       href: "discounts-and-promo-codes",
  //       fields: []
  //     }
  //   ]
  // },
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
        fields: []
      }
    ]
  }
];

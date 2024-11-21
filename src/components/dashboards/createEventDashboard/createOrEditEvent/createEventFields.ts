import { NameAndDescriptionCard } from "@/components/cards/NameAndDescriptionCard";
import { DateRangeAndVenue } from "@/components/dashboards/createEventDashboard/views/DateRangeAndVenue";
import { addressSchema } from "@/components/dashboards/createEventDashboard/views/addressForm/addressSchema";
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
        externalSchema: [addressSchema],
        schemaFields: [{ id: "timezoneIdentifier", type: "text" }, { id: "startsAt", type: "date", defaultValue: new Date() }, { id: "endsAt", defaultValue: new Date(), type: "date" }]
      },
      {
        name: "Ticket type",
        href: "ticket-type",
        fields: [
          {
            id: "type",
            name: "Ticket type",
            type: "select"
          }
        ]
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
      // {
      //   name: "Publish date",
      //   href: "publish-date",
      //   fields: [],
      //   primary: true
      // },
      // {
      //   name: "API Endpoints",
      //   href: "api-endpoints",
      //   fields: []
      // },
      {
        name: "Preview",
        href: "preview",
        primary: true,
        customFieldComponents: [EventPreview],
        fields: []
      }
      // {
      //   name: "Distribution channels",
      //   href: "distribution-channels",
      //   fields: []
      // }
    ]
  }
];

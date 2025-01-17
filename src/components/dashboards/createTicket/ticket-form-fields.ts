import { RevenueDistributionView } from "@/components/revenue/RevenueDistributionView";
import { CreateTicketCTA } from "./customFormFields/CreateTicketCTA";
import { TicketCapacity } from "./customFormFields/TicketCapacity";
import { TicketInfo } from "./customFormFields/TicketInfo";
import { TicketPaymentMethods } from "./customFormFields/TicketPaymentMethods";
import { TicketPrice } from "./customFormFields/TicketPrice";
import { TicketRewards } from './customFormFields/TicketRewards';

export const createTicketFields = (isEditView: boolean) =>
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
          customFieldComponents: [TicketInfo],
          schemaFields: [
            { id: "name", type: "text", required: true },
            { id: "description", type: "text" },
            { id: "symbol", type: "text", required: true },
          ],
          fields: [],
        },
        {
          name: "Capacity",
          href: "capacity",
          customFieldComponents: [TicketCapacity],
          fields: [],
          schemaFields: [
            { id: "initialSupply", type: "number", required: true, name: "Initial Capacity" },
            { id: "maxSupply", type: "number", required: true, name: "Maximum Capacity" },
          ],
        },
        {
          name: "Price",
          href: "price",
          customFieldComponents: [TicketPrice],
          fields: [],
          schemaFields: [
            {
              id: "price",
              type: "number",
              required: true,
            },
          ],
        },
        {
          name: "Payment methods",
          href: "payment-methods",
          customFieldComponents: [TicketPaymentMethods],
          fields: [],
          schemaFields: [
            {
              id: "paymentMethods",
              type: "array",
              fields: ["FIAT", "CRYPTO"],
            },
          ],
        },
      ],
    },
    {
      id: "customize",
      name: "Customize",
      description: "Fine-tune to your liking easily as a piece of cake.",
      icon: "/img/icons/cake.svg",
      tabs: [
        (isEditView ? null : {
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
                { id: "email", type: "text", required: true },
              ],
            },
          ],
          fields: [],
          primary: true,
        }),
        {
          name: "Ticket rewards",
          href: "ticket-rewards",
          customFieldComponents: [TicketRewards],
          fields: [],
          schemaFields: [],
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
          customFieldComponents: [CreateTicketCTA],
          fields: [],
        },
      ],
    },
  ].filter((i) => i !== null);

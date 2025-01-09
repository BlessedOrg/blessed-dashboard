import { PromotionsView } from "@/components/promotions/PromotionsView";
import { RevenueDistributionView } from "@/components/revenue/RevenueDistributionView";
import { CreateTicketCTA } from "./customFormFields/CreateTicketCTA";
import { TicketCapacity } from "./customFormFields/TicketCapacity";
import { TicketInfo } from "./customFormFields/TicketInfo";
import { TicketPaymentMethods } from "./customFormFields/TicketPaymentMethods";
import { TicketPrice } from "./customFormFields/TicketPrice";

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
        {
          name: "Discounts and promo codes",
          href: "discounts-and-promo-codes",
          customFieldComponents: [PromotionsView],
          fields: [],
          schemaFields: [],
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
                    { id: "email", type: "text", required: true },
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
          customFieldComponents: [CreateTicketCTA],
          fields: [],
        },
      ],
    },
  ].filter((i) => i !== null);

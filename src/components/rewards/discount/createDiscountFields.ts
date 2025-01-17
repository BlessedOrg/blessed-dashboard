import { BasicInfoCard } from "./cards/BasicInfoCard";
import { DiscountCodesCard } from "./cards/DiscountCodesCard";
import { DiscountDetailsCard } from "./cards/DiscountDetailsCard";
import { LogoCard } from "./cards/LogoCard";
import { PreviewDiscountCard } from './cards/PreviewDiscountCard';
import { RedemptionLocationCard } from "./cards/RedemptionLocationCard";
import { ValidityPeriodCard } from "./cards/ValidityPeriodCard";

export const createDiscountFields = 
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
          customFieldComponents: [BasicInfoCard],
        },
        // {
        //   name: "Category",
        //   href: "category",
        //   customFieldComponents: [CategoryCard],
        // },
        {
          name: "Image",
          href: "image",
          customFieldComponents: [LogoCard],
        },
      ],
    },
    {
      id: "customize",
      name: "Customize",
      description: "Fine-tune to your liking easily as a piece of cake.",
      icon: "/img/icons/cake.svg",
      tabs: [
        {
          name: "Discount details",
          href: "discount-details",
          customFieldComponents: [DiscountDetailsCard],
          primary: true,
        },
        {
          name: "Validity period",
          href: "validity-period",
          customFieldComponents: [ValidityPeriodCard],
        },
        {
          name: "Redemption location",
          href: "redemption-location",
          customFieldComponents: [RedemptionLocationCard],
        },
        {
          name: "Discount codes",
          href: "discount-codes",
          customFieldComponents: [DiscountCodesCard],
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
          customFieldComponents: [PreviewDiscountCard],
        },
      ],
    },
  ].filter((i) => i !== null);

import { BasicInfoCard } from "../discount/cards/BasicInfoCard";
import { LogoCard } from "../discount/cards/LogoCard";
import { RedemptionLocationCard } from "../discount/cards/RedemptionLocationCard";
import { ValidityPeriodCard } from "../discount/cards/ValidityPeriodCard";
import { PreviewVoucherCard } from './cards/PreviewVoucherCard';
import { VoucherValueCard } from './cards/VoucherValueCard';

export const createVoucherFields = 
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
          name: "Voucher details",
          href: "voucher-details",
          customFieldComponents: [VoucherValueCard],
          primary: true,
        },
        {
          name: "Redemption location",
          href: "redemption-location",
          customFieldComponents: [RedemptionLocationCard],
        },
				{
          name: "Validity period",
          href: "validity-period",
          customFieldComponents: [ValidityPeriodCard],
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
          customFieldComponents: [PreviewVoucherCard],
        },
      ],
    },
  ].filter((i) => i !== null);

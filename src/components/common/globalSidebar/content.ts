interface IContent {
  title: string;
  sections: {
    title: string;
    items: {
      step: number;
      title: string;
      description: string;
    }[];
  }[];
  footer?: string;
}

const commonContentItems = {
  "event-preview-and-create": {
    title: "Add Date, Location, and Venue",
    sections: [
      {
        title: "Provide the essential details for your attendees:",
        items: [
          {
            step: 1,
            title: "Date",
            description: "Specify when your event is happening.",
          },
          {
            step: 2,
            title: "Location",
            description: "Add the exact address or online meeting link.",
          },
          {
            step: 3,
            title: "Venue Information",
            description: "Include any details about the venue, such as access points or special features.",
          },
          {
            step: 4,
            title: "Revenue Distribution",
            description: "Add any stakeholder that gets their percentage of the revenue based on the PoS.",
          },
        ],
      },
    ],
    footer: "These details are key for your attendees, showing them exactly where and when to join your event!",
  },
  "event-publish-preview": {
    title: "This screen displays all your event details",
    sections: [
      {
        title: "",
        items: [
          {
            step: 1,
            title: "Check Your Entries",
            description: "Ensure everything, including the name, description, date, location, and cover image, is accurate.",
          },
          {
            step: 2,
            title: "Edit or Publish",
            description: "Make any last changes or press Publish to finalize your event setup.",
          },
        ],
      },
    ],
    footer: "You’re now ready to move forward with your event journey!",
  },
  "event-create-edit-location": {
    title: "Add Date, Location, and Venue",
    sections: [
      {
        title: "Provide the essential details for your attendees:",
        items: [
          {
            step: 1,
            title: "Date",
            description: "Specify when your event is happening.",
          },
          {
            step: 2,
            title: "Location",
            description: "Add the exact address or online meeting link.",
          },
          {
            step: 3,
            title: "Venue Information",
            description: "Include any details about the venue, such as access points or special features.",
          },
        ],
      },
    ],
    footer: "These details are key for your attendees, showing them exactly where and when to join your event!",
  },
	"app-overview-and-events": {
		title: "Create Your Event",
		sections: [
			{
				title: "Set up your event with all the essential details:",
				items: [
					{
						step: 1,
						title: "Title",
						description: "Name your event to grab attention.",
					},
					{
						step: 2,
						title: "Description",
						description: "Highlight what makes it unique.",
					},
					{
						step: 3,
						title: "View",
						description: "Customize how attendees see it.",
					},
					{
						step: 4,
						title: "Location and Date",
						description: "Specify where and when it happens.",
					},
				],
			},
		],
		footer: "Ensure these details shine to make your event stand out!",
	}
} as Record<string, IContent>;


export const contentPerParams = (appSlug: string, eventSlug: string) =>
  ({
    [`/${appSlug}/${eventSlug}/edit?category=setup&tab=date-and-time`]: commonContentItems["event-create-edit-location"],
    [`/${appSlug}/create-event?category=setup&tab=date-and-time`]: commonContentItems["event-create-edit-location"],
    [`/${appSlug}/${eventSlug}/edit?category=publish&tab=preview`]: commonContentItems["event-publish-preview"],
    [`/${appSlug}/create-event?category=publish&tab=preview`]: commonContentItems["event-publish-preview"],
		[`/${appSlug}/${eventSlug}?tab=event-management`]: {
			title: "Entrance Management: Add or Manage Check-In Personnel",
			sections: [
				{
					title: "Assign and manage access for your event seamlessly:",
					items: [
						{
							step: 1,
							title: "Personnel Email",
							description: "Enter the email address of the person responsible for scanning tickets.",
						},
						{
							step: 2,
							title: "Dynamic QR Code Scanning",
							description: "Check-in personnel will use a dynamic QR code to verify and allow attendee entry.",
						},
						{
							step: 3,
							title: "Deactivate Personnel",
							description: "If needed, you can deactivate personnel to revoke their access and assign a new team member.",
						},
					]
				}
			],
			footer: "This ensures secure, flexible, and efficient check-in management for your event!",
		},
		[`/${appSlug}?tab=api-key`]: {
			title: "API Keys",
			sections: [
				{
					title: "Manage your API keys to integrate your customized event setups and offers into your websites or apps:",
					items: [
						{
							step: 1,
							title: "API Key Name",
							description: "Label your API key for easy identification.",
						},
						{
							step: 2,
							title: "Key Details",
							description: "View and manage the key for seamless integration.",
						},
						{
							step: 3,
							title: "Usage Overview",
							description: "Track how the API is being utilized within your platforms.",
						},
						{
							step: 4,
							title: "Cost & Usage",
							description: "(Optional) Access a simple dashboard to monitor costs and usage associated with the API.",
						},
					]
				}
			],
			footer: "Empower your apps and websites with tailored integrations while staying in control of API consumption!",
		},
		[`/${appSlug}?tab=events`]: commonContentItems["app-overview-and-events"],
		[`/${appSlug}?tab=overview`]: commonContentItems["app-overview-and-events"],
		[`/${appSlug}`]: commonContentItems["app-overview-and-events"],

  } as Record<string, IContent>);

export const contentPerPageItems = (appSlug: string, eventSlug: string) => {
  return {
    [`/`]: {
      title: "Create Your App",
      sections: [
        {
          title: "Start building your app with the essential setup",
          items: [
            {
              step: 1,
              title: "App Name",
              description: "Give your app a catchy name that represents your brand.",
            },
            {
              step: 2,
              title: "Description",
              description: "Briefly explain what your app does and its purpose.",
            },
            {
              step: 3,
              title: "Customize",
              description: "Start then customizing your event & tickets",
            },
            {
              step: 4,
              title: "Integrate",
              description: "Add ticket sales to your app connects to your website or other platforms.",
            },
          ],
        },
      ],
      footer: "Make your app ready to shine and seamlessly integrate it into your ecosystem via our API!",
    },
		[`/${appSlug}/${eventSlug}/create-ticket`]: {
			title: "Create Tickets",
			sections: [
				{
					title: "Set up tickets for your event by providing the following details:",
					items: [
						{
							step: 1,
							title: "Ticket Name",
							description: "Give your ticket a clear, engaging name.",
						},
						{
							step: 2,
							title: "Symbol",
							description: "Add a unique symbol to identify the ticket.",
						},
						{
							step: 3,
							title: "Brief Description",
							description: "Highlight what this ticket includes or any unique perks.",
						},
						{
							step: 4,
							title: "Image",
							description: "Select from Unsplash or upload a JPG, PNG, or GIF (max 5MB). The ideal dimensions will be specified for seamless display.",
						},
						{
							step: 5,
							title: "Initial and Max Capacity",
							description: "Define how many tickets will be available initially and the maximum number that can be sold.",
						},
						{
							step: 6,
							title: "Price",
							description: "Set the cost for each ticket type.",
						},
					]
				}
			],
			footer: "Additionally, create Ticket Types with varying perks to enhance the attendee experience, such as exclusive access, VIP benefits, or bundled offers.",
		},
    [`/${appSlug}/create-event`]: commonContentItems["event-preview-and-create"],
    [`/${appSlug}/${eventSlug}`]: {
      title: "Event Overview",
      sections: [
        {
          title: "Manage your published event with ease:",
          items: [
            {
              step: 1,
              title: "Event Details",
              description: "View all key information about your event, including name, description, date, location, and tickets.",
            },
            {
              step: 2,
              title: "Tickets",
              description: "Create and manage various ticket types tailored for your event.",
            },
            {
              step: 3,
              title: "Entrance Management",
              description: "Set up and manage emails for entrance check-in personnel to ensure smooth attendee access.",
            },
          ],
        },
      ],
      footer: "This overview provides quick access to all essential settings, making event management seamless and efficient!",
    },
    [`/${appSlug}/${eventSlug}/tickets`]: {
      title: "Tickets",
      sections: [
        {
          title: "Create and manage your event tickets:",
          items: [
            {
              step: 1,
              title: "Ticket Name",
              description: "Give your ticket a catchy name that represents your brand.",
            },
            {
              step: 2,
              title: "Ticket Price",
              description: "Set the price for your ticket.",
            },
            {
              step: 3,
              title: "Ticket Capacity",
              description: "Set the maximum number of tickets that can be sold.",
            },
            {
              step: 4,
              title: "Ticket Availability",
              description: "Set the availability of the ticket.",
            },
          ],
        },
      ],
    },
    [`/${appSlug}/${eventSlug}/edit`]: commonContentItems["event-preview-and-create"],
		[`/${appSlug}/${eventSlug}/tickets`]: {
			title: "Ticket Overview",
			sections: [
				{
					title: "Manage and distribute tickets effortlessly:",
					items: [
						{
							step: 1,
							title: "View Tickets",
							description: "See a complete list of all tickets created for your event.",
						},
						{
							step: 2,
							title: "Send Tickets",
							description: "Use the action menu (three dots) on the upper-right corner of a ticket tile to send tickets for free to specific users via email or wallet address.",
						},
					]
				}
			],
			footer: "This overview provides all the tools you need to manage and share tickets with precision!",
		},
		[`/${appSlug}/campaigns`]: {
			title: "Create Campaigns",
			sections: [
				{
					title: "Set up campaigns to reward your audience with free tickets or other exciting perks:",
					items: [
						{
							step: 1,
							title: "Campaign Name",
							description: "Choose a name that reflects your campaign's purpose.",
						},
						{
							step: 2,
							title: "Perks",
							description: "Define the free tickets or (later) additional rewards you'd like to distribute.",
						},
						{
							step: 3,
							title: "Audience Group",
							description: "Select the eligible group of users from your predefined audience.",
						},
					]
				}
			],
			footer: "Create campaigns effortlessly and share the perks your audience loves!",
		},
		[`/${appSlug}/audience`]: {
			title: "Define Audiences",
			sections: [
				{
					title: "Build and manage targeted audience groups to make your campaigns more impactful:",
					items: [
						{
							step: 1,
							title: "Audience Name",
							description: "Name your group to easily identify it later and to mix audience groups.",
						},
						{
							step: 2,
							title: "Eligibility Criteria",
							description: "Specify who qualifies—ticket buyers, verified event visitors, or other audience proofs.",
						},
						{
							step: 3,
							title: "Proofs",
							description: "Use verifiable data to define group membership, with more proof types coming soon.",
						},
					]
				}
			],
			footer: "Create detailed and dynamic audience groups to deliver personalized perks and build engaging campaigns!",
		}
  } as Record<string, IContent>;
};

export const mockEvents: IEvent[] = [
  {
    id: "1",
    name: "Tech Conference 2024",
    slug: "tech-conference-2024",
    appId: "app1",
    description: "Join us for the biggest tech conference of the year",
    logoUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
    Tickets: [
      {
        id: "t1",
        name: "VIP Pass",
        slug: "vip-pass",
        address: "0x123",
        price: 499.99,
        ticketSupply: 100,
        maxSupply: 200,
        ticketOwners: [],
        createdAt: new Date("2024-01-15"),
        metadataPayload: {
          name: "VIP Pass",
          symbol: "VIP",
          description: "Full access to all conference areas",
          metadataImageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
        }
      },
      {
        id: "t2",
        name: "Early Bird",
        slug: "early-bird",
        address: "0x456",
        price: 199.99,
        ticketSupply: 200,
        maxSupply: 500,
        ticketOwners: [],
        createdAt: new Date("2024-01-16"),
        metadataPayload: {
          name: "Early Bird",
          symbol: "EB",
          description: "Standard conference access",
          metadataImageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678"
        }
      }
    ],
    startsAt: new Date("2024-06-15"),
    endsAt: new Date("2024-06-17"),
    EventLocation: {
      city: "San Francisco",
      country: "United States",
      countryCode: "US",
      street1stLine: "123 Tech Avenue",
      postalCode: "94105"
    },
    timezoneIdentifier: "America/Los_Angeles",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "2",
    name: "Blockchain Summit 2024",
    slug: "blockchain-summit-2024",
    appId: "app1",
    description: "Explore the future of blockchain technology",
    logoUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a",
    Tickets: [
      {
        id: "t3",
        name: "Premium Access",
        slug: "premium-access",
        address: "0x789",
        price: 799.99,
        ticketSupply: 50,
        maxSupply: 100,
        ticketOwners: [],
        createdAt: new Date("2024-01-17"),
        metadataPayload: {
          name: "Premium Access",
          symbol: "PREM",
          description: "Premium access with exclusive workshops",
          metadataImageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a"
        }
      },
      {
        id: "t4",
        name: "Standard Pass",
        slug: "standard-pass",
        address: "0xabc",
        price: 299.99,
        ticketSupply: 150,
        maxSupply: 300,
        ticketOwners: [],
        createdAt: new Date("2024-01-18"),
        metadataPayload: {
          name: "Standard Pass",
          symbol: "STD",
          description: "Standard summit access",
          metadataImageUrl: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28"
        }
      }
    ],
    startsAt: new Date("2024-07-20"),
    endsAt: new Date("2024-07-22"),
    EventLocation: {
      city: "London",
      country: "United Kingdom",
      countryCode: "GB",
      street1stLine: "456 Blockchain Street",
      postalCode: "EC1A 1BB"
    },
    timezoneIdentifier: "Europe/London",
    createdAt: new Date("2024-01-02")
  },
  {
    id: "3",
    name: "AI and Machine Learning Expo",
    slug: "ai-ml-expo-2024",
    appId: "app2",
    description: "Cutting-edge insights into artificial intelligence and machine learning",
    logoUrl: "https://images.unsplash.com/photo-1485827404861-85b9015b4872",
    Tickets: [
      {
        id: "t5",
        name: "Research Platinum",
        slug: "research-platinum",
        address: "0xdef",
        price: 1299.99,
        ticketSupply: 25,
        maxSupply: 50,
        ticketOwners: [],
        createdAt: new Date("2024-02-01"),
        metadataPayload: {
          name: "Research Platinum",
          symbol: "RSRCH",
          description: "Exclusive access for researchers and industry leaders",
          metadataImageUrl: "https://images.unsplash.com/photo-1529400971008-f566b0d52244"
        }
      },
      {
        id: "t6",
        name: "Developer Pass",
        slug: "developer-pass",
        address: "0x135",
        price: 399.99,
        ticketSupply: 200,
        maxSupply: 400,
        ticketOwners: [],
        createdAt: new Date("2024-02-02"),
        metadataPayload: {
          name: "Developer Pass",
          symbol: "DEV",
          description: "Technical deep-dive and workshop access",
          metadataImageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
        }
      }
    ],
    startsAt: new Date("2024-09-10"),
    endsAt: new Date("2024-09-12"),
    EventLocation: {
      city: "Berlin",
      country: "Germany",
      countryCode: "DE",
      street1stLine: "789 Innovation Plaza",
      postalCode: "10115"
    },
    timezoneIdentifier: "Europe/Berlin",
    createdAt: new Date("2024-01-15")
  },
  {
    id: "4",
    name: "Sustainable Innovation Forum",
    slug: "sustainable-innovation-2024",
    appId: "app3",
    description: "Global summit on sustainable technologies and environmental innovations",
    logoUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
    Tickets: [
      {
        id: "t7",
        name: "Green Leadership",
        slug: "green-leadership",
        address: "0x246",
        price: 899.99,
        ticketSupply: 75,
        maxSupply: 150,
        ticketOwners: [],
        createdAt: new Date("2024-02-15"),
        metadataPayload: {
          name: "Green Leadership",
          symbol: "GREEN",
          description: "Executive and policy maker access",
          metadataImageUrl: "https://images.unsplash.com/photo-1581594549595-d204eedcb40f"
        }
      },
      {
        id: "t8",
        name: "Innovator Track",
        slug: "innovator-track",
        address: "0x357",
        price: 349.99,
        ticketSupply: 150,
        maxSupply: 300,
        ticketOwners: [],
        createdAt: new Date("2024-02-16"),
        metadataPayload: {
          name: "Innovator Track",
          symbol: "INNOV",
          description: "Startup and innovation focused ticket",
          metadataImageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
        }
      }
    ],
    startsAt: new Date("2024-10-05"),
    endsAt: new Date("2024-10-07"),
    EventLocation: {
      city: "Copenhagen",
      country: "Denmark",
      countryCode: "DK",
      street1stLine: "321 Green Innovation Way",
      postalCode: "1050"
    },
    timezoneIdentifier: "Europe/Copenhagen",
    createdAt: new Date("2024-01-20")
  }
];
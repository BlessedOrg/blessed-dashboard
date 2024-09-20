export {};
declare global {
  interface IAppData {
    id: string;
    name: string;
    description: string;
    imageUrl: string | null;
    developerId: string;
    createdAt: string;
    updatedAt: string;
  }
}

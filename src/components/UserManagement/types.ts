export type Role =
  | "Pricing executive"
  | "Booking executive"
  | "Booking senior executive";

export type Status = "Active" | "Inactive";

export default interface User {
  id: number;
  image: string;
  name: string;
  dateAdded: string;
  role: Role;
  lastActive: string;
  status: Status;
}

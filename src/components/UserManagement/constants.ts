import * as yup from "yup";

import type User from "./types";
import type { DefaultValues, Role, Status } from "./types";

export const ROLES: Role[] = [
  "Booking executive",
  "Booking senior executive",
  "Pricing executive",
];

export const defaultValues: DefaultValues = {
  avatar: "",
  firstName: "",
  lastName: "",
  email: "",
  role: "Booking executive",
  status: "Active",
};

// Made required so I can add the new user to the table
export const schema = yup.object().shape({
  avatar: yup.string().required(),
  firstName: yup.string().min(1).required(),
  lastName: yup.string().min(1).required(),
  email: yup.string().email().required(),
  role: yup
    .string()
    .oneOf<Role>([
      "Booking executive",
      "Booking senior executive",
      "Pricing executive",
    ])
    .required(),
  status: yup.string().oneOf<Status>(["Active", "Inactive"]).required(),
});

export const STATUSES: ("Active" | "Inactive")[] = ["Active", "Inactive"];

export const USER_DATA: User[] = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "John Smith",
    email: "jenny.smith@gmail.com",
    dateAdded: "6th April, 2022",
    role: "Booking executive",
    lastActive: "10th April, 2022 4:35PM",
    status: "Active",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Jenny Smith",
    email: "jenny.smith@gmail.com",
    dateAdded: "6th April, 2022",
    role: "Pricing executive",
    lastActive: "6th April, 2022 4:00PM",
    status: "Active",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Jenny Doe",
    email: "jenny.smith@gmail.com",
    dateAdded: "8th September, 2022",
    role: "Booking senior executive",
    lastActive: "8th September, 2022 11:15AM",
    status: "Active",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Alex Doe",
    email: "jenny.smith@gmail.com",
    dateAdded: "10th June, 2022",
    role: "Pricing executive",
    lastActive: "10th June, 2022 10:30AM",
    status: "Active",
  },
];

export const STATUS_ICON: Record<User["status"], string> = {
  Active: "checkmark",
  Inactive: "minus-outline",
};

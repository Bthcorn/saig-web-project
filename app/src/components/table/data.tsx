import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { CircleIcon } from "lucide-react";

export const statuses = [
  {
    value: "AVAILABLE",
    label: "Available",
    icon: CheckCircledIcon,
  },
  {
    value: "UNAVAILABLE",
    label: "Unavailable",
    icon: CrossCircledIcon,
  },
];

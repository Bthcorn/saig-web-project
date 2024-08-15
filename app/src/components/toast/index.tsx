import React from "react";
import { toast } from "@/components/ui/use-toast";
import { ToastProps } from "../ui/toast";

export function handleResponse(
  title: string,
  message: string,
  variant: ToastProps["variant"],
) {
  toast({
    title: title,
    description: message,
    variant: variant,
  });
}

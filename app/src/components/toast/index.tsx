import React from "react";
import { toast } from "@/components/ui/use-toast";
import { ToastProps } from "../ui/toast";

export function handleResponse(
  response: any,
  message: string,
  variant: ToastProps["variant"],
) {
  toast({
    title: response.data.message + "!",
    description: (
      <pre className="mt-2 rounded-md bg-secondary p-4">
        <code className="text-black">
          {JSON.stringify(response.data.result, null, 2)}
        </code>
      </pre>
    ),
    variant: variant,
  });
}

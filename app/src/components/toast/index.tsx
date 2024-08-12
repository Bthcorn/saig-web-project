import React from "react";
import { useToast, toast } from "@/components/ui/use-toast";
import { ToastClose } from "../ui/toast";

export function ToastDemo({ response }: { response: any }) {
  const { toast } = useToast();
  return toast({
    title: response.data.message,
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">
          {JSON.stringify(response.data.result, null, 2)}
        </code>
      </pre>
    ),
    action: <ToastClose />,
  });
}

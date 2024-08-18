import { Navigate, Outlet } from "react-router-dom";
import { decodeJwt } from "jose";
import { toast } from "@/components/ui/use-toast";

export const ProtectedAdminRoute = () => {
  const token = localStorage.getItem("token");

  if (token) {
    const decoded = decodeJwt(token);
    if (decoded.role === "ADMIN") {
      return <Outlet />;
    } else {
      toast({
        title: "Unauthorized",
        description: "You are not authorized to view this page",
        variant: "destructive",
      });
      return <Navigate to="/" />;
    }
  }
  return <Navigate to="/" />;
};

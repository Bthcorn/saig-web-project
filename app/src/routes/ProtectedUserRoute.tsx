import { Navigate, Outlet } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

export const ProtectedUserRoute = () => {
  // const { token } = useAuth();
  const token = localStorage.getItem("token");

  if (token) {
    // const decoded = decodeJwt(token);
    if (token) {
      return <Outlet />;
    } else {
      toast({
        title: "Unauthorized",
        description: "You are not authorized to view this page",
        variant: "destructive",
      });
      console.log("Unauthorized");
      return <Navigate to="/" />;
    }
  }
  return <Navigate to="/" />;
};

import { AdminPage } from "@/components/admin/home";
import { DataTable } from "@/components/table/data-table";
import { ordercolumns, Reservations } from "@/components/table/order-columns";
import axios from "axios";
import React from "react";

export default function Orders() {
  const [data, setData] = React.useState<Reservations[]>([]);

  const fetchOrders = async (): Promise<Reservations[]> => {
    try {
      const response = await axios.get(
        "http://localhost:3001/booking/list/all",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );
      console.log(response.data.result);
      setData(response.data.result);
      return response.data.result;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  React.useEffect(() => {
    fetchOrders().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <AdminPage>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
      </div>
      <div
        className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="container mx-auto py-10">
          <DataTable columns={ordercolumns} data={data} />
        </div>
      </div>
    </AdminPage>
  );
}

import { checkAuth, User } from "@/components/login-form/action";
import { fetchBoardGames } from "@/components/table/columns";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HomePage } from "@/components/user/home";
import axios from "axios";
import { format } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";

export type HistoryItem = {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  createdAt: Date;
  dateStart: Date;
  dateEnd: Date;
  duration: number;
  status: "PENDING" | "BOOKED" | "CANCELLED";
  boardGameReservations: BoardGameReservationDetail[];
  roomReservations: RoomReservationDetail[];
};

export type BoardGameReservationDetail = {
  id: string;
  boardGameId: string;
};

export type RoomReservationDetail = {
  id: string;
  roomId: string;
};

export default function History() {
  const [history, setHistory] = React.useState<HistoryItem[]>([]);
  const [roomInfo, setRoomInfo] = React.useState<RoomReservationDetail[]>([]);
  const [boardgameInfo, setBoardGameInfo] = React.useState<
    BoardGameReservationDetail[]
  >([]);

  const navigate = useNavigate();

  const fetchHistory = async (): Promise<HistoryItem[]> => {
    try {
      const response = await axios.get("http://localhost:3001/booking/list", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setHistory(response.data.result);
      return response.data.result;
      // console.log(history);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  // const fetchBoardGamesbyBookingId = async (
  //   id: string,
  // ): Promise<BoardGameReservationDetail[]> => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3001/booking/list/rooms/${id}`,
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("token"),
  //         },
  //       },
  //     );
  //     setBoardGameInfo(response.data.result);
  //     return response.data.result;
  //   } catch (error) {
  //     console.error(error);
  //     return [];
  //   }
  // };

  // const fetchRoomsbyBookingId = async (): Promise<RoomReservationDetail[]> => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3001/booking/list/rooms/${id}`,
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("token"),
  //         },
  //       },
  //     );
  //     setRoomInfo(response.data.result);
  //     return response.data.result;
  //   } catch (error) {
  //     console.error(error);
  //     return [];
  //   }
  // };

  React.useEffect(() => {
    fetchHistory().then((data) => {
      setHistory(data);
    });
    // console.log(history);
    checkAuth(navigate);
  }, []);

  return (
    <HomePage>
      <section className="flex w-auto flex-col gap-2 rounded-md px-4 py-8 sm:items-start md:py-12 md:pb-8 lg:py-12 lg:pb-10">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter lg:text-4xl lg:leading-normal">
          Your Booking History
        </h1>
        <p className="text-lg font-light text-foreground">
          This is your booking history. You can view your past bookings here.
        </p>
      </section>
      <section className="flex w-auto flex-col rounded-md px-4 py-4 md:pb-8 lg:pb-10">
        <Table>
          <TableCaption>Your Booking History</TableCaption>
          <TableHeader>
            <TableHead>CustomerName</TableHead>
            <TableHead>CustomerEmail</TableHead>
            <TableHead>CustomerPhone</TableHead>
            <TableHead>CreatedAt</TableHead>
            <TableHead>DateStart</TableHead>
            <TableHead>DateEnd</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
          </TableHeader>
          <TableBody>
            {history.length > 0 ? (
              history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.customerName}</TableCell>
                  <TableCell>{item.customerEmail}</TableCell>
                  <TableCell>{item.customerPhone}</TableCell>
                  <TableCell>
                    {format(new Date(item.createdAt), "PPP pp")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(item.dateStart), "PPP pp")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(item.dateEnd), "PPP pp")}
                  </TableCell>
                  <TableCell>{item.duration} Minutes</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </HomePage>
  );
}

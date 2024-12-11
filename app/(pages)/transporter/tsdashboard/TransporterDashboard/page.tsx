"use client";

import { useState } from "react";
import axios from "axios";
import { TransportationCard } from "@components/transporter/TransportationCard";
import { baseUrl } from "@/app/config";
import { useSession } from "next-auth/react";

interface TransportationRequest {
  id: string;
  type: string;
  load: number;
  loadUnit: string;
  origin: string;
  destination: string;
  userConfirmBooking: boolean;
  createdAt: string;
  updatedAt: string;
  price: number;
  distance: number;
}

export default function TransporterDashboard({
  requestData
}: {
  requestData: TransportationRequest;
}) {
  // console.log(requestData);
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [requests, setRequests] = useState<TransportationRequest[]>(
    Array.isArray(requestData) ? requestData : [requestData]
  );
  const handleAccept = async (id: string) => {
    const data = { transportationId: id as string, accepted: true };
    // console.log(data);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.patch(
        `${baseUrl}/transportation/tsInput`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // console.log(response.data);
      try {
        const updatedResponse = await axios.get(`${baseUrl}/transportation`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRequests(updatedResponse.data.data);
      } catch (err) {
        console.error("Could not update the Transportation requests", err);
      }

      // Update the local state to reflect the change
      // setRequests(requests.filter(request => request.id !== id));
    } catch (error) {
      console.error("Error accepting transportation request:", error);
    }
  };

  return (
    <div className="container mx-auto py-4 px-5">
      <h1 className="text-3xl font-bold mb-6">Transportation Requests</h1>
      {requests && requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <TransportationCard
              key={request.id}
              request={request}
              onAccept={() => handleAccept(request.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-2xl text-zinc-700">
          There are no bookings as of now...
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import axios from "axios";
import { TransportationCard } from "@components/transporter/TransportationCard";
import { baseUrl } from "@/app/config";
import { SessionProvider, useSession } from "next-auth/react";
import TransporterDashboardPage from "./TsPage";

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

  return (
    <SessionProvider>
      <div>
        <TransporterDashboardPage requestData={requestData} />
      </div>
    </SessionProvider>
  );
}

import React from "react";
import TransporterDashboard from "./TransporterDashboard/page";
import { baseUrl } from "@/app/config";
import { createAuthorizedAxios } from "@/lib/authHelper";

const page = async () => {
  let request = [];
  try {
    const api = await createAuthorizedAxios();
    const response = await api.get(`${baseUrl}/transportation`);
    request = response.data.data;
    // console.log(request);
  } catch (error) {
    console.error("Error fetching transportation requests:", error);
  }
  return (
    <div>
      <TransporterDashboard requestData={request} />
    </div>
  );
};

export default page;

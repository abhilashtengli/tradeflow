import React from "react";
import TransporterDashboard from "./TransporterDashboard/page";
import { baseUrl } from "@/app/config";
import axios from "axios";

const page = async () => {
  let request = [];
  try {
    const response = await axios.get(`${baseUrl}/transportation`);
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

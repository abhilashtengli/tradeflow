import React from "react";
import FreightFowrderComponent from "./FfComponent.tsx/page";
import axios from "axios";
import { baseUrl } from "@/app/config";

const page = async () => {
  let data = [];
  try {
    const response = await axios.get(
      `${baseUrl}/freight/freightForwarder/getAll`
    );
    data = response.data.data;
  } catch (err) {
    console.log("could not fetch Users", err);
  }
  console.log(data);

  return (
    <div>
      <FreightFowrderComponent />
    </div>
  );
};

export default page;

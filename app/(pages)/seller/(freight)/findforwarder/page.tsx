import React from "react";
import FreightFowrderComponent from "./FfComponent.tsx/page";
import axios from "axios";
import { baseUrl } from "@/app/config";
import { FindForwarder } from "@/components/seller/FindForwarder";

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

  return <div>
      {/* <FreightFowrderComponent /> */}
      n <FindForwarder />
    </div>;
};

export default page;

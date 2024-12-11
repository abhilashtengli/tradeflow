import { baseUrl } from "@/app/config";
import axios from "axios";
import { createAuthorizedAxios } from "@/lib/authHelper";
import ComponentOfClient from "./ComponentOfClient/page";

export default async function page() {
  const api = await createAuthorizedAxios();
  const response = await api.get(`${baseUrl}/user/getSigninUser`);
  const data = response.data.data;

  return (
    <div>
      <ComponentOfClient data={data} />
    </div>
  );
}

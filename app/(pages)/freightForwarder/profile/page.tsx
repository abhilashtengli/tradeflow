import { baseUrl } from "@/app/config";
import axios from "axios";
import ClientComponent from "./ClientComponent/page";

export default async function page() {
  const response = await axios.get(`${baseUrl}/freight/freightForwarder`);
  const data = response.data.data;

  return (
    <div>
      <ClientComponent data={data} />
    </div>
  );
}

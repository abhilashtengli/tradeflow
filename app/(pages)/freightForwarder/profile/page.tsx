import { baseUrl } from "@/app/config";
import ClientComponent from "./ClientComponent/page";
import { createAuthorizedAxios } from "@/lib/authHelper";

export default async function page() {
  const api = await createAuthorizedAxios();
  const response = await api.get(`${baseUrl}/freight/freightForwarder`);
  const data = response.data.data;

  return (
    <div>
      <ClientComponent data={data} />
    </div>
  );
}

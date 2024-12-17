import { baseUrl } from "@/app/config";
import { createAuthorizedAxios } from "@/lib/authHelper";
import ClientComponent from "./clientComponent/page";

export default async function page() {
  const api = await createAuthorizedAxios();
  const response = await api.get(`${baseUrl}/usertransporter/user`);
  const data = response.data.data;

  return (
    <div>
      <ClientComponent data={data} />
    </div>
  );
}

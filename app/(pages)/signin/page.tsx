import Login from "@/components/Login";
import NavbarHome from "@/components/NavbarHome";
const page = () => {
  return (
    <>
      <NavbarHome />
      <div className="flex justify-center items-center ">
        <Login />
      </div>
    </>
  );
};

export default page;

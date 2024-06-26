import { Outlet } from "react-router-dom";

// Layout for the authentication pages
const AuthLayout = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-sky-200 to-slate-400 min-h-screen w-full">
        <main className="container mx-auto md:p-10 p-5 xl:pt-20">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AuthLayout;

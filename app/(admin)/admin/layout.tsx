import { AdminNavlinks } from "@/app/_components/admin-navlinks";
import React from "react";
import { LogoutButton } from "./_components/logout-button";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid grid-cols-10">
      <aside className="bg-white left-0 top-0 sticky border-r h-screen p-4 col-span-2 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="space-y-0">
            <h1 className="text-2xl text-center font-bold">FroNeiture</h1>
            <p className="text-md text-center font-light">Admin Panel</p>
          </div>
          <hr />
          <AdminNavlinks />
        </div>
        <LogoutButton />
      </aside>
      <div className="col-span-8 p-4">{children}</div>
    </main>
  );
};

export default Layout;

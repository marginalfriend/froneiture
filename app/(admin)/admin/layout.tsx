import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <aside>
        <nav>
          <ul className="appearance-none">
            <li>Products</li>
            <li>Orders</li>
            <li>Partnership Submission</li>
          </ul>
        </nav>
      </aside>
      {children}
    </>
  );
};

export default Layout;

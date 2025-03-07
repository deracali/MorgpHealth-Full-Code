import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { data } from "../constants/data";

const Sidebar = () => {
  return (
<aside className="top-0 left-0 right-0 sm:relative bg-blue-500 w-full h-auto pt-8 pl-4 sm:pl-8 sm:basis-[30%] sm:rounded-lg flex items-start justify-center sm:flex-col sm:justify-start">

      {data.map((item, idx) => {
        return (
          <div
            key={idx}
            className="flex items-center space-x-4 leading-4 sm:mb-10"
          >
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#000" : "hsl(229, 24%, 87%)",
                background: isActive ? "hsl(228, 100%, 84%)" : "transparent",
                border: isActive ? "none" : "2px solid hsl(229, 24%, 87%)",
                fontWeight: "500",
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              })}
              to={item.linkTo}
            >
              {item.id}
            </NavLink>
            <div>
              <p className="hidden sm:block uppercase text-neutral-coolGray text-[14px]">
                {item.step}
              </p>
              <p className="hidden sm:block uppercase text-neutral-lightGray font-[500] tracking-wider">
                {item.title}
              </p>
            </div>
          </div>
        );
      })}
    </aside>
  );
};

export default Sidebar;

"use client";
import React from "react";

export default function InteractiveCard({
  children,
  contentName,
}: {
  children: React.ReactNode;
  contentName: string;
}) {
  function onCardMouseAction(event: React.SyntheticEvent) {
    if (event.type == "mouseover") {
      //shadow
      event.currentTarget.classList.remove("shadow-lg");
      event.currentTarget.classList.add("shadow-2xl");
      //bg color
      event.currentTarget.classList.remove("bg-white");
      event.currentTarget.classList.add("bg-neutral-200");
    } else {
      //shadow
      event.currentTarget.classList.remove("shadow-2xl");
      event.currentTarget.classList.add("shadow-lg");
      //bg color
      event.currentTarget.classList.remove("bg-neutral-200");
      event.currentTarget.classList.add("bg-white");
    }
  }
  //   function onHospitalSelect() {
  //     alert("You Select " + contentName);
  //   }
  return (
    <div
      className="w-full h-[300px] rounded-lg shadow-lg bg-white transition transform hover:-translate-y-1 duration-150 ease "
      onMouseOver={(event) => {
        onCardMouseAction(event);
      }}
      onMouseOut={(event) => {
        onCardMouseAction(event);
      }}
    >
      {children}
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { Vortex } from "./ui/vortex";

export function Navbar() {
  return (
      <nav className="w-[675px] text-white py-2 rounded-full border border-white overflow-hidden mt-4 flex items-center justify-center text-4xl font-semibold mx-auto">
        <Vortex backgroundColor="black" rangeY={800} particleCount={100} className="flex items-center flex-col justify-center px-2 md:px-10  py-4 dark h-full w-full ">
            Image Uploader
        </Vortex>
        </nav>
  );
}




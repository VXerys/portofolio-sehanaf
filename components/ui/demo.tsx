"use client";

import CurvedMenu from "@/components/ui/curved-menu";

const DemoOne = () => {
  return (
    <div className="min-h-screen bg-black">
      <CurvedMenu />
      <div className="flex h-screen items-center justify-center text-center text-7xl text-white">
        hello
        <span className="italic">!</span>
      </div>
    </div>
  );
};

export { DemoOne };

export default DemoOne;

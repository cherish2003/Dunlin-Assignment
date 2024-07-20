"use client";

import { useState } from "react";

type Props = {};

import {
  ShoppingCart,
  LayoutDashboard,
  UploadIcon,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Button } from "../ui/button";

import { useWindowWidth } from "@react-hook/window-size";
import { SideNavbar } from "./SideNavbar";

export default function Sidebar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-4 pb-10 pt-24 ">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-80">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <SideNavbar
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Uploads",
            href: "/uploads",
            icon: UploadIcon,
            variant: "ghost",
          },
          {
            title: "Analytics",
            href: "/analytics",
            icon: LayoutDashboard,
            variant: "default",
          },
        ]}
      />
    </div>
  );
}

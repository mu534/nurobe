// sidebar.hooks.ts
"use client";

import * as React from "react";

export type SidebarState = "expanded" | "collapsed";

export interface SidebarContextProps {
  state: SidebarState;
  open: boolean;
  setOpen: (value: boolean | ((value: boolean) => boolean)) => void;
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
}

// Context
export const SidebarContext = React.createContext<SidebarContextProps | null>(
  null,
);

// Hook to consume context
export function useSidebar(): SidebarContextProps {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

// Hook for the provider logic
export function useSidebarProvider(
  defaultOpen: boolean = true,
  openProp?: boolean,
  onOpenChange?: (open: boolean) => void,
) {
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);

  const open = openProp ?? _open;

  const setOpen = React.useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const newOpen = typeof value === "function" ? value(open) : value;

      if (onOpenChange) {
        onOpenChange(newOpen);
      } else {
        _setOpen(newOpen);
      }

      // Optionally persist sidebar state in cookie
      document.cookie = `sidebar_state=${newOpen}; path=/; max-age=${60 * 60 * 24 * 7}`;
    },
    [onOpenChange, open],
  );

  // Detect if mobile
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((prev) => !prev);
    } else {
      setOpen((prev) => !prev);
    }
  }, [isMobile, setOpen]);

  // Compute state
  const state: SidebarState = open ? "expanded" : "collapsed";

  const contextValue: SidebarContextProps = {
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  };

  return { contextValue };
}

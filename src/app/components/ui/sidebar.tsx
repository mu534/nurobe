"use client";

import * as React from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./sheet";
import { Skeleton } from "./skeleton";
import { PanelLeftIcon } from "lucide-react";

import { SIDEBAR_WIDTH_MOBILE } from "./sidebar.constants";
import {
  useSidebar,
  SidebarContext,
  useSidebarProvider,
} from "./sidebar.hooks";
import { cn } from "./utils";

/* ----------------------------- SidebarProvider ----------------------------- */
export function SidebarProvider(
  props: React.PropsWithChildren<{
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }>,
) {
  const { contextValue } = useSidebarProvider(
    props.defaultOpen,
    props.open,
    props.onOpenChange,
  );
  return (
    <SidebarContext.Provider value={contextValue}>
      {props.children}
    </SidebarContext.Provider>
  );
}

/* ----------------------------- Sidebar Component --------------------------- */
export function Sidebar({
  children,
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  ...props
}: React.PropsWithChildren<{
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
  className?: string;
}>) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  // Mobile sidebar
  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          side={side}
          className="bg-sidebar text-sidebar-foreground w-[var(--sidebar-width)] p-0 [&>button]:hidden"
          style={
            { "--sidebar-width": SIDEBAR_WIDTH_MOBILE } as React.CSSProperties
          }
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop sidebar
  return (
    <div
      className={cn(
        "group peer text-sidebar-foreground hidden md:block",
        className,
      )}
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
      {...props}
    >
      <div
        data-slot="sidebar-gap"
        className="relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear"
      ></div>
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left" ? "left-0" : "right-0",
        )}
      >
        <div
          data-slot="sidebar-inner"
          className="bg-sidebar flex h-full w-full flex-col"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- SidebarTrigger ----------------------------- */
export function SidebarTrigger(props: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={(e) => {
        props.onClick?.(e);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

/* ------------------------- SidebarMenuSkeleton ---------------------------- */
export function SidebarMenuSkeleton({
  showIcon = false,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { showIcon?: boolean }) {
  const [width, setWidth] = React.useState("50%");
  React.useEffect(() => {
    setWidth(`${Math.floor(Math.random() * 40) + 50}%`);
  }, []);
  return (
    <div
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-md" />}
      <Skeleton
        className="h-4 max-w-[var(--skeleton-width)] flex-1"
        style={{ "--skeleton-width": width } as React.CSSProperties}
      />
    </div>
  );
}

/* ------------------- SidebarInput, SidebarFooter, etc --------------------- */
export const SidebarInput = (props: React.ComponentProps<typeof Input>) => (
  <Input
    className={cn("bg-background h-8 w-full shadow-none", props.className)}
    {...props}
  />
);
export const SidebarFooter = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-2 p-2", props.className)} {...props} />
);
export const SidebarHeader = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-2 p-2", props.className)} {...props} />
);
export const SidebarSeparator = (
  props: React.ComponentProps<typeof Separator>,
) => (
  <Separator
    className={cn("bg-sidebar-border mx-2 w-auto", props.className)}
    {...props}
  />
);
export const SidebarContent = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex min-h-0 flex-1 flex-col gap-2 overflow-auto",
      props.className,
    )}
    {...props}
  />
);
export const SidebarMenu = (props: React.HTMLAttributes<HTMLUListElement>) => (
  <ul
    className={cn("flex w-full min-w-0 flex-col gap-1", props.className)}
    {...props}
  />
);
export const SidebarMenuItem = (props: React.HTMLAttributes<HTMLLIElement>) => (
  <li className={cn("group/menu-item relative", props.className)} {...props} />
);
export const SidebarRail = (props: React.HTMLAttributes<HTMLButtonElement>) => {
  const { toggleSidebar } = useSidebar();
  return <button onClick={toggleSidebar} {...props} />;
};
export const SidebarInset = (props: React.HTMLAttributes<HTMLElement>) => (
  <main
    className={cn(
      "bg-background relative flex w-full flex-1 flex-col",
      props.className,
    )}
    {...props}
  />
);

"use client";

import { createHoistableComponent } from "@bmthd/lift";

export const { 
  Provider: SidebarContentProvider,
  Slot: SidebarContentSlot,
  Hoist: SidebarContentHoist
} = createHoistableComponent();

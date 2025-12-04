"use client";

import { createHoistableComponent } from "@bmthd/lift";

export const {
  Provider: FooterContentProvider,
  Slot: FooterContentSlot,
  Hoist: FooterContentHoist
} = createHoistableComponent();

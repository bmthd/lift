"use client";

import { createHoistableComponent } from "@bmthd/lift";

export const {
  Provider: HeaderActionProvider,
  Slot: HeaderActionSlot,
  Hoist: HeaderActionHoist
} = createHoistableComponent();
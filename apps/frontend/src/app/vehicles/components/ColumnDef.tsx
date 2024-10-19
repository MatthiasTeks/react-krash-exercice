"use client";

import { Button } from "@/components/ui/button";
import { Vehicle } from "@/types/vehicle";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const vehicleColumns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => <div>{row.getValue("model")}</div>,
  },
  {
    accessorKey: "vehicle_class",
    header: "Class",
    cell: ({ row }) => <div>{row.getValue("vehicle_class")}</div>,
  },
  {
    accessorKey: "manufacturer",
    header: "Manufacturer",
    cell: ({ row }) => <div>{row.getValue("manufacturer")}</div>,
  },
  {
    accessorKey: "cost_in_credits",
    header: "Cost (Credits)",
    cell: ({ row }) => <div>{row.getValue("cost_in_credits")}</div>,
  },
  {
    accessorKey: "length",
    header: "Length (meters)",
    cell: ({ row }) => <div>{row.getValue("length")}</div>,
  },
  {
    accessorKey: "crew",
    header: "Crew",
    cell: ({ row }) => <div>{row.getValue("crew")}</div>,
  },
  {
    accessorKey: "passengers",
    header: "Passengers",
    cell: ({ row }) => <div>{row.getValue("passengers")}</div>,
  },
  {
    accessorKey: "max_atmosphering_speed",
    header: "Max Speed",
    cell: ({ row }) => <div>{row.getValue("max_atmosphering_speed")}</div>,
  },
  {
    accessorKey: "cargo_capacity",
    header: "Cargo Capacity",
    cell: ({ row }) => <div>{row.getValue("cargo_capacity")}</div>,
  },
  {
    accessorKey: "consumables",
    header: "Consumables",
    cell: ({ row }) => <div>{row.getValue("consumables")}</div>,
  },
  {
    accessorKey: "created",
    header: () => <div className="text-right">Created</div>,
    cell: ({ row }) => {
      const createdDate = new Date(row.getValue("created")).toLocaleDateString();
      return <div className="text-right">{createdDate}</div>;
    },
  },
];

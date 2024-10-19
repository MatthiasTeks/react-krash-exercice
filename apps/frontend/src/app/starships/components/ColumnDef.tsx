"use client";

import { Button } from "@/components/ui/button";
import { Starship } from "@/types/starship";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const startshipColumns: ColumnDef<Starship>[] = [
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
    accessorKey: "starship_class",
    header: "Class",
    cell: ({ row }) => <div>{row.getValue("starship_class")}</div>,
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
    accessorKey: "hyperdrive_rating",
    header: "Hyperdrive Rating",
    cell: ({ row }) => <div>{row.getValue("hyperdrive_rating")}</div>,
  },
  {
    accessorKey: "MGLT",
    header: "MGLT",
    cell: ({ row }) => <div>{row.getValue("MGLT")}</div>,
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

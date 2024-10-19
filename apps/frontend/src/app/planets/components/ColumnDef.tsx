"use client";

import { Button } from "@/components/ui/button";
import { Planet } from "@/types/planet";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const planetColumns: ColumnDef<Planet>[] = [
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
    accessorKey: "diameter",
    header: "Diameter (km)",
    cell: ({ row }) => <div>{row.getValue("diameter")}</div>,
  },
  {
    accessorKey: "rotation_period",
    header: "Rotation Period (hours)",
    cell: ({ row }) => <div>{row.getValue("rotation_period")}</div>,
  },
  {
    accessorKey: "orbital_period",
    header: "Orbital Period (days)",
    cell: ({ row }) => <div>{row.getValue("orbital_period")}</div>,
  },
  {
    accessorKey: "gravity",
    header: "Gravity",
    cell: ({ row }) => <div>{row.getValue("gravity")}</div>,
  },
  {
    accessorKey: "population",
    header: "Population",
    cell: ({ row }) => <div>{row.getValue("population")}</div>,
  },
  {
    accessorKey: "climate",
    header: "Climate",
    cell: ({ row }) => <div>{row.getValue("climate")}</div>,
  },
  {
    accessorKey: "terrain",
    header: "Terrain",
    cell: ({ row }) => <div>{row.getValue("terrain")}</div>,
  },
  {
    accessorKey: "surface_water",
    header: () => <div className="text-right">Surface Water (%)</div>,
    cell: ({ row }) => <div className="text-right">{row.getValue("surface_water")}</div>,
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

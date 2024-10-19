"use client";

import { Button } from "@/components/ui/button";
import { Species } from "@/types/species";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const speciesColumns: ColumnDef<Species>[] = [
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
    accessorKey: "classification",
    header: "Classification",
    cell: ({ row }) => <div>{row.getValue("classification")}</div>,
  },
  {
    accessorKey: "designation",
    header: "Designation",
    cell: ({ row }) => <div>{row.getValue("designation")}</div>,
  },
  {
    accessorKey: "average_height",
    header: "Avg Height (cm)",
    cell: ({ row }) => <div>{row.getValue("average_height")}</div>,
  },
  {
    accessorKey: "average_lifespan",
    header: "Avg Lifespan (years)",
    cell: ({ row }) => <div>{row.getValue("average_lifespan")}</div>,
  },
  {
    accessorKey: "eye_colors",
    header: "Eye Colors",
    cell: ({ row }) => <div>{row.getValue("eye_colors")}</div>,
  },
  {
    accessorKey: "hair_colors",
    header: "Hair Colors",
    cell: ({ row }) => <div>{row.getValue("hair_colors")}</div>,
  },
  {
    accessorKey: "skin_colors",
    header: "Skin Colors",
    cell: ({ row }) => <div>{row.getValue("skin_colors")}</div>,
  },
  {
    accessorKey: "language",
    header: "Language",
    cell: ({ row }) => <div>{row.getValue("language")}</div>,
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

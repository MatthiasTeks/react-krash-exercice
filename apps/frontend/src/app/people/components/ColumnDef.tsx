"use client";

import { Button } from "@/components/ui/button";
import { People } from "@/types/people";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const peopleColumns: ColumnDef<People>[] = [
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
    accessorKey: "birth_year",
    header: "Birth Year",
    cell: ({ row }) => <div>{row.getValue("birth_year")}</div>,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => <div>{row.getValue("gender")}</div>,
  },
  {
    accessorKey: "eye_color",
    header: "Eye Color",
    cell: ({ row }) => <div>{row.getValue("eye_color")}</div>,
  },
  {
    accessorKey: "hair_color",
    header: "Hair Color",
    cell: ({ row }) => <div>{row.getValue("hair_color")}</div>,
  },
  {
    accessorKey: "height",
    header: () => <div className="text-right">Height (cm)</div>,
    cell: ({ row }) => <div className="text-right">{row.getValue("height")}</div>,
  },
  {
    accessorKey: "mass",
    header: () => <div className="text-right">Mass (kg)</div>,
    cell: ({ row }) => <div className="text-right">{row.getValue("mass")}</div>,
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

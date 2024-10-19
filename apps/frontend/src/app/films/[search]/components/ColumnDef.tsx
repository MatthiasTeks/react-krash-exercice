'use client';

import { Button } from "@/components/ui/button";
import { FilmType } from "@/types/film";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<FilmType>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "episode_id",
    header: "Episode",
    cell: ({ row }) => <div>{row.getValue("episode_id")}</div>,
  },
  {
    accessorKey: "director",
    header: "Director",
    cell: ({ row }) => <div>{row.getValue("director")}</div>,
  },
  {
    accessorKey: "release_date",
    header: () => <div className="text-right">Release Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("release_date")).toLocaleDateString();
      return <div className="text-right">{date}</div>;
    },
  },
];
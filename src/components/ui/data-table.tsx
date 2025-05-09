"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Show } from "@/components/Show";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SortAsc, SortDesc } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sortField?: string;
  sortOrder?: string;
  setSortField?: (field: string) => void;
  setSortOrder?: (order: "DESC" | "ASC") => void;
  renderRowActions?: (row: TData) => React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  sortField,
  sortOrder,
  setSortField,
  setSortOrder,
  renderRowActions,
}: DataTableProps<TData, TValue>) {
  const { t } = useTranslation();

  const internalColumns = [...columns];

  if (renderRowActions) {
    internalColumns.push({
      id: "actions",
      header: "",
      cell: ({ row }) => renderRowActions(row.original),
    } as ColumnDef<TData>);
  }

  const table = useReactTable({
    data,
    columns: internalColumns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
  });

  const handleHeaderClick = (columnId: string) => {
    if (!setSortField || !setSortOrder) return;

    if (sortField === columnId) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortField(columnId);
      setSortOrder("ASC");
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-[initial]">
              {headerGroup.headers.map((header) => {
                const columnId = header.column.id;
                const isSorted = sortField === columnId;
                return (
                  <TableHead
                    key={header.id}
                    onClick={() => handleHeaderClick(columnId)}
                    className="cursor-pointer select-none hover:bg-white/5"
                  >
                    <div className="flex-row-v-center gap-x-2">
                      <span>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </span>
                      <Show when={isSorted && sortField === columnId}>
                        {() => (
                          <span className="w-fit flex-none">
                            {sortOrder === "ASC" ? (
                              <SortAsc className="size-4 text-sky-500" />
                            ) : (
                              <SortDesc className="size-4 text-sky-500" />
                            )}
                          </span>
                        )}
                      </Show>
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:!bg-[initial]"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:!bg-[initial]">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {t("no_results")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

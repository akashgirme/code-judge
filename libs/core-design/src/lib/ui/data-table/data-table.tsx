'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '../../atoms';
import {
  NavArrowLeft,
  NavArrowRight,
  FastArrowLeft,
  FastArrowRight,
} from 'iconoir-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { Dialog, DialogContent } from '../dialog';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowCount: number;
  isLoading?: boolean;
  pagination?: PaginationState;
  setPagination?: Dispatch<SetStateAction<PaginationState>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowCount,
  isLoading,
  pagination,
  setPagination,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    rowCount,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
  });

  return (
    <div className="rounded-md border">
      <Dialog open={isLoading}>
        <DialogContent>Loading...</DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-evenly gap-2 mt-6 py-4">
        <div className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
          </strong>
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onBlur={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </div>
        <div className="flex gap-6">
          <Button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            size="sm"
            variant="secondary-outline"
          >
            <FastArrowLeft />
          </Button>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            size="sm"
            variant="secondary-outline"
          >
            <NavArrowLeft />
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            size="sm"
            variant="secondary-outline"
          >
            <NavArrowRight />
          </Button>
          <Button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            size="sm"
            variant="secondary-outline"
          >
            <FastArrowRight />
          </Button>
        </div>
        <div className="flex items-center gap-6">
          <div className="max-w-24">
            <Select
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
              defaultValue={String(table.getState().pagination.pageSize)}
              value={String(table.getState().pagination.pageSize)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Page Size" />
              </SelectTrigger>
              <SelectContent>
                {[10, 25, 50, 100]?.map((pageSize) => (
                  <SelectItem key={`page-size-option-${pageSize}`} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
            {rowCount.toLocaleString()} Rows
          </div>
        </div>
        {isLoading ? 'Loading...' : null}
      </div>
    </div>
  );
}

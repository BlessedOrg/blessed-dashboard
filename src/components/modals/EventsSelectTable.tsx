import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Button, Checkbox, DialogClose, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, Input, Table } from "@/components/ui";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

interface IFlattenedData {
  id: string;
  eventId: string;
  ticketId: string;
  eventName: string;
  ticketName: string;
  createdAt: string;
  logoUrl: string;
  requiredType?: "holders" | "attendees";
  entranceTicket?: string;
  Tickets: ITicket[];
}

const columns: ColumnDef<IFlattenedData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "eventName",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Event Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center min-h-[3.125rem]">
        <Image
          src={row.original.logoUrl || "/img/placeholder_image.jpeg"}
          width={50}
          height={50}
          alt={row.getValue("eventName")}
          className="mr-2 object-cover"
        />
        <span>{row.getValue("eventName")}</span>
      </div>
    ),
  },
  {
    accessorKey: "ticketName",
    header: "Ticket Name",
    cell: ({ row }) => <div>{row.getValue("ticketName")}</div>,
  },
];

export function EventSelectTable({
  myEvents: myEventsData,
  publicEvents: publicEventsData,
  onSaveEvents,
  defaultTickets,
}: {
  myEvents: IEvent[];
  publicEvents: IEvent[];
  onSaveEvents: (data: any) => void;
  defaultTickets: string[];
}) {
  const [showPublicEvents, setShowPublicEvents] = useState(true);
  const [showMyEvents, setShowMyEvents] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 4,
  });

  const processedEvents = useMemo(() => {
    const processEvents = (events: IEvent[]) =>
      events.flatMap((event) =>
        event.Tickets.map((ticket) => ({
          id: `${event.id}-${ticket.id}`,
          eventId: event.id,
          ticketId: ticket.id,
          eventSlug: event.slug,
          ticketSlug: ticket.slug,
          eventName: event.name,
          ticketName: ticket.name,
          createdAt: new Date(ticket?.createdAt)?.toLocaleDateString(),
          logoUrl: event.logoUrl,
          type: "holders",
          Entrance: ticket?.Entrance,
        }))
      );

    return {
      myEvents: processEvents(myEventsData),
      publicEvents: processEvents(publicEventsData),
    };
  }, [myEventsData, publicEventsData]);

  const filteredData = useMemo(() => {
    let combinedEvents = [];
    if (showPublicEvents) combinedEvents = combinedEvents.concat(processedEvents.publicEvents);
    if (showMyEvents) combinedEvents = combinedEvents.concat(processedEvents.myEvents);

    if (!globalFilter) return combinedEvents;

    const searchTerms = globalFilter
      .toLowerCase()
      .split(",")
      .map((term) => term.trim());

    return combinedEvents.filter((item) =>
      searchTerms.some((term) => item.eventName.toLowerCase().includes(term) || item.ticketName.toLowerCase().includes(term))
    );
  }, [globalFilter, showPublicEvents, showMyEvents, processedEvents]);

  useEffect(() => {
    const initialRowSelection = {};
    filteredData.forEach((row, index) => {
      if (defaultTickets.includes(row.ticketId)) {
        initialRowSelection[index] = true;
      }
    });
    setRowSelection(initialRowSelection);
  }, [filteredData, defaultTickets]);

  const setShowPublicEventsCallback = useCallback((value: boolean) => {
    setShowPublicEvents(value);
  }, []);

  const setShowMyEventsCallback = useCallback((value: boolean) => {
    setShowMyEvents(value);
  }, []);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination,
    },
    initialState: {
      rowSelection: {},
    },
  });

  const selectedEvents = useMemo(() => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    return selectedRows.map((row) => row.original);
  }, [rowSelection]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Search events and tickets..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Events <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem checked={showPublicEvents} onCheckedChange={setShowPublicEventsCallback}>
              Public Events
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showMyEvents} onCheckedChange={setShowMyEventsCallback}>
              My Events
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>
          </span>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
      <div className="h-[1px] bg-gray-400 w-full"></div>

      <div className="pt-4 flex justify-end">
        <DialogClose asChild>
          <Button variant="green" onClick={() => onSaveEvents(selectedEvents)}>
            Save
          </Button>
        </DialogClose>
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

const ITEMS_PER_PAGE = 30;

export function EntityTable({ entities }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const totalPages = Math.ceil(entities.length / ITEMS_PER_PAGE);

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return entities.slice(start, end);
  }, [currentPage, entities]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Entities</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Salience</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((entity: any, index: number) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>
                    <button onClick={() => toggleRow(index)}>
                      {expandedRows.has(index) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  </TableCell>
                  <TableCell>{entity.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{entity.type}</Badge>
                  </TableCell>
                  <TableCell>{entity.salience.toFixed(2)}</TableCell>
                </TableRow>
                {expandedRows.has(index) && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <div className="p-4 bg-gray-100 rounded">
                        <p className="font-medium">Mentions:</p>
                        <div className="flex flex-wrap gap-2">
                          {entity.mentions.map(
                            (mention: any, mentionIndex: number) => (
                              <Badge key={mentionIndex} variant="outline">
                                {mention.text.content}
                              </Badge>
                            )
                          )}
                        </div>
                        {entity.metadata.wikipedia_url && (
                          <p className="mt-2">
                            <a
                              href={entity.metadata.wikipedia_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500"
                            >
                              Wikipedia Link
                            </a>
                          </p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>

        <Pagination>
          <PaginationPrevious
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </PaginationPrevious>

          <PaginationContent>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
          </PaginationContent>

          <PaginationNext
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </PaginationNext>
        </Pagination>
      </CardContent>
    </Card>
  );
}

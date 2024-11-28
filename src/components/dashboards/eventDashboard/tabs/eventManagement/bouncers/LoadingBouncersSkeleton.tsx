"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";

const shimmer = {
  initial: { x: "-100%" },
  animate: { 
    x: "100%",
    transition: { 
      repeat: Infinity,
      duration: 1.5,
      ease: "linear"
    }
  }
};

export function LoadingBouncersSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Added</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="relative h-5 w-48 overflow-hidden rounded bg-gray-200">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                      variants={shimmer}
                      initial="initial"
                      animate="animate"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="relative h-5 w-32 overflow-hidden rounded bg-gray-200">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                      variants={shimmer}
                      initial="initial"
                      animate="animate"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="relative h-5 w-20 overflow-hidden rounded-full bg-gray-200">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                      variants={shimmer}
                      initial="initial"
                      animate="animate"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
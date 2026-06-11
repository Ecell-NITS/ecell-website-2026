"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Users,
  Code2,
} from "lucide-react";
import api from "@/lib/api";

interface Application {
  id: string;
  name: string;
  email: string;
  scholarId: string;
  type: "TECH" | "OTHER";
  status: "DRAFT" | "SUBMITTED";
  techDomain?: string;
  teamSelection?: string[];
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    picture?: string;
  };
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function AdminRecruitmentPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", String(pagination.page));
      params.set("limit", "20");
      if (search) params.set("search", search);
      if (filterType) params.set("type", filterType);
      if (filterStatus) params.set("status", filterStatus);

      const res = await api.get(
        `/api/recruitment/admin/applications?${params.toString()}`,
      );
      setApplications(res.data.data.applications);
      setPagination(res.data.data.pagination);
    } catch {
      /* user may not be admin */
    } finally {
      setLoading(false);
    }
  }, [pagination.page, search, filterType, filterStatus]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination((p) => ({ ...p, page: 1 }));
    fetchApplications();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Recruitment Applications
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          {pagination.total} total applications
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              className="w-full rounded-xl border border-white/10 bg-[#0f172a] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
              placeholder="Search by name, email, or scholar ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>

        <div className="flex gap-2">
          <div className="relative">
            <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <select
              className="appearance-none rounded-xl border border-white/10 bg-[#0f172a] py-2.5 pl-10 pr-8 text-sm text-white outline-none focus:border-blue-500"
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setPagination((p) => ({ ...p, page: 1 }));
              }}
            >
              <option value="">All Types</option>
              <option value="TECH">Tech</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <select
            className="appearance-none rounded-xl border border-white/10 bg-[#0f172a] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setPagination((p) => ({ ...p, page: 1 }));
            }}
          >
            <option value="">All Status</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        </div>
      ) : applications.length === 0 ? (
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] py-20 text-center">
          <p className="text-gray-500">No applications found</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/5">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-4 py-3 font-medium text-gray-400">
                  Applicant
                </th>
                <th className="px-4 py-3 font-medium text-gray-400">
                  Scholar ID
                </th>
                <th className="px-4 py-3 font-medium text-gray-400">Type</th>
                <th className="px-4 py-3 font-medium text-gray-400">
                  Status
                </th>
                <th className="px-4 py-3 font-medium text-gray-400">Date</th>
                <th className="px-4 py-3 font-medium text-gray-400">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, i) => (
                <motion.tr
                  key={app.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-white">{app.name}</p>
                      <p className="text-xs text-gray-500">{app.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {app.scholarId}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        app.type === "TECH"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-purple-500/10 text-purple-400"
                      }`}
                    >
                      {app.type === "TECH" ? (
                        <Code2 className="h-3 w-3" />
                      ) : (
                        <Users className="h-3 w-3" />
                      )}
                      {app.type === "TECH"
                        ? `Tech${app.techDomain ? ` — ${app.techDomain}` : ""}`
                        : "Other"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        app.status === "SUBMITTED"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          app.status === "SUBMITTED"
                            ? "bg-green-400"
                            : "bg-amber-400"
                        }`}
                      />
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/recruitment/${app.id}`}
                      className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Page {pagination.page} of {pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <button
              disabled={pagination.page <= 1}
              onClick={() =>
                setPagination((p) => ({ ...p, page: p.page - 1 }))
              }
              className="rounded-lg border border-white/10 bg-white/5 p-2 text-gray-400 transition-colors hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              disabled={pagination.page >= pagination.totalPages}
              onClick={() =>
                setPagination((p) => ({ ...p, page: p.page + 1 }))
              }
              className="rounded-lg border border-white/10 bg-white/5 p-2 text-gray-400 transition-colors hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

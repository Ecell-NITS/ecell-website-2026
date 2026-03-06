/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-floating-promises, @typescript-eslint/no-unsafe-argument */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Shield, ShieldOff, Users, Search, AlertTriangle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import AdminNavigation from "../AdminNavigation";

interface ApiUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const { user: authUser, loading: isLoading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [roleDialog, setRoleDialog] = useState<{
    user: ApiUser;
    targetRole: "ADMIN" | "CLIENT";
  } | null>(null);

  // Redirect if not admin/superadmin
  useEffect(() => {
    if (
      !isLoading &&
      (!authUser ||
        (authUser.role !== "ADMIN" && authUser.role !== "SUPERADMIN"))
    ) {
      toast.error("Access denied. Admin privileges required.");
      router.push("/dashboard");
    }
  }, [isLoading, authUser, router]);

  // Fetch all users
  useEffect(() => {
    if (!authUser) return;
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/admin/users");
        setUsers(data.data ?? []);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        toast.error(error.response?.data?.message ?? "Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [authUser]);

  const handleMakeAdmin = async (userId: string) => {
    setUpdatingId(userId);
    try {
      await api.put(`/admin/make-admin/${userId}`);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: "ADMIN" } : u)),
      );
      toast.success("User promoted to Admin! 🛡️");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message ?? "Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleMakeClient = async (userId: string) => {
    setUpdatingId(userId);
    try {
      await api.put(`/admin/make-client/${userId}`);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: "USER" } : u)),
      );
      toast.success("User demoted to Client");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message ?? "Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "SUPERADMIN":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "ADMIN":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="flex min-h-screen bg-linear-to-br from-[#0b1220] to-[#060b16] text-white">
      <AdminNavigation active="users" mobileMenu={false} />

      <main className="flex w-full flex-col px-4 pt-20 pb-8 sm:px-6 lg:ml-64 lg:pt-8 xl:px-8 2xl:ml-72 2xl:px-10 2xl:pt-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="flex items-center gap-3 text-2xl font-bold sm:text-3xl">
                <Users className="text-blue-400" />
                User Management
              </h1>
              <p className="mt-1 text-white/60">{users.length} total users</p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500"
                size={16}
              />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pr-4 pl-10 text-sm text-white placeholder-gray-500 transition-all outline-none focus:border-blue-500/40"
              />
            </div>
          </div>
        </div>

        {/* Users Table */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-16 animate-pulse rounded-xl bg-white/5"
              />
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            {/* Table Header */}
            <div className="hidden border-b border-white/10 bg-white/5 px-6 py-4 md:grid md:grid-cols-12 md:gap-4">
              <div className="col-span-4 text-xs font-bold tracking-widest text-gray-500 uppercase">
                Name
              </div>
              <div className="col-span-3 text-xs font-bold tracking-widest text-gray-500 uppercase">
                Email
              </div>
              <div className="col-span-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
                Role
              </div>
              <div className="col-span-3 text-right text-xs font-bold tracking-widest text-gray-500 uppercase">
                Actions
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-white/5">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <div
                    key={u.id}
                    className="flex flex-col gap-3 px-4 py-4 transition-colors hover:bg-white/5 md:grid md:grid-cols-12 md:items-center md:gap-4 md:px-6"
                  >
                    {/* Name */}
                    <div className="col-span-4">
                      <p className="font-semibold text-white">
                        {u.name ?? "—"}
                      </p>
                      <p className="text-xs text-gray-500 md:hidden">
                        {u.email}
                      </p>
                    </div>

                    {/* Email */}
                    <div className="col-span-3 hidden md:block">
                      <p className="truncate text-sm text-gray-400">
                        {u.email}
                      </p>
                    </div>

                    {/* Role */}
                    <div className="col-span-2">
                      <span
                        className={`inline-block rounded-full border px-3 py-1 text-xs font-bold uppercase ${getRoleBadge(u.role)}`}
                      >
                        {u.role}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-3 flex items-center justify-end gap-2">
                      {u.role === "SUPERADMIN" ? (
                        <span className="text-xs text-gray-500 italic">
                          Protected
                        </span>
                      ) : u.id === String(authUser?.id) ? (
                        <span className="text-xs text-gray-500 italic">
                          You
                        </span>
                      ) : (
                        <>
                          {u.role !== "ADMIN" && (
                            <button
                              onClick={() =>
                                setRoleDialog({
                                  user: u,
                                  targetRole: "ADMIN",
                                })
                              }
                              disabled={updatingId === u.id}
                              className="flex items-center gap-1.5 rounded-lg bg-blue-600/20 px-3 py-1.5 text-xs font-semibold text-blue-400 transition-all hover:bg-blue-600/30 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {updatingId === u.id ? (
                                <div className="h-3 w-3 animate-spin rounded-full border border-blue-400/30 border-t-blue-400" />
                              ) : (
                                <Shield size={14} />
                              )}
                              Make Admin
                            </button>
                          )}
                          {u.role !== "USER" && (
                            <button
                              onClick={() =>
                                setRoleDialog({
                                  user: u,
                                  targetRole: "CLIENT",
                                })
                              }
                              disabled={updatingId === u.id}
                              className="flex items-center gap-1.5 rounded-lg bg-gray-600/20 px-3 py-1.5 text-xs font-semibold text-gray-400 transition-all hover:bg-gray-600/30 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {updatingId === u.id ? (
                                <div className="h-3 w-3 animate-spin rounded-full border border-gray-400/30 border-t-gray-400" />
                              ) : (
                                <ShieldOff size={14} />
                              )}
                              Make Client
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-gray-500">No users found.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Role Change Confirmation Dialog ── */}
        {roleDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-[#0f1729] p-6 shadow-2xl">
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    roleDialog.targetRole === "ADMIN"
                      ? "bg-blue-500/20"
                      : "bg-yellow-500/20"
                  }`}
                >
                  {roleDialog.targetRole === "ADMIN" ? (
                    <Shield size={20} className="text-blue-400" />
                  ) : (
                    <AlertTriangle size={20} className="text-yellow-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {roleDialog.targetRole === "ADMIN"
                      ? "Promote to Admin"
                      : "Demote to Client"}
                  </h3>
                  <p className="text-xs text-gray-400">
                    This will change the user&apos;s permissions
                  </p>
                </div>
              </div>

              <p className="mb-4 text-sm text-gray-300">
                Are you sure you want to{" "}
                {roleDialog.targetRole === "ADMIN" ? "promote" : "demote"}{" "}
                <span className="font-semibold text-white">
                  {roleDialog.user.name ?? roleDialog.user.email}
                </span>{" "}
                from{" "}
                <span className="font-semibold text-white">
                  {roleDialog.user.role}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-white">
                  {roleDialog.targetRole}
                </span>
                ?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setRoleDialog(null)}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (roleDialog.targetRole === "ADMIN") {
                      handleMakeAdmin(roleDialog.user.id);
                    } else {
                      handleMakeClient(roleDialog.user.id);
                    }
                    setRoleDialog(null);
                  }}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                    roleDialog.targetRole === "ADMIN"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-yellow-600 text-white hover:bg-yellow-700"
                  }`}
                >
                  {roleDialog.targetRole === "ADMIN"
                    ? "Yes, Promote"
                    : "Yes, Demote"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

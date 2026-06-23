"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, ExternalLink, Code2, Users } from "lucide-react";
import api from "@/lib/api";

interface Application {
  id: string;
  name: string;
  email: string;
  scholarId: string;
  branch?: string;
  type: "TECH" | "OTHER";
  status: "DRAFT" | "SUBMITTED";
  techDomain?: string;
  domainOfPriorProject?: string;
  resumeLink?: string;
  githubProfileLink?: string;
  taskPreviewLink?: string;
  taskGithubRepoLink?: string;
  taskSelection?: string;
  projectFigmaLink?: string;
  prototypeFigmaLink?: string;
  designInspirationLink?: string;
  whatsappNumber?: string;
  instituteEmail?: string;
  whyJoinECell?: string;
  teamSelection?: string[];
  pastContributions?: string;
  otherClubs?: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    picture?: string;
  };
}

function DetailRow({
  label,
  value,
  isLink,
}: {
  label: string;
  value?: string | null;
  isLink?: boolean;
}) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1 border-b border-white/5 py-3 sm:flex-row sm:items-center sm:gap-4">
      <span className="min-w-[180px] text-sm text-gray-500">{label}</span>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
        >
          {value.length > 50 ? value.slice(0, 50) + "..." : value}
          <ExternalLink className="h-3 w-3" />
        </a>
      ) : (
        <span className="text-sm text-white">{value}</span>
      )}
    </div>
  );
}

export default function AdminRecruitmentDetailPage() {
  const params = useParams();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const idStr = Array.isArray(params.id) ? params.id[0] : params.id;
      api
        .get<{ data: { application: Application } }>(
          `/api/recruitment/admin/applications/${idStr}`,
        )
        .then((res) => setApplication(res.data.data.application))
        .catch((err) => console.error("Failed to fetch application", err))
        .finally(() => setLoading(false));
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="text-center">
        <p className="text-gray-400">Application not found</p>
        <Link
          href="/admin/recruitment"
          className="mt-4 inline-flex items-center gap-2 text-sm text-blue-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/admin/recruitment"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Applications
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8"
      >
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">{application.name}</h1>
            <p className="mt-1 text-sm text-gray-400">{application.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                application.type === "TECH"
                  ? "bg-blue-500/10 text-blue-400"
                  : "bg-purple-500/10 text-purple-400"
              }`}
            >
              {application.type === "TECH" ? (
                <Code2 className="h-3 w-3" />
              ) : (
                <Users className="h-3 w-3" />
              )}
              {application.type}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                application.status === "SUBMITTED"
                  ? "bg-green-500/10 text-green-400"
                  : "bg-amber-500/10 text-amber-400"
              }`}
            >
              {application.status}
            </span>
          </div>
        </div>

        {/* Common Fields */}
        <DetailRow label="Scholar ID" value={application.scholarId} />
        <DetailRow label="WhatsApp Number" value={application.whatsappNumber} />
        <DetailRow label="Branch" value={application.branch} />

        {/* Tech Fields */}
        {application.type === "TECH" && (
          <>
            <DetailRow label="Tech Domain" value={application.techDomain} />
            <DetailRow
              label="Domain of Prior Project"
              value={application.domainOfPriorProject}
            />
            <DetailRow
              label="Resume Link"
              value={application.resumeLink}
              isLink
            />
            <DetailRow
              label="GitHub Profile"
              value={application.githubProfileLink}
              isLink
            />
            <DetailRow
              label="Task Selection"
              value={application.taskSelection?.replace(/_/g, " ")}
            />
            <DetailRow
              label="Task Preview"
              value={application.taskPreviewLink}
              isLink
            />
            <DetailRow
              label="Task GitHub Repo"
              value={application.taskGithubRepoLink}
              isLink
            />
            {/* UI/UX specific fields */}
            <DetailRow
              label="Project Developer Figma / Framer Link"
              value={application.projectFigmaLink}
              isLink
            />
            <DetailRow
              label="Prototype Figma / Framer Link"
              value={application.prototypeFigmaLink}
              isLink
            />
            <DetailRow
              label="Design Inspiration Document Link"
              value={application.designInspirationLink}
              isLink
            />
          </>
        )}

        {/* Other Teams Fields */}
        {application.type === "OTHER" && (
          <>
            <DetailRow
              label="Institute Email"
              value={application.instituteEmail}
            />
            <DetailRow
              label="Why Join E-Cell?"
              value={application.whyJoinECell}
            />
            <DetailRow
              label="Teams Applied"
              value={application.teamSelection?.join(", ")}
            />
            <DetailRow
              label="Past Contributions"
              value={application.pastContributions}
            />
            <DetailRow label="Other Clubs" value={application.otherClubs} />
          </>
        )}

        {/* Timestamps */}
        <div className="mt-6 border-t border-white/5 pt-4">
          <div className="flex gap-6 text-xs text-gray-600">
            <span>
              Created: {new Date(application.createdAt).toLocaleString()}
            </span>
            <span>
              Updated: {new Date(application.updatedAt).toLocaleString()}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

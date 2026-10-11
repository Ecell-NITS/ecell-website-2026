"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Heart, LockKeyhole, MessageCircle } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

interface LoginRequiredDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: "comment" | "like";
}

const actionContent = {
  comment: {
    icon: MessageCircle,
    title: "Join the conversation",
    description:
      "Sign in to share your thoughts. You’ll return to this story right after.",
  },
  like: {
    icon: Heart,
    title: "Show this story some love",
    description:
      "Sign in to like this story and let the author know you enjoyed it.",
  },
};

export default function LoginRequiredDialog({
  open,
  onOpenChange,
  action,
}: LoginRequiredDialogProps) {
  const router = useRouter();
  const content = actionContent[action];
  const ActionIcon = content.icon;

  const handleLogin = () => {
    sessionStorage.setItem(
      "postLoginRedirect",
      `${window.location.pathname}${window.location.search}${window.location.hash}`,
    );
    router.push("/login");
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 fixed inset-0 z-[100] bg-slate-950/75 backdrop-blur-sm" />
        <Dialog.Content className="data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 fixed top-1/2 left-1/2 z-[101] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-white/10 bg-[#080f20] p-6 text-white shadow-[0_24px_100px_-24px_rgba(0,0,0,0.85)] outline-none sm:p-8">
          <div className="pointer-events-none absolute -top-24 -right-16 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl" />

          <div className="relative">
            <div className="mb-6 flex items-start justify-between">
              <div className="flex size-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-300">
                <ActionIcon aria-hidden="true" size={21} />
              </div>
              <Dialog.Close
                aria-label="Close sign-in prompt"
                className="rounded-full p-2 text-slate-500 transition-colors hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
              >
                <span aria-hidden="true" className="text-xl leading-none">
                  ×
                </span>
              </Dialog.Close>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-blue-300/80 uppercase">
                <LockKeyhole aria-hidden="true" size={13} />
                E-Cell community
              </div>
              <Dialog.Title className="text-2xl font-semibold tracking-tight text-white">
                {content.title}
              </Dialog.Title>
              <Dialog.Description className="mt-3 text-sm leading-6 text-slate-400">
                {content.description}
              </Dialog.Description>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Dialog.Close className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-white/20 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none">
                Maybe later
              </Dialog.Close>
              <button
                type="button"
                onClick={handleLogin}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition-[background-color,transform,box-shadow] hover:-translate-y-0.5 hover:bg-blue-400 hover:shadow-blue-500/20 focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080f20] focus-visible:outline-none"
              >
                Sign in
                <ArrowRight aria-hidden="true" size={16} />
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// src/components/Dashboard/EditProfileClient.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiUser, FiArrowLeft } from "react-icons/fi";
import Image from "next/image";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";


export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  github: string;
  bio: string;
  role:string;
}

interface EditProfileClientProps {
  initialUser: User | null;
}


export function EditProfileClient({ initialUser }: EditProfileClientProps) {
  const router = useRouter();
  const [first_name, setName] = useState(initialUser?.name ?? "");
  const [nameInput, setNameInput] = useState("");
  const [post, setPost] = useState(initialUser?.role ?? "USER");
  const [about, setAbout] = useState(initialUser?.bio ?? "");
  const [facebook_profile, setFacebook] = useState(
    initialUser?.facebook ?? "",
  );
  const [instagram_handle, setInsta] = useState(
    initialUser?.instagram ?? "",
  );
  const [linkedin_profile, setLinkedIn] = useState(
    initialUser?.linkedin ?? "",
  );
  const [github, setGit] = useState(initialUser?.github ?? "");
  const [picture, setPicture] = useState(initialUser?.picture ?? "");
  const { refreshUser } = useAuth();
  const { user } = useAuth();
  const isSuperAdmin = user?.role === "SUPERADMIN";
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);





  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      const user = res.data.data.user;

      setName(user.name ?? "");
      setNameInput(user.name ?? "");
      setAbout(user.bio ?? "");
      setFacebook(user.facebook ?? "");
      setInsta(user.instagram ?? "");
      setLinkedIn(user.linkedin ?? "");
      setGit(user.github ?? "");
      setPicture(user.picture ?? "");
    } catch {
      toast.error("Failed to load profile");
    }
  };

  fetchUser();
}, []);



  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("name", nameInput);
    formData.append("bio", about);
    formData.append("facebook", facebook_profile);
    formData.append("instagram", instagram_handle);
    formData.append("linkedin", linkedin_profile);
    formData.append("github", github);

    if (isSuperAdmin) {
      formData.append("role", post);
    }

    // ✅ append image
    if (selectedFile) {
      formData.append("picture", selectedFile);
    }

    await api.patch("/auth/edit-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    await refreshUser();
    setName(nameInput);
    toast.success("Profile updated successfully");
    router.push("/dashboard");
  } catch {
    toast.error("Failed to update profile");
  }
};

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setSelectedFile(file);

  // preview
  const url = URL.createObjectURL(file);
  setPreview(url);
};


  return (
    <>
      {/* Banner Section */}
      <section className="relative overflow-hidden px-6 pt-32 pb-12 lg:px-8">
        <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-full w-full max-w-7xl -translate-x-1/2">
          <div className="absolute top-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]"></div>
        </div>

        <div className="mx-auto max-w-4xl animate-[fadeIn_0.5s_ease-out_forwards] opacity-0">
          <div className="flex items-center justify-end rounded-3xl backdrop-blur-md md:justify-between md:border md:border-white/10 md:bg-white/5 md:p-8">
            <div className="flex items-center gap-4">
              <div className="flex hidden size-12 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/20 md:flex">
                <FiUser className="size-6 text-white" />
              </div>
              <div>
                <h1 className="hidden text-3xl font-bold tracking-tight text-white md:block">
                  Profile Settings
                </h1>
                <p className="hidden text-gray-400 md:block">
                  Update your personal information and presence.
                </p>
              </div>
            </div>
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-6 py-2.5 font-semibold transition-all hover:bg-white/20"
            >
              <FiArrowLeft className="size-5" />
              Back
            </button>
          </div>
        </div>
      </section>

      {/* Profile Form Section */}
      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-4xl animate-[fadeIn_0.5s_ease-out_0.1s_forwards] opacity-0">
          <form
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md"
            onSubmit={handleSubmit}
          >
            <div className="border-b border-white/10 p-8 md:p-12">
              <div className="mb-12 flex flex-col items-center justify-center">
                <div className="group relative cursor-pointer">
  <input
    type="file"
    accept="image/*"
    className="hidden"
    id="profile-upload"
    onChange={handleImageChange}
  />

  <label htmlFor="profile-upload">
    <div className="size-36 overflow-hidden rounded-full border-4 border-blue-500 bg-[#111722] shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-transform hover:scale-105">
      <Image
        alt="Profile"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        src={
          preview ||
          picture ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        }

        width={144}
        height={144}
      />
    </div>

    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
      <span className="material-symbols-outlined text-3xl text-blue-500">
        photo_camera
      </span>
    </div>
  </label>
</div>

                <h3 className="mt-6 text-xl font-bold text-white">
                  {first_name || "User Name"}
                </h3>
                <p className="mt-1 text-sm font-medium tracking-widest text-blue-400 uppercase">
                  {post || "Position"}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-3">
                  <label
                    className="text-xs font-bold tracking-widest text-gray-500 uppercase"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <input
                    className="block w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white transition-all placeholder:text-gray-600 focus:border-blue-500 focus:bg-white/10 focus:outline-none"
                    id="fullName"
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}

                  />
                </div>
                <div className="space-y-3">
                  <label
                    className="text-xs font-bold tracking-widest text-gray-500 uppercase"
                    htmlFor="position"
                  >
                    Position
                  </label>
                  <input
                    className="block w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white transition-all placeholder:text-gray-600 focus:border-blue-500 focus:bg-white/10 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    id="position"
                    type="text"
                    value={post}
                    placeholder={isSuperAdmin ? "Enter position" : "No permission"}
                    onChange={(e) => setPost(e.target.value)}
                    disabled={!isSuperAdmin}
                  />

                </div>
                <div className="space-y-3 md:col-span-2">
                  <label
                    className="text-xs font-bold tracking-widest text-gray-500 uppercase"
                    htmlFor="about"
                  >
                    About Me
                  </label>
                  <textarea
                    className="block w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 leading-relaxed text-white transition-all placeholder:text-gray-600 focus:border-blue-500 focus:bg-white/10 focus:outline-none"
                    id="about"
                    value={about}
                    rows={5}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <h4 className="mb-8 flex items-center gap-3 text-lg font-bold tracking-widest text-blue-400 uppercase">
                <span className="material-symbols-outlined text-xl">share</span>
                Social Presence
              </h4>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {[
                  {
                    id: "facebook",
                    label: "Facebook",
                    value: facebook_profile,
                    setter: setFacebook,
                  },
                  {
                    id: "instagram",
                    label: "Instagram",
                    value: instagram_handle,
                    setter: setInsta,
                  },
                  {
                    id: "github",
                    label: "GitHub",
                    value: github,
                    setter: setGit,
                  },
                  {
                    id: "linkedin",
                    label: "LinkedIn",
                    value: linkedin_profile,
                    setter: setLinkedIn,
                  },
                ].map((social) => (
                  <div key={social.id} className="space-y-3">
                    <label
                      className="text-xs font-bold tracking-widest text-gray-500 uppercase"
                      htmlFor={social.id}
                    >
                      {social.label} URL
                    </label>
                    <input
                      className="block w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white transition-all placeholder:text-gray-600 focus:border-blue-500 focus:bg-white/10 focus:outline-none"
                      id={social.id}
                      type="url"
                      value={social.value}
                      onChange={(e) => social.setter(e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-12 flex flex-col-reverse justify-end gap-4 border-t border-white/5 pt-10 md:flex-row">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="rounded-2xl border border-white/10 px-8 py-3.5 font-bold text-gray-400 transition-all hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-10 py-3.5 font-bold text-white shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] hover:bg-blue-700 active:scale-[0.98]"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    save
                  </span>
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings:
            "FILL" 0,
            "wght" 400,
            "GRAD" 0,
            "opsz" 24;
        }
      `}</style>
    </>
  );
}

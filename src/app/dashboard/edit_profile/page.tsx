// src/app/dashboard/edit_profile/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Landing/Navbar";
import { motion } from "framer-motion";
import { FiUser, FiArrowLeft } from "react-icons/fi";
import Image from "next/image";

interface User {
  id: number;
  first_name: string;
  email: string;
  image: string;
  gender: string;
  post: string;
  age: number;
  country: string;
  facebook_profile: string;
  twitter_handle: string;
  instagram_handle: string;
  linkedin_profile: string;
  github: string;
  about: string;
}

export default function EditProfile() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [first_name, setName] = useState("");
  const [post, setPost] = useState("");
  const [about, setAbout] = useState("");
  const [facebook_profile, setFacebook] = useState("");
  const [instagram_handle, setInsta] = useState("");
  const [linkedin_profile, setLinkedIn] = useState("");
  const [github, setGit] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  useEffect(() => {
    void fetch("/MOCK_DATA.json")
      .then((res) => res.json())
      .then((data) => setUsers(data as User[]));
  }, []);

  useEffect(() => {
    if (users && users.length > 0) {
      const user = users[0];
      setName(user?.first_name ?? "");
      setPost(user?.post ?? "");
      setAbout(user?.about ?? "");
      setFacebook(user?.facebook_profile ?? "");
      setInsta(user?.instagram_handle ?? "");
      setLinkedIn(user?.linkedin_profile ?? "");
      setGit(user?.github ?? "");
    }
  }, [users]);

  return (
    <div className="min-h-screen bg-[#020617] text-white antialiased selection:bg-blue-500/30 selection:text-white">
      <Navbar />

      <main className="relative flex min-h-screen flex-col">
        {/* Banner Section */}
        <section className="relative overflow-hidden px-6 pt-32 pb-12 lg:px-8">
          <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-full w-full max-w-7xl -translate-x-1/2">
            <div className="absolute top-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl"
          >
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
          </motion.div>
        </section>

        {/* Profile Form Section */}
        <section className="px-6 pb-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl"
          >
            <form
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md"
              onSubmit={handleSubmit}
            >
              <div className="border-b border-white/10 p-8 md:p-12">
                <div className="mb-12 flex flex-col items-center justify-center">
                  <div className="group relative cursor-pointer">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="size-36 overflow-hidden rounded-full border-4 border-blue-500 bg-[#111722] shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                    >
                      <Image
                        alt="Profile"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={
                          users[0]?.image ??
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        width={144}
                        height={144}
                      />
                    </motion.div>
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="material-symbols-outlined text-3xl text-blue-500">
                        photo_camera
                      </span>
                    </div>
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
                      value={first_name}
                      onChange={(e) => setName(e.target.value)}
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
                      className="block w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white transition-all placeholder:text-gray-600 focus:border-blue-500 focus:bg-white/10 focus:outline-none"
                      id="position"
                      type="text"
                      value={post}
                      onChange={(e) => setPost(e.target.value)}
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
                  <span className="material-symbols-outlined text-xl">
                    share
                  </span>
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
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-10 py-3.5 font-bold text-white shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-700"
                    type="submit"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      save
                    </span>
                    Save Changes
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>
        </section>
      </main>

      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings:
            "FILL" 0,
            "wght" 400,
            "GRAD" 0,
            "opsz" 24;
        }
      `}</style>
    </div>
  );
}

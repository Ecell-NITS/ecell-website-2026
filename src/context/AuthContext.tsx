/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-floating-promises */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";
import { setAccessToken } from "@/lib/token";

interface User {
  role: string;
  id: number;
  name: string;
  email: string;
  picture: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  github: string;
  bio: string;
  blogs: Blog[];
}
type Blog = {
  id: number;
  title: string;
  brief_intro: string;
  read_time: string;
  category: string;
  likes: number;
  comments: number;
  is_liked: boolean;
  cover_image: string;
  details: string;
  posted_on: string;
  tag: string;
  intro: string;
  content: string;
  timeStamp: string;
  topicPic: string;
  isAccepted: boolean;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User, token: string) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem("accessToken", token);
    setAccessToken(token); // ⭐ REQUIRED
    document.cookie = `accessToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
  };

  const refreshUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.data.user);
    } catch {
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // optional: ignore backend failure
    }

    localStorage.removeItem("accessToken"); // ✅ remove
    setAccessToken("");
    document.cookie = "accessToken=; path=/; max-age=0";
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};

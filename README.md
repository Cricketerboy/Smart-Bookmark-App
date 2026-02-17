# Smart Bookmark Manager

A simple and secure bookmark management application built with **Next.js (App Router)** and **Supabase**.

Users can authenticate with Google, add bookmarks, delete them, and sync updates across multiple tabs.

---

## 🚀 Tech Stack

- Next.js (App Router)
- Supabase (Auth + PostgreSQL)
- Tailwind CSS
- TypeScript

---

## ✨ Features

- Google Authentication (OAuth)
- Private bookmarks using Row Level Security (RLS)
- Add & Delete bookmarks instantly
- Multi-tab sync using BroadcastChannel
- Clean and minimal UI

---


## Problems Faced & How They Were Solved

- Problem: Realtime subscription failed with CHANNEL_ERROR and connection status showed CLOSED
- Cause: Supabase Realtime + Row Level Security (RLS) + JWT authentication caused websocket authorization conflicts.
- Solution: Instead of continuing with unstable websocket configuration, I replaced Supabase Realtime with the browser-native BroadcastChannel API for multi-tab synchronization.This provided instant updates without backend realtime configuration complexity.

---

## Getting Started 
First, run the development server:

bash
npm run dev

export type Theme = "default" | "dark";
export type Accent = "amber" | "blue" | "pink" | "rose" | "emerald" | "black";
export type TaskStatus = "todo" | "in_progress" | "done" | "on_hold";
export type Priority = "No Priority" | "Urgent" | "High" | "Medium" | "Low";
export type User = { id: string; email: string; name: string; title: string; username: string; theme: Theme };
export type Task = { id: string; title: string; description: string; status: TaskStatus; priority: Priority; tags: string[]; assignee: string; due: string; createdAt: string; updatedAt: string };

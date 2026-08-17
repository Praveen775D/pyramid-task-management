"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, ChevronRight, Moon, Palette, Pencil, Search, Settings, Sun } from "lucide-react";
import { authApi } from "@/lib/api";
import { User } from "@/lib/types";
import { useTheme } from "@/components/theme/ThemeProvider";
import type { Accent } from "@/components/theme/ThemeProvider";

type Field = "name" | "title" | "username";
const colors: { name: string; value: Accent; cls: string }[] = [
  { name: "Amber", value: "amber", cls: "bg-amber-500" },
  { name: "Blue", value: "blue", cls: "bg-blue-500" },
  { name: "Pink", value: "pink", cls: "bg-pink-500" },
  { name: "Rose", value: "rose", cls: "bg-rose-500" },
  { name: "Emerald", value: "emerald", cls: "bg-emerald-600" },
  { name: "Black", value: "black", cls: "bg-neutral-900" },
];

export default function ProfilePage() {
  const [user, setUser] = useState<User>({ id: "1", email: "dexter@gmail.com", name: "Dexter", title: "Designer", username: "Dexuser", theme: "default" });
  const [editing, setEditing] = useState<Field | null>(null);
  const [draft, setDraft] = useState("");
  const [menu, setMenu] = useState<"none" | "theme" | "color">("none");
  const { theme, setTheme, accent, setAccent } = useTheme();

  useEffect(() => { authApi.me().then(setUser).catch(() => {}); }, []);

  function startEdit(field: Field) { setEditing(field); setDraft(user[field]); }
  async function save(field: Field) {
    const value = draft.trim();
    if (!value) return;
    try {
      const updated = await authApi.updateProfile({ name: field === "name" ? value : undefined, title: field === "title" ? value : undefined, username: field === "username" ? value : undefined });
      setUser(updated);
    } catch { setUser({ ...user, [field]: value }); }
    setEditing(null);
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[192px] shrink-0 border-r border-[var(--border)] bg-[var(--sidebar)] p-2 lg:block">
          <Link href="/tasks" className="flex h-8 items-center gap-1 rounded px-2 text-[10px] hover:bg-[var(--surface)]"><ArrowLeft className="size-3"/> Back to app</Link>
          <div className="relative my-2">
            <Search className="absolute left-2 top-1/2 size-3 -translate-y-1/2 text-[var(--muted)]"/>
            <input placeholder="Search" className="h-7 w-full rounded border border-[var(--border)] bg-[var(--surface)] pl-7 text-[9px] outline-none focus-accent"/>
          </div>
          <div className="rounded-md bg-[var(--surface-soft)] px-2 py-2 text-[10px] font-medium shadow-[inset_2px_0_0_var(--accent)]">Profile</div>
          <button onClick={() => setMenu(menu === "theme" ? "none" : "theme")} className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-[10px] hover:bg-[var(--surface)]"><Sun className="size-3"/> Theme <ChevronRight className="ml-auto size-3"/></button>
          {menu === "theme" && <div className="ml-2 rounded-md border border-[var(--border)] bg-[var(--surface)] p-1 shadow-md dropdown-enter">
            <button onClick={() => setTheme("default")} className="menu-row"><Sun className="size-3"/> Light {theme === "default" && <Check className="ml-auto size-3"/>}</button>
            <button onClick={() => setTheme("dark")} className="menu-row"><Moon className="size-3"/> Dark {theme === "dark" && <Check className="ml-auto size-3"/>}</button>
          </div>}
          <button onClick={() => setMenu(menu === "color" ? "none" : "color")} className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-[10px] hover:bg-[var(--surface)]"><Palette className="size-3"/> Color <ChevronRight className="ml-auto size-3"/></button>
          {menu === "color" && <div className="ml-2 rounded-md border border-[var(--border)] bg-[var(--surface)] p-1 shadow-md dropdown-enter">
            {colors.map(c => <button key={c.value} onClick={() => setAccent(c.value)} className="menu-row"><span className={`size-3 rounded-sm ${c.cls}`}/>{c.name}{accent === c.value && <Check className="ml-auto size-3"/>}</button>)}
          </div>}
          <Link href="/profile" className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-[10px] hover:bg-[var(--surface)]"><Settings className="size-3"/> Settings</Link>
        </aside>

        <main className="flex-1 px-5 py-12 lg:px-10">
          <div className="mx-auto max-w-[850px]">
            <div className="mb-6 flex items-center gap-4">
              <span className="avatar-glow grid size-9 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 via-purple-500 to-cyan-400 text-[10px] font-bold text-white">D</span>
              <div><h1 className="text-[20px] font-semibold tracking-tight">Profile</h1><p className="mt-1 text-[10px] text-[var(--muted)]">Manage your personal information and workspace access.</p></div>
            </div>

            <section className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_1px_2px_rgba(0,0,0,.03)]">
              <ProfileRow label="Profile picture"><span className="avatar-glow grid size-10 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 via-purple-500 to-cyan-400 text-[10px] font-bold text-white">D</span></ProfileRow>
              <ProfileRow label="Email"><div className="flex items-center gap-2 text-[10px] text-[var(--muted)]">{user.email}<Pencil className="size-3 text-[var(--muted)]"/></div></ProfileRow>
              <EditableRow label="Full name" value={user.name} editing={editing === "name"} draft={draft} onEdit={() => startEdit("name")} onChange={setDraft} onSave={() => save("name")} />
              <EditableRow label="Title" description="Your job title or role" value={user.title} editing={editing === "title"} draft={draft} onEdit={() => startEdit("title")} onChange={setDraft} onSave={() => save("title")} />
              <EditableRow last label="Username" description="One word, like a nickname or first name" value={user.username} editing={editing === "username"} draft={draft} onEdit={() => startEdit("username")} onChange={setDraft} onSave={() => save("username")} />
            </section>

            <h2 className="mt-9 text-[12px] font-semibold">Workspace access</h2>
            <div className="mt-4 flex min-h-[68px] items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4">
              <span className="text-[9px] text-[var(--muted)]">Remove yourself from the workspace</span>
              <button className="rounded-md bg-[var(--danger-bg)] px-3 py-2 text-[9px] font-medium text-[var(--danger)] hover:brightness-95 active:scale-[.98]">Leave Workspace</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ProfileRow({label, children, last=false}:{label:string;children:React.ReactNode;last?:boolean}) {
  return <div className={`flex min-h-[64px] items-center justify-between px-4 ${last ? "" : "border-b border-[var(--border)]"}`}><div className="text-[9px] font-medium">{label}</div>{children}</div>;
}

function EditableRow({label,description,value,editing,draft,onEdit,onChange,onSave,last=false}:{label:string;description?:string;value:string;editing:boolean;draft:string;onEdit:()=>void;onChange:(v:string)=>void;onSave:()=>void;last?:boolean}) {
  return <div className={`flex min-h-[76px] items-center justify-between px-4 ${last ? "" : "border-b border-[var(--border)]"}`}>
    <div><div className="text-[9px] font-medium">{label}</div>{description&&<div className="mt-1 text-[8px] text-[var(--muted)]">{description}</div>}</div>
    {editing ? <div className="flex items-center gap-1.5"><input autoFocus value={draft} onChange={e=>onChange(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")onSave();if(e.key==="Escape")onEdit();}} className="focus-accent w-[150px] rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[10px] outline-none"/><button onClick={onSave} className="grid size-8 place-items-center rounded-md bg-[var(--accent)] text-white hover:brightness-95 active:scale-95"><Check className="size-3.5"/></button></div> : <button onClick={onEdit} className="group flex items-center gap-2 rounded-md bg-[var(--surface-soft)] px-3 py-2 text-[10px] text-[var(--muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--foreground)]">{value}<Pencil className="size-3 opacity-0 transition-opacity group-hover:opacity-100"/></button>}
  </div>;
}

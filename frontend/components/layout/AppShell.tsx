
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Grid2X2, Menu, Moon, Palette, Settings, Sun, X, Search, Sparkles } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import type { Accent } from "@/components/theme/ThemeProvider";

const accentColors: { name: string; value: Accent; className: string }[] = [
  { name: "Amber", value: "amber", className: "bg-amber-500" },
  { name: "Blue", value: "blue", className: "bg-blue-500" },
  { name: "Pink", value: "pink", className: "bg-pink-500" },
  { name: "Rose", value: "rose", className: "bg-rose-500" },
  { name: "Emerald", value: "emerald", className: "bg-emerald-600" },
  { name: "Black", value: "black", className: "bg-neutral-900" },
];


export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [panel, setPanel] = useState<"main" | "theme" | "color">("main");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, accent, setAccent } = useTheme();

  useEffect(() => setMounted(true), []);

  function closeProfile() {
    setProfileOpen(false);
    setPanel("main");
  }

  const nav = (
    <aside className="relative flex h-full w-full flex-col bg-[var(--sidebar)] text-[var(--foreground)]">
      <div className="border-b border-[var(--border)] p-2">
        <button
          onClick={() => { setProfileOpen(v => !v); setPanel("main"); }}
          className="group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-all duration-200 hover:bg-[var(--surface-soft)] active:scale-[.99]"
          aria-expanded={profileOpen}
        >
          <span className="avatar-glow grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-fuchsia-500 via-purple-500 to-cyan-400 text-[10px] font-bold text-white">D</span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[11px] font-semibold">Dexter</span>
          </span>
          <ChevronDown className={`size-3 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
        </button>

        {profileOpen && (
          <div className="dropdown-enter absolute left-2 top-[52px] z-50 w-[208px] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-[0_14px_38px_rgba(0,0,0,.14)]">
            {panel === "main" && (
              <>
                <Link href="/profile" onClick={closeProfile} className="block border-b border-[var(--border)] p-4 text-center transition-colors hover:bg-[var(--surface-soft)]">
                  <span className="avatar-glow mx-auto grid size-10 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 via-purple-500 to-cyan-400 text-[10px] font-bold text-white">D</span>
                  <span className="mt-2 block text-[11px] font-semibold">Dexter</span>
                  <span className="block text-[9px] text-[var(--muted)]">Dexter@gmail.com</span>
                </Link>
                <button onClick={() => setPanel("theme")} className="menu-row"><Sun className="size-3.5" /> Change Theme <span className="ml-auto">›</span></button>
                <button onClick={() => setPanel("color")} className="menu-row"><Palette className="size-3.5" /> Color Mode <span className="ml-auto">›</span></button>
                <Link href="/profile" onClick={closeProfile} className="menu-row"><Settings className="size-3.5" /> Settings</Link>
              </>
            )}
            {panel === "theme" && (
              <div className="p-2">
                <button onClick={() => setPanel("main")} className="mb-1 px-2 py-1 text-[9px] text-[var(--muted)] hover:text-[var(--foreground)]">← Change Theme</button>
                <button onClick={() => setTheme("default")} className="menu-row"><Sun className="size-3.5"/>Light{theme === "default" && <span className="ml-auto">✓</span>}</button>
                <button onClick={() => setTheme("dark")} className="menu-row"><Moon className="size-3.5"/>Dark{theme === "dark" && <span className="ml-auto">✓</span>}</button>
              </div>
            )}
            {panel === "color" && (
              <div className="p-2">
                <button onClick={() => setPanel("main")} className="mb-1 px-2 py-1 text-[9px] text-[var(--muted)] hover:text-[var(--foreground)]">← Color Mode</button>
                <div className="px-2 pb-1 text-[9px] text-[var(--muted)]">Color Mode</div>
                {accentColors.map(c => (
                  <button key={c.value} onClick={() => setAccent(c.value)} className="menu-row">
                    <span className={`size-3 rounded-sm ${c.className}`} />{c.name}{mounted && accent === c.value && <span className="ml-auto">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="px-2 py-4">
        <div className="mb-1 flex items-center justify-between px-2 text-[10px] text-[var(--muted)]">
          <span>Workspace</span><ChevronDown className="size-3" />
        </div>
        <Link href="/tasks" onClick={() => setMobileOpen(false)} className="nav-item nav-active"><Grid2X2 className="size-3" />Tasks</Link>
        <Link href="/projects" onClick={() => setMobileOpen(false)} className="nav-item"><span className="size-3 rounded-sm border border-current opacity-70" />Projects</Link>
      </div>

      <div className="mt-auto border-t border-[var(--border)] p-3 text-[9px] text-[var(--muted)]">
        <div className="flex items-center gap-2"><Sparkles className="size-3 text-[var(--accent)]"/>Pyramid workspace</div>
      </div>
    </aside>
  );

  return <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
    <div className="flex min-h-screen">
      <div className="hidden w-[240px] shrink-0 border-r border-[var(--border)] lg:block">{nav}</div>
      {mobileOpen && <div className="fixed inset-0 z-50 lg:hidden"><button className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" onClick={() => setMobileOpen(false)} /><div className="relative h-full w-[240px] shadow-xl">{nav}<button onClick={() => setMobileOpen(false)} className="absolute right-1 top-1 grid size-7 place-items-center"><X className="size-4" /></button></div></div>}
      <main className="min-w-0 flex-1">
        <div className="sticky top-0 z-20 flex h-9 items-center border-b border-[var(--border)] bg-[var(--surface)] px-2 lg:hidden">
          <button onClick={() => setMobileOpen(true)} className="rounded p-1 hover:bg-[var(--surface-soft)]"><Menu className="size-4" /></button>
          <Search className="ml-auto size-3.5 text-[var(--muted)]" />
        </div>
        {children}
      </main>
    </div>
  </div>;
}

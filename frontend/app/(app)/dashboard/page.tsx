"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Filter,
  Plus,
  X,
  Check,
  MoreHorizontal,
  CalendarDays,
  Tag,
  GripVertical,
  LayoutList,
  KanbanSquare,
} from "lucide-react";

import { taskApi } from "@/lib/api";
import type { Task, TaskStatus, Priority } from "@/lib/types";

const statuses: [TaskStatus, string][] = [
  ["todo", "To Do"],
  ["in_progress", "Doing"],
  ["done", "Completed"],
  ["on_hold", "On Hold"],
];

const seed: Task[] = [
  {
    id: "1",
    title: "Write API Documentation",
    status: "todo",
    priority: "High",
    assignee: "Admin",
    due: "29 Jul",
    tags: ["Deployment"],
    description: "",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    title: "Implement Search Function",
    status: "todo",
    priority: "High",
    assignee: "Admin",
    due: "29 Jul",
    tags: ["Deployment"],
    description: "",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    title: "Deploy to Production",
    status: "todo",
    priority: "High",
    assignee: "Admin",
    due: "29 Jul",
    tags: ["Deployment"],
    description: "",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    title: "Code Review Completed",
    status: "in_progress",
    priority: "High",
    assignee: "Admin",
    due: "29 Jul",
    tags: ["Deployment"],
    description: "",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "5",
    title: "Design Mockups Finalized",
    status: "in_progress",
    priority: "High",
    assignee: "Admin",
    due: "29 Jul",
    tags: ["Deployment"],
    description: "",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "6",
    title: "Feature Testing Passed",
    status: "done",
    priority: "Medium",
    assignee: "QA Team",
    due: "30 Jul",
    tags: ["Testing", "Passed"],
    description: "",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "7",
    title: "UI Design Updated",
    status: "done",
    priority: "Low",
    assignee: "Designer",
    due: "31 Jul",
    tags: ["Design", "Updated"],
    description: "",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "8",
    title: "Security Audit Scheduled",
    status: "done",
    priority: "Medium",
    assignee: "Security",
    due: "01 Aug",
    tags: ["Audit", "Scheduled"],
    description: "",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "9",
    title: "UI Review",
    status: "on_hold",
    priority: "Low",
    assignee: "Designer",
    due: "01 Aug",
    tags: ["Review"],
    description: "",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "10",
    title: "Backend Integration",
    status: "on_hold",
    priority: "Medium",
    assignee: "Dev Team",
    due: "02 Aug",
    tags: ["Development"],
    description: "",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "11",
    title: "User Feedback",
    status: "on_hold",
    priority: "Low",
    assignee: "Product",
    due: "03 Aug",
    tags: ["Research"],
    description: "",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "12",
    title: "Performance Review",
    status: "on_hold",
    priority: "High",
    assignee: "Engineering",
    due: "04 Aug",
    tags: ["Optimization"],
    description: "",
    createdAt: "",
    updatedAt: "",
  },
];

type Fields = {
  Priority: boolean;
  Members: boolean;
  "Due Date": boolean;
  Labels: boolean;
  Status: boolean;
  Reporter: boolean;
};

const initialFields: Fields = {
  Priority: true,
  Members: true,
  "Due Date": true,
  Labels: true,
  Status: true,
  Reporter: false,
};

type FilterState = {
  status: string;
  priority: string;
  member: string;
  label: string;
};

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(seed);
  const [view, setView] = useState<"board" | "list">("board");
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);

  const [fields, setFields] = useState<Fields>(initialFields);
  const [fieldOpen, setFieldOpen] = useState(false);

  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState<FilterState>({
    status: "All",
    priority: "All",
    member: "All",
    label: "All",
  });

  const [filterSection, setFilterSection] = useState<string | null>(null);
  const [add, setAdd] = useState(false);

  const [dragId, setDragId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    taskApi
      .list()
      .then((items) => {
        if (items?.length) {
          setTasks(items as Task[]);
        }
      })
      .catch(() => {
        // Use local seed data if backend is unavailable.
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    return tasks.filter((task) => {
      const q = query.trim().toLowerCase();

      const matchesSearch =
        !q ||
        task.title.toLowerCase().includes(q) ||
        task.tags.some((tag) => tag.toLowerCase().includes(q));

      const matchesStatus =
        filter.status === "All" || task.status === filter.status;

      const matchesPriority =
        filter.priority === "All" || task.priority === filter.priority;

      const matchesMember =
        filter.member === "All" || task.assignee === filter.member;

      const matchesLabel =
        filter.label === "All" || task.tags.includes(filter.label);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesMember &&
        matchesLabel
      );
    });
  }, [tasks, query, filter]);

  async function patch(id: string, body: Partial<Task>) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, ...body } : task
      )
    );

    try {
      const updated = await taskApi.update(id, body);

      setTasks((current) =>
        current.map((task) => (task.id === id ? updated : task))
      );
    } catch {
      // Keep optimistic update if API is unavailable.
    }
  }

  async function create(data: {
    title: string;
    description: string;
    priority: Priority;
    assignee: string;
    due: string;
    tags: string[];
  }) {
    try {
      const created = await taskApi.create(data);
      setTasks((current) => [created, ...current]);
    } catch {
      const fallback: Task = {
        ...seed[0],
        ...data,
        id: crypto.randomUUID(),
        status: "todo",
      };

      setTasks((current) => [fallback, ...current]);
    }

    setAdd(false);
  }

  return (
    <div className="min-h-[calc(100vh-36px)] bg-[var(--background)] p-4 text-[var(--foreground)] lg:p-5">
      <header className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-[14px] font-semibold">Tasks</h1>

          <p className="mt-1 text-[9px] text-[var(--muted)]">
            Manage work across your workspace
          </p>
        </div>

        <div className="relative flex items-center gap-1.5">
          {search && (
            <div className="flex h-8 w-56 items-center rounded-md border bg-[var(--surface)] px-2 shadow-sm">
              <Search className="size-3.5 text-[var(--muted)]" />

              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search tasks"
                className="w-full bg-transparent px-2 text-[10px] outline-none"
              />

              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSearch(false);
                }}
              >
                <X className="size-3" />
              </button>
            </div>
          )}

          {!search && (
            <button
              type="button"
              onClick={() => setSearch(true)}
              className="icon-btn"
              aria-label="Search tasks"
            >
              <Search />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setFieldOpen((open) => !open);
              setFilterOpen(false);
            }}
            className="toolbar-btn"
          >
            <SlidersHorizontal />
            Fields
          </button>

          <button
            type="button"
            onClick={() => {
              setFilterOpen((open) => !open);
              setFieldOpen(false);
            }}
            className={`icon-btn ${
              filterOpen ? "accent-border" : ""
            }`}
            aria-label="Filter tasks"
          >
            <Filter />
          </button>

          <button
            type="button"
            onClick={() => setAdd(true)}
            className="toolbar-primary"
          >
            <Plus />
            Add Task
          </button>

          {fieldOpen && (
            <FieldsMenu
              view={view}
              setView={setView}
              fields={fields}
              setFields={setFields}
            />
          )}

          {filterOpen && (
            <FilterMenu
              filter={filter}
              setFilter={setFilter}
              active={filterSection}
              setActive={setFilterSection}
            />
          )}
        </div>
      </header>

      {loading && (
        <div className="mb-3 h-1 overflow-hidden rounded bg-[var(--surface-soft)]">
          <div className="h-full w-1/3 animate-pulse bg-[var(--accent)]" />
        </div>
      )}

      {view === "board" ? (
        <Board
          tasks={filtered}
          onPatch={patch}
          dragId={dragId}
          setDragId={setDragId}
        />
      ) : (
        <List
          tasks={filtered}
          fields={fields}
          onPatch={patch}
        />
      )}

      {add && (
        <AddTask
          onClose={() => setAdd(false)}
          onCreate={create}
        />
      )}
    </div>
  );
}

function FieldsMenu({
  view,
  setView,
  fields,
  setFields,
}: {
  view: "board" | "list";
  setView: (value: "board" | "list") => void;
  fields: Fields;
  setFields: (value: Fields) => void;
}) {
  return (
    <div className="dropdown-enter popover right-[104px] top-10 w-[245px]">
      <div className="mb-1 grid grid-cols-2 gap-1 rounded-md bg-[var(--surface-soft)] p-1">
        <button
          type="button"
          onClick={() => setView("list")}
          className={`h-7 rounded text-[10px] ${
            view === "list"
              ? "bg-[var(--surface)] shadow-sm"
              : ""
          }`}
        >
          <LayoutList className="mr-1 inline size-3" />
          List
        </button>

        <button
          type="button"
          onClick={() => setView("board")}
          className={`h-7 rounded text-[10px] ${
            view === "board"
              ? "bg-[var(--surface)] shadow-sm"
              : ""
          }`}
        >
          <KanbanSquare className="mr-1 inline size-3" />
          Board
        </button>
      </div>

      {Object.keys(fields).map((key) => {
        const field = key as keyof Fields;
        const enabled = fields[field];

        return (
          <button
            type="button"
            key={key}
            onClick={() =>
              setFields({
                ...fields,
                [field]: !enabled,
              })
            }
            className="menu-row"
          >
            <span className="flex-1">{key}</span>

            <span
              className={`grid size-3.5 place-items-center rounded border ${
                enabled
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                  : "border-[#d4d4d4]"
              }`}
            >
              {enabled && <Check className="size-2.5" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function FilterMenu({
  filter,
  setFilter,
  active,
  setActive,
}: {
  filter: FilterState;
  setFilter: (value: FilterState) => void;
  active: string | null;
  setActive: (value: string | null) => void;
}) {
  const groups: Record<string, string[]> = {
    Status: ["All", "todo", "in_progress", "done", "on_hold"],
    Priority: ["All", "Urgent", "High", "Medium", "Low"],
    Members: [
      "All",
      "Admin",
      "QA Team",
      "Designer",
      "Security",
      "Product",
      "Dev Team",
      "Engineering",
    ],
    Labels: [
      "All",
      "Deployment",
      "Testing",
      "Design",
      "Audit",
      "Research",
      "Optimization",
    ],
  };

  function filterKey(group: string): keyof FilterState {
    if (group === "Status") return "status";
    if (group === "Priority") return "priority";
    if (group === "Members") return "member";
    return "label";
  }

  return (
    <div className="dropdown-enter popover right-[52px] top-10 w-[230px]">
      {Object.entries(groups).map(([group, values]) => (
        <div key={group}>
          <button
            type="button"
            className="menu-row"
            onClick={() =>
              setActive(active === group ? null : group)
            }
          >
            <span>{group}</span>
            <span className="ml-auto">›</span>
          </button>

          {active === group && (
            <div className="mx-2 mb-1 rounded-md bg-[var(--surface-soft)] p-1">
              {values.map((value) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => {
                    setFilter({
                      ...filter,
                      [filterKey(group)]: value,
                    });

                    setActive(null);
                  }}
                  className="flex w-full rounded px-2 py-1.5 text-left text-[9px] hover:bg-[var(--surface)]"
                >
                  {value}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Board({
  tasks,
  onPatch,
  dragId,
  setDragId,
}: {
  tasks: Task[];
  onPatch: (id: string, body: Partial<Task>) => void;
  dragId: string | null;
  setDragId: (id: string | null) => void;
}) {
  return (
    <div className="overflow-x-auto pb-5">
      <div className="flex min-w-[1160px] gap-3">
        {statuses.map(([status, label]) => {
          const items = tasks.filter(
            (task) => task.status === status
          );

          return (
            <section
              key={status}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (dragId) {
                  onPatch(dragId, { status });
                  setDragId(null);
                }
              }}
              className="w-[289px] shrink-0 rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] p-2 shadow-sm"
            >
              <div className="mb-2 flex items-center gap-2 px-1 text-[10px] font-semibold">
                <GripVertical className="size-3 text-[var(--muted)]" />

                {label}

                <span className="ml-auto text-[var(--muted)]">
                  {items.length}
                </span>

                <button
                  type="button"
                  className="grid size-5 place-items-center rounded hover:bg-[var(--surface)]"
                  aria-label={`Add task to ${label}`}
                >
                  <Plus className="size-3" />
                </button>

                <MoreHorizontal className="size-3 text-[var(--muted)]" />
              </div>

              {items.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onPatch={onPatch}
                  onDrag={() => setDragId(task.id)}
                />
              ))}

              <button
                type="button"
                className="mt-1 flex h-7 w-full items-center gap-1 rounded px-2 text-[9px] text-[var(--muted)] hover:bg-[var(--surface)]"
              >
                <Plus className="size-3" />
                Add Task
              </button>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function TaskCard({
  task,
  onPatch,
  onDrag,
}: {
  task: Task;
  onPatch: (id: string, body: Partial<Task>) => void;
  onDrag: () => void;
}) {
  return (
    <Link
      href={`/tasks/${task.id}`}
      draggable
      onDragStart={onDrag}
      className="group mb-2 block rounded-md border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[0_1px_2px_rgba(0,0,0,.03)] transition hover:-translate-y-px hover:shadow-md"
    >
      <div className="flex gap-2">
        <div className="min-w-0 flex-1">
          <div className="truncate text-[10px] font-medium">
            {task.title}
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-[8px] text-[var(--muted)]">
            <span className="avatar-mini">
              {task.assignee?.[0] ?? "A"}
            </span>

            {task.assignee}
          </div>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            onPatch(task.id, {
              status:
                task.status === "done" ? "todo" : "done",
            });
          }}
          className="opacity-0 transition group-hover:opacity-100"
          aria-label="Complete task"
        >
          <Check className="size-3" />
        </button>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-1">
        {task.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="chip">
            <Tag className="size-2.5" />
            {tag}
          </span>
        ))}

        <span
          className={`ml-auto chip ${
            task.priority === "High" ||
            task.priority === "Urgent"
              ? "bg-red-50 text-red-500"
              : ""
          }`}
        >
          <CalendarDays className="size-2.5" />
          {task.due}
        </span>
      </div>
    </Link>
  );
}

function List({
  tasks,
  fields,
  onPatch,
}: {
  tasks: Task[];
  fields: Fields;
  onPatch: (id: string, body: Partial<Task>) => void;
}) {
  return (
    <div className="space-y-3">
      {statuses.map(([status, label]) => {
        const items = tasks.filter(
          (task) => task.status === status
        );

        const columns = [
          "1fr",
          fields.Priority ? "120px" : "",
          fields.Members ? "120px" : "",
          fields["Due Date"] ? "120px" : "",
          "38px",
        ].filter(Boolean);

        const gridTemplate = columns.join(" ");

        return (
          <section
            key={status}
            className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]"
          >
            <div className="flex h-8 items-center gap-2 border-b bg-[var(--surface-soft)] px-3 text-[9px] font-semibold">
              <span>⌄</span>

              {label}

              <span className="text-[var(--muted)]">
                {items.length}
              </span>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[500px]">
                <div
                  style={{
                    gridTemplateColumns: gridTemplate,
                  }}
                  className="grid bg-[var(--surface-soft)] text-[9px] font-medium"
                >
                  <div className="px-3 py-2">
                    Task
                  </div>

                  {fields.Priority && (
                    <div className="px-3 py-2">
                      Priority
                    </div>
                  )}

                  {fields.Members && (
                    <div className="px-3 py-2">
                      Members
                    </div>
                  )}

                  {fields["Due Date"] && (
                    <div className="px-3 py-2">
                      Due Date
                    </div>
                  )}

                  <div className="px-3 py-2">
                    Actions
                  </div>
                </div>

                {items.map((task) => (
                  <div
                    key={task.id}
                    style={{
                      gridTemplateColumns: gridTemplate,
                    }}
                    className="grid border-t text-[9px]"
                  >
                    <Link
                      href={`/tasks/${task.id}`}
                      className="truncate px-3 py-3 font-medium hover:text-[var(--accent)]"
                    >
                      {task.title}
                    </Link>

                    {fields.Priority && (
                      <button
                        type="button"
                        onClick={() =>
                          onPatch(task.id, {
                            priority:
                              task.priority === "High"
                                ? "Medium"
                                : "High",
                          })
                        }
                        className="px-3 py-3 text-left"
                      >
                        {task.priority}
                      </button>
                    )}

                    {fields.Members && (
                      <div className="px-3 py-3">
                        <span className="avatar-mini">
                          {task.assignee?.[0] ?? "A"}
                        </span>{" "}
                        {task.assignee}
                      </div>
                    )}

                    {fields["Due Date"] && (
                      <div className="px-3 py-3">
                        {task.due}
                      </div>
                    )}

                    <button
                      type="button"
                      className="px-2 py-3"
                      aria-label="More actions"
                    >
                      <MoreHorizontal className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="px-3 py-2 text-[9px] text-[var(--muted)]"
            >
              <Plus className="mr-1 inline size-3" />
              Add Task
            </button>
          </section>
        );
      })}
    </div>
  );
}

function AddTask({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (data: {
    title: string;
    description: string;
    priority: Priority;
    assignee: string;
    due: string;
    tags: string[];
  }) => void;
}) {
  const [data, setData] = useState({
    title: "",
    description: "",
    priority: "High" as Priority,
    assignee: "Admin",
    due: "12 Sep 2026",
    tags: ["Deployment"],
  });

  function update<K extends keyof typeof data>(
    key: K,
    value: (typeof data)[K]
  ) {
    setData((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/25 p-4 backdrop-blur-[1px]"
      onMouseDown={onClose}
    >
      <div
        onMouseDown={(event) => event.stopPropagation()}
        className="w-full max-w-[430px] rounded-xl border bg-[var(--surface)] p-5 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-[14px] font-semibold">
              Add Task
            </h2>

            <p className="text-[9px] text-[var(--muted)]">
              Create a task and assign it to your workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        <label className="label">
          Task name

          <input
            autoFocus
            value={data.title}
            onChange={(event) =>
              update("title", event.target.value)
            }
            className="input"
            placeholder="Design Homepage"
          />
        </label>

        <label className="label">
          Description

          <textarea
            value={data.description}
            onChange={(event) =>
              update("description", event.target.value)
            }
            className="input min-h-20 py-2"
            placeholder="Describe the task..."
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="label">
            Priority

            <select
              value={data.priority}
              onChange={(event) =>
                update(
                  "priority",
                  event.target.value as Priority
                )
              }
              className="input"
            >
              <option>Urgent</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
              <option>No Priority</option>
            </select>
          </label>

          <label className="label">
            Members

            <select
              value={data.assignee}
              onChange={(event) =>
                update("assignee", event.target.value)
              }
              className="input"
            >
              <option>Admin</option>
              <option>Designer</option>
              <option>QA Team</option>
              <option>Security</option>
              <option>Product</option>
              <option>Dev Team</option>
              <option>Engineering</option>
            </select>
          </label>
        </div>

        <label className="label">
          Due date

          <input
            type="date"
            onChange={(event) => {
              if (!event.target.value) return;

              const formatted = new Date(
                `${event.target.value}T00:00:00`
              ).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });

              update("due", formatted);
            }}
            className="input"
          />
        </label>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="toolbar-btn"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!data.title.trim()}
            onClick={() => onCreate(data)}
            className="toolbar-primary disabled:opacity-40"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
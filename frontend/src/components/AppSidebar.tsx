import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen, LogOut, ChevronLeft, ChevronRight, MessageSquare,
} from "lucide-react";

const navItems = [
  { title: "Chat Assistant", path: "/", icon: MessageSquare },
];

export default function AppSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const location = useLocation();

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-40 transition-all duration-300 flex flex-col ${collapsed ? "w-16" : "w-64"
        }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <BookOpen className="h-7 w-7 text-sidebar-primary shrink-0" />
        {!collapsed && (
          <span className="font-display text-lg font-bold text-sidebar-accent-foreground tracking-tight">
            Smart Library
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1 scrollbar-thin">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${active ? "sidebar-link-active" : ""}`}
              title={collapsed ? item.title : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="text-sm">{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-2 pb-4 border-t border-sidebar-border pt-3">
        <button className="sidebar-link w-full text-destructive/80 hover:text-destructive">
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>

      {/* Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-8 bg-primary text-primary-foreground rounded-full p-1 shadow-md hover:scale-110 transition-transform"
      >
        {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>
    </aside>
  );
}

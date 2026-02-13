import { useState } from "react";
import { Moon, Sun, User, ChevronDown, Menu } from "lucide-react";

export default function TopBar({
  onMobileMenuToggle,
}: {
  onMobileMenuToggle: () => void;
}) {
  const [dark, setDark] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="h-14 bg-card/80 backdrop-blur-lg border-b border-border flex items-center justify-between px-4 sticky top-0 z-30">
      <button onClick={onMobileMenuToggle} className="lg:hidden p-2 rounded-lg hover:bg-muted">
        <Menu className="h-5 w-5" />
      </button>
      <div className="hidden lg:block" />

      <div className="flex items-center gap-2">
        {/* Dark mode */}
        <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Toggle theme">
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); }}
            className="flex items-center gap-2 p-1.5 pl-2 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="h-7 w-7 rounded-full gradient-primary flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="hidden sm:block text-sm font-medium">Student</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {showProfile && (
            <div className="absolute right-0 top-12 w-48 bg-card border border-border rounded-xl shadow-xl animate-scale-in z-50">
              <div className="p-3 border-b border-border">
                <p className="font-semibold text-sm">John Doe</p>
                <p className="text-xs text-muted-foreground">john@university.edu</p>
              </div>
              <div className="p-1">
                <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted text-destructive">Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

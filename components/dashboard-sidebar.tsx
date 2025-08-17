"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, FileText, User, Settings, LogOut, PlusCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { cn } from "@/lib/utils"

interface DashboardSidebarProps {
  user: SupabaseUser
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "My Resumes", href: "/dashboard/resumes", icon: FileText },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const userInitials = user.email?.charAt(0).toUpperCase() || "U"

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      {/* User Profile Section */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user.user_metadata?.full_name || user.email?.split("@")[0]}
            </p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Quick Action */}
      <div className="p-4 border-b border-border">
        <Link href="/dashboard/resume-builder">
          <Button className="w-full" size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Resume
          </Button>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="w-full justify-start text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}

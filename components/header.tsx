"use client"

import { Button } from "@/components/ui/button"
import { Globe, User, LogOut } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-sans font-bold text-lg">K</span>
          </div>
          <span className="font-sans font-bold text-xl text-foreground">Karmik Connect</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#categories" className="text-muted-foreground hover:text-foreground transition-colors">
            Browse Workers
          </a>
          <a href="#for-workers" className="text-muted-foreground hover:text-foreground transition-colors">
            For Workers
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex items-center space-x-1">
            <Globe className="w-4 h-4" />
            <span>हिंदी</span>
          </Button>

          {loading ? (
            <div className="w-20 h-9 bg-muted animate-pulse rounded-md" />
          ) : user ? (
            <div className="flex items-center space-x-2">
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{user.email?.split("@")[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline" size="sm" className="hidden sm:inline-flex bg-transparent">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

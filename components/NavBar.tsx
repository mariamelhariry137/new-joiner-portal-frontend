'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';

import { getStoredUser, clearAuth, type StoredUser } from '@/lib/auth/token';

import {
  LayoutDashboard,
  Building2,
  LogOut,
  User,
} from 'lucide-react';

const navLinks = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/company',
    label: 'Company',
    icon: Building2,
  },
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [storedUser, setStoredUserState] = useState<StoredUser | null>(null);

  useEffect(() => {
    setStoredUserState(getStoredUser());
  }, []);

  const currentUser = {
    name: storedUser
      ? `${storedUser.firstName} ${storedUser.lastName}`
      : 'Guest',

    email: storedUser?.email ?? '',
  };

  function handleLogout() {
    clearAuth();
    window.location.href = '/login';
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">

        {/* Left side */}
        <div className="flex items-center gap-8">

          {/* Logo */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              N
            </div>

            <span className="text-sm font-semibold tracking-tight">
              New Joiner Portal
            </span>
          </Link>

          {/* Navigation */}
          <NavigationMenu>
            <NavigationMenuList className="gap-1">

              {navLinks.map(
                ({
                  href,
                  label,
                  icon: Icon,
                }) => {
                  const isActive =
                    pathname === href;

                  return (
                    <NavigationMenuItem
                      key={href}
                    >
                      <Link
                        href={href}
                        className={cn(
                          'relative flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',

                          isActive
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        <Icon className="h-4 w-4" />

                        {label}

                        {isActive && (
                          <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />
                        )}
                      </Link>
                    </NavigationMenuItem>
                  );
                }
              )}

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* User menu */}
        <DropdownMenu>

          <DropdownMenuTrigger className="rounded-full ring-offset-background transition-shadow hover:ring-2 hover:ring-ring hover:ring-offset-2 focus:outline-none">
            <Avatar className="h-9 w-9 border">
              <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                {getInitials(
                  currentUser.name
                )}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56"
          >

            
            {/* User info */}
            <DropdownMenuGroup>

              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">

                  <p className="text-sm font-medium leading-none">
                    {currentUser.name}
                  </p>

                  <p className="text-xs leading-none text-muted-foreground">
                    {currentUser.email}
                  </p>

                </div>
              </DropdownMenuLabel>

            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => router.push('/profile')}
            >
              Profile
            </DropdownMenuItem>

            {/* Profile */}
            <DropdownMenuGroup>

              <DropdownMenuItem
                render={
                  <Link href="/profile" />
                }
                className="cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />

                Profile
              </DropdownMenuItem>

            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* Logout */}
            <DropdownMenuGroup>

              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />

                Logout
              </DropdownMenuItem>

            </DropdownMenuGroup>

          </DropdownMenuContent>

        </DropdownMenu>
      </div>
    </header>
  );
}
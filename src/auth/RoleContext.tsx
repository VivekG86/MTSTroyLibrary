import { createContext, useContext, ReactNode } from 'react';
import { UserRole } from './role';

const RoleContext = createContext<UserRole>('user');

export function useRole(): UserRole {
  return useContext(RoleContext);
}

interface RoleProviderProps {
  role: UserRole;
  children: ReactNode;
}

export function RoleProvider({ role, children }: RoleProviderProps) {
  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>;
}

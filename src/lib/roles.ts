import { supabase } from '@/lib/supabase';

/**
 * Application role hierarchy used by the internal Finance Module.
 *
 *  super_admin  → full access; the only role allowed to assign roles
 *  admin        → CMS + Inbox; approves accountant void/edit requests
 *  accountant   → CRUD on financial_transactions (drafts), proposes voids
 *  auditor      → read-only across the finance module + audit_log
 */
export type AppRole = 'super_admin' | 'admin' | 'accountant' | 'auditor';

export const ROLE_LABELS: Record<AppRole, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  accountant: 'Accountant',
  auditor: 'Auditor',
};

/**
 * Default landing route for each role after sign-in.
 * super_admin and admin → /admin (existing inbox + CMS dashboard)
 * accountant            → /accounting (finance entry)
 * auditor               → /audit (read-only finance review)
 */
export const ROLE_HOME: Record<AppRole, string> = {
  super_admin: '/admin',
  admin: '/admin',
  accountant: '/accounting',
  auditor: '/audit',
};

/** Role precedence — earlier entries win when picking a single landing route. */
const ROLE_PRECEDENCE: AppRole[] = ['super_admin', 'admin', 'accountant', 'auditor'];

export const pickPrimaryRole = (roles: AppRole[]): AppRole | null => {
  for (const r of ROLE_PRECEDENCE) {
    if (roles.includes(r)) return r;
  }
  return null;
};

export const fetchUserRoles = async (userId: string): Promise<AppRole[]> => {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId);
  if (error || !data) return [];
  return data.map((r: { role: AppRole }) => r.role);
};

export const hasAnyRole = (roles: AppRole[], allowed: AppRole[]): boolean =>
  roles.some((r) => allowed.includes(r));

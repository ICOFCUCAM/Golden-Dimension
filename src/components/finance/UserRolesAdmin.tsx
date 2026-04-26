import React, { useEffect, useState } from 'react';
import { Loader2, ShieldCheck, Trash2, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { ROLE_LABELS, type AppRole } from '@/lib/roles';

interface UserRow {
  user_id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  roles: AppRole[];
}

const ALL_ROLES: AppRole[] = ['super_admin', 'admin', 'accountant', 'auditor'];

const ROLE_BADGE: Record<AppRole, string> = {
  super_admin: 'border-indigo-300 bg-indigo-50 text-indigo-800',
  admin: 'border-emerald-300 bg-emerald-50 text-emerald-800',
  accountant: 'border-sky-300 bg-sky-50 text-sky-800',
  auditor: 'border-amber-300 bg-amber-50 text-amber-800',
};

const UserRolesAdmin: React.FC = () => {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [grantEmail, setGrantEmail] = useState('');
  const [grantRole, setGrantRole] = useState<AppRole>('admin');
  const [granting, setGranting] = useState(false);
  const [revokingKey, setRevokingKey] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc('list_users_with_roles');
    setLoading(false);
    if (error) {
      toast.error(`Failed to load users: ${error.message}`);
      return;
    }
    setUsers((data as UserRow[]) ?? []);
  };

  useEffect(() => {
    void refresh();
  }, []);

  const grant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!grantEmail.trim()) {
      toast.error('Email is required');
      return;
    }
    setGranting(true);
    const { error } = await supabase.rpc('grant_role_by_email', {
      target_email: grantEmail.trim().toLowerCase(),
      target_role: grantRole,
    });
    setGranting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`${ROLE_LABELS[grantRole]} role granted to ${grantEmail.trim()}`);
    setGrantEmail('');
    void refresh();
  };

  const revoke = async (user: UserRow, role: AppRole) => {
    const key = `${user.user_id}:${role}`;
    setRevokingKey(key);
    const { error } = await supabase.rpc('revoke_role', {
      target_user_id: user.user_id,
      target_role: role,
    });
    setRevokingKey(null);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`${ROLE_LABELS[role]} revoked from ${user.email}`);
    void refresh();
  };

  return (
    <div>
      {/* Grant form */}
      <section className="border border-brand-hair-strong bg-brand-paper p-6 mb-6">
        <header className="flex items-center gap-2 mb-4">
          <ShieldCheck size={14} className="text-brand-mute" />
          <span className="label-technical text-brand-mute">
            <span className="text-brand-accent">§ FIN.SU</span> · Grant role
          </span>
        </header>
        <form onSubmit={grant} className="grid grid-cols-1 md:grid-cols-[1fr_220px_auto] gap-3 items-end">
          <label className="flex flex-col text-[12px]">
            <span className="label-technical text-brand-mute mb-1.5">User email</span>
            <input
              type="email"
              required
              value={grantEmail}
              onChange={(e) => setGrantEmail(e.target.value)}
              placeholder="someone@golden-dimensions.com"
              className="px-3 py-2.5 bg-brand-ivory border border-brand-hair-strong text-[13.5px] text-brand-ink focus:outline-none focus:border-brand-ink"
            />
          </label>
          <label className="flex flex-col text-[12px]">
            <span className="label-technical text-brand-mute mb-1.5">Role</span>
            <select
              value={grantRole}
              onChange={(e) => setGrantRole(e.target.value as AppRole)}
              className="px-3 py-2.5 bg-brand-ivory border border-brand-hair-strong text-[13.5px] text-brand-ink focus:outline-none focus:border-brand-ink"
            >
              {ALL_ROLES.map((r) => (
                <option key={r} value={r}>
                  {ROLE_LABELS[r]}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            disabled={granting}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-ink text-brand-ivory text-[13px] font-medium hover:bg-brand-accent transition-colors disabled:opacity-60 h-[42px]"
          >
            {granting ? <Loader2 size={13} className="animate-spin" /> : <UserPlus size={13} />}
            Grant role
          </button>
        </form>
        <p className="mt-3 text-[11.5px] text-brand-mute leading-relaxed">
          The user must already exist in Supabase Auth — invite them first via{' '}
          Authentication → Users → Invite user. Granting a role is idempotent.
        </p>
      </section>

      {/* User list */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
        </div>
      ) : users.length === 0 ? (
        <div className="border border-brand-hair-strong bg-brand-paper py-16 text-center">
          <p className="text-[14px] text-brand-mute">No users found.</p>
        </div>
      ) : (
        <div className="border border-brand-hair-strong bg-brand-paper overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead className="bg-brand-stone text-left">
              <tr>
                <th className="label-technical text-brand-mute py-3 px-4">Email</th>
                <th className="label-technical text-brand-mute py-3 px-4 whitespace-nowrap">
                  Created
                </th>
                <th className="label-technical text-brand-mute py-3 px-4 whitespace-nowrap">
                  Last sign-in
                </th>
                <th className="label-technical text-brand-mute py-3 px-4">Roles</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.user_id} className="border-t border-brand-hair">
                  <td className="py-3 px-4 text-brand-ink">{u.email}</td>
                  <td className="py-3 px-4 font-mono-tab text-brand-mute whitespace-nowrap">
                    {u.created_at?.slice(0, 10)}
                  </td>
                  <td className="py-3 px-4 font-mono-tab text-brand-mute whitespace-nowrap">
                    {u.last_sign_in_at ? u.last_sign_in_at.slice(0, 10) : '—'}
                  </td>
                  <td className="py-3 px-4">
                    {u.roles.length === 0 ? (
                      <span className="text-brand-mute">—</span>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {u.roles.map((r) => {
                          const key = `${u.user_id}:${r}`;
                          const busy = revokingKey === key;
                          return (
                            <span
                              key={r}
                              className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10.5px] font-mono-tab tracking-widest uppercase border ${ROLE_BADGE[r]}`}
                            >
                              {ROLE_LABELS[r]}
                              <button
                                type="button"
                                onClick={() => revoke(u, r)}
                                disabled={busy}
                                aria-label={`Revoke ${r} from ${u.email}`}
                                className="hover:text-red-700 disabled:opacity-50"
                              >
                                {busy ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
                              </button>
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 text-[11.5px] text-brand-mute leading-relaxed max-w-2xl">
        Role assignments are protected by Postgres RLS — only super-admins can grant or revoke
        roles. The last super-admin cannot revoke their own super-admin role (safety check
        enforced inside <code>revoke_role</code>).
      </p>
    </div>
  );
};

export default UserRolesAdmin;

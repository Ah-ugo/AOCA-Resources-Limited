/** @format */

import React from 'react';
import { Bell, Lock, ShieldCheck, UserCog } from 'lucide-react';
import { authService } from '../../services/auth-service';

const settings = [
  {
    title: 'Profile details',
    description: 'Update your teaching bio and qualification information.',
    icon: UserCog,
  },
  {
    title: 'Notifications',
    description:
      'Control reminders for assignments, student check-ins, and class updates.',
    icon: Bell,
  },
  {
    title: 'Security',
    description:
      'Manage your password and two-factor authentication preferences.',
    icon: Lock,
  },
];

export default function InstructorSettings() {
  const currentUser = authService.getCurrentUser();
  const name =
    [currentUser?.first_name, currentUser?.last_name]
      .filter(Boolean)
      .join(' ') || 'Instructor';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Instructor Settings
        </h1>
        <p className="text-slate-500">
          Your live teaching profile and account settings
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <ShieldCheck size={22} />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">{name}</p>
            <p className="text-sm text-slate-500">
              {currentUser?.email || 'No email available'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {settings.map((setting) => {
            const Icon = setting.icon;
            return (
              <div
                key={setting.title}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      {setting.title}
                    </p>
                    <p className="text-sm text-slate-500">
                      {setting.description}
                    </p>
                  </div>
                </div>
                <button className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300">
                  Manage
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

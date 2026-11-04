'use client';

import { useState } from 'react';

export default function LogoutPage() {
  const [loggingOut, setLoggingOut] = useState(false);

  function handleLogout() {
    setLoggingOut(true);
    window.localStorage.removeItem('forme-auth-session');
    window.location.assign('/dashboard/login');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 text-ink">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#171914] p-7 text-center sm:p-9">
        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full border border-[#d1f16a]/30 bg-[#d1f16a]/10 text-2xl text-[#d1f16a]" aria-hidden="true">
          ↪
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#d1f16a]">FORME / Session</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Log out?</h1>
        <p className="mt-3 text-sm leading-6 text-[#979892]">
          You will be signed out of the content studio and returned to the login page.
        </p>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <a
            href="/dashboard"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-[#c5c6bf] transition hover:border-white/30 hover:text-ink"
          >
            Cancel
          </a>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-full bg-[#d1f16a] px-5 py-2.5 text-sm font-semibold text-[#111310] transition hover:bg-[#e0ff86] disabled:cursor-wait disabled:opacity-70"
          >
            {loggingOut ? 'Logging out…' : 'Log out'}
          </button>
        </div>
      </section>
    </main>
  );
}

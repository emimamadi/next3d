'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('alex@forme.studio');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.localStorage.setItem('forme-auth-session', 'active');
    setSubmitted(true);
    router.push('/dashboard');
  }

  return (
    <main className="grid min-h-screen place-items-center overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(125,92,255,0.28),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(73,201,188,0.2),transparent_26%),linear-gradient(135deg,#070b17_0%,#0e1224_38%,#090d1a_100%)] p-7 text-slate-50">
      <div className="grid w-full max-w-275 gap-7 rounded-4xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_30px_80px_rgba(8,12,24,0.72)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]" aria-label="3D login panel">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(19,27,48,0.98),rgba(11,18,28,0.8))] px-4 py-8">
          <div className="mx-auto flex h-155 max-w-130 flex-col justify-between rounded-[28px] border border-white/10 bg-[linear-gradient(160deg,rgba(19,30,56,0.76),rgba(13,18,28,0.7))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_60px_rgba(6,10,20,0.7)] transform-[rotateX(18deg)_rotateY(-18deg)] animate-[float-panel_8s_ease-in-out_infinite]">
            <div className="flex items-start justify-between px-5 pt-5 font-mono text-[10px] tracking-[0.22em] text-slate-200/80">
              <span>LIVE ORBIT</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-slate-800/40 px-3 py-1.5 text-[10px] tracking-[0.16em]">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(96,240,200,0.8)]" aria-hidden="true" />
                ONLINE
              </span>
            </div>

            <div className="flex flex-1 items-center justify-center px-4 pb-2">
              <div className="grid place-items-center perspective-[1000px]">
                <div className="col-start-1 row-start-1 h-[min(78%,350px)] w-[min(78%,350px)] rounded-full border border-violet-200/70" style={{ transform: "rotateX(72deg) rotateZ(14deg)" }} />
                <div className="col-start-1 row-start-1 h-[min(62%,290px)] w-[min(62%,290px)] rounded-full border border-cyan-200/60" style={{ transform: "rotateY(78deg) rotateZ(-18deg)" }} />
                <div className="col-start-1 row-start-1 grid h-40 w-40 place-items-center rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9),rgba(141,159,255,0.9)_24%,rgba(55,76,121,0.9)_62%,rgba(11,13,22,0.95)_100%)] shadow-[0_0_36px_rgba(119,138,255,0.5),inset_10px_8px_20px_rgba(255,255,255,0.26),inset_-18px_-16px_30px_rgba(10,12,32,0.7)] transform-[translateZ(34px)]">
                  <div className="h-[96%] w-[96%] rounded-full bg-[radial-gradient(circle,rgba(124,230,255,0.5),rgba(93,96,255,0.18)_46%,transparent_70%)] animate-[pulse_3.6s_ease-in-out_infinite]" />
                </div>
                <div className="col-start-1 row-start-1 h-70 w-70 rounded-full border border-white/30" style={{ transform: "rotateX(72deg) rotateY(58deg)" }} />
                <div className="col-start-1 row-start-1 h-55 w-55 rounded-full border border-white/20" style={{ transform: "rotateY(62deg) rotateX(64deg)" }} />
              </div>
            </div>

            <div className="mb-4 flex justify-center">
              <div className="rounded-full border border-violet-200/20 bg-slate-900/60 px-4 py-1.5 font-mono text-[10px] tracking-[0.2em] text-slate-200">SYNC / NEBULA</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-slate-950/45 p-5 sm:p-8">
          <div className="w-full max-w-105">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet-300">Access portal</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-white">Welcome back</h1>
            <p className="mt-2 text-sm text-slate-300">Sign in to continue to your workspace.</p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-slate-300" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-3 text-sm text-white placeholder:text-slate-400 focus:border-violet-400/60 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-300" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-3 text-sm text-white placeholder:text-slate-400 focus:border-violet-400/60 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <label className="inline-flex items-center gap-2 text-sm text-slate-300" htmlFor="remember">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                    className="h-4 w-4 rounded border-white/10 bg-slate-900 text-violet-400 focus:ring-violet-400"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-sm text-violet-300 hover:text-violet-200">Forgot password?</a>
              </div>

              <button type="submit" className="mt-2 w-full rounded-xl bg-linear-to-r from-violet-500 to-indigo-500 px-4 py-3 text-sm font-medium text-white shadow-[0_12px_28px_rgba(99,102,241,0.35)] transition-transform hover:-translate-y-0.5">
                Sign in
              </button>

              <div className="my-4 flex items-center gap-3">
                <span className="h-px flex-1 bg-white/10" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">or continue with</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-200 transition-colors hover:border-violet-400/30 hover:text-white">Google</button>
                <button type="button" className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-200 transition-colors hover:border-violet-400/30 hover:text-white">GitHub</button>
              </div>

              {submitted && (
                <p className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200" role="status">
                  Logged in successfully. Welcome back.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

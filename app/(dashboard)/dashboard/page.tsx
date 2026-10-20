export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-10">
        <header className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-300/80">3D Workspace</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">Dashboard</h1>
          </div>
          <button className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 transition hover:bg-cyan-400/20">
            Live sync
          </button>
        </header>

        <div className="grid flex-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top,#1d2b4a,#0a1020_55%,#070b14)] p-6 shadow-[0_30px_80px_rgba(14,116,144,0.25)]">
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="relative flex h-full min-h-[420px] items-center justify-center">
              <div className="relative h-[300px] w-[300px] [transform:rotateX(62deg)_rotateZ(-28deg)]">
                <div className="absolute inset-6 rounded-[30%] border border-cyan-300/40 bg-cyan-300/10 shadow-[0_0_60px_rgba(103,232,249,0.35)]" />
                <div className="absolute inset-[18%] rounded-[40%] border border-violet-300/40 bg-violet-400/10 shadow-[0_0_60px_rgba(196,181,253,0.3)]" />
                <div className="absolute inset-[34%] rounded-full border border-emerald-300/60 bg-emerald-300/10 shadow-[0_0_60px_rgba(52,211,153,0.35)]" />
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Overview</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {[
                  ["Projects", "12"],
                  ["Signals", "48"],
                  ["Latency", "87ms"],
                  ["Uptime", "99.9%"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-slate-900/40 p-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-5">
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Activity</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {[
                  "Motion model updated",
                  "Lighting pass complete",
                  "Viewport synced across 4 screens",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-3 py-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

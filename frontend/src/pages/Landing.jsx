import { Link } from 'react-router-dom';
import {
  FiCheckSquare, FiTrendingUp, FiShield,
  FiCheck,
} from 'react-icons/fi';

/* ─── Mini App Preview Mockup ──────────────────────────────────────────────── */
const AppPreview = () => (
  <div className="pointer-events-none select-none w-full max-w-[540px] mx-auto lg:mr-0 shrink-0">
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-[0_24px_64px_-12px_rgba(0,0,0,0.12)] overflow-hidden w-full">

      {/* Browser chrome */}
      <div className="h-10 bg-[#F7F7FB] border-b border-[#E5E7EB] flex items-center px-3 shrink-0">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57] mr-2" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E] mr-2" />
          <div className="w-3 h-3 rounded-full bg-[#28C840] mr-2" />
        </div>
        <div className="flex-1 h-6 bg-white border border-[#E5E7EB] rounded flex items-center px-2 ml-2">
          <span className="text-[10px] text-[#9CA3AF] truncate">app.avidustasks.com</span>
        </div>
      </div>

      {/* App shell */}
      <div className="flex h-[320px] w-full">

        {/* Sidebar */}
        <div className="w-[140px] bg-white border-r border-[#F3F4F6] flex flex-col shrink-0">
          <div className="h-11 flex items-center px-3.5 border-b border-[#F3F4F6]">
            <div className="w-4.5 h-4.5 bg-brand rounded flex items-center justify-center shrink-0 mr-2">
              <span className="text-white text-[9px] font-bold">A</span>
            </div>
            <span className="text-[11px] font-bold text-[#1E1E2F] tracking-tight">
              Avidus<span className="text-brand">Tasks</span>
            </span>
          </div>
          <nav className="p-3 space-y-1.5 flex-1">
            {[
              { label: 'Dashboard', active: false },
              { label: 'My Tasks', active: true },
            ].map(({ label, active }) => (
              <div key={label} className={`flex items-center px-2.5 py-2.5 rounded-md text-[11px] font-medium ${active ? 'bg-surface-alt text-brand' : 'text-[#9CA3AF]'}`}>
                <div className={`w-3.5 h-3.5 rounded-sm shrink-0 mr-2.5 ${active ? 'bg-brand/30' : 'bg-[#F3F4F6]'}`} />
                {label}
              </div>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-[#F7F7FB] p-4 overflow-hidden flex flex-col min-w-[280px]">

          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[12px] font-bold text-[#1E1E2F]">My Tasks</div>
              <div className="text-[10px] text-[#9CA3AF]">3 tasks</div>
            </div>
            <div className="bg-brand text-white text-[10px] font-semibold px-2.5 py-1 rounded-md">+ New</div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 mb-4">
            {[
              { l: 'Total',   v: '12', bg: 'bg-white' },
              { l: 'Done',    v: '8',  bg: 'bg-green-50' },
              { l: 'Pending', v: '4',  bg: 'bg-amber-50' },
            ].map(({ l, v, bg }) => (
              <div key={l} className={`${bg} border border-[#E5E7EB] rounded-lg p-2.5`}>
                <div className="text-[9px] text-[#9CA3AF] font-medium uppercase tracking-wide">{l}</div>
                <div className="text-[17px] font-bold text-[#1E1E2F] leading-tight">{v}</div>
              </div>
            ))}
          </div>

          <div className="space-y-1.5 flex-1">
            {[
              { t: 'Complete UI redesign', done: true },
              { t: 'Review pull requests', done: false },
              { t: 'Update API docs',      done: false },
            ].map(({ t, done }) => (
              <div key={t} className="flex items-center bg-white border border-[#E5E7EB] rounded-lg px-3.5 py-2.5">
                <div className={`w-3.5 h-3.5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 mr-2.5 ${done ? 'border-green-400 bg-green-400' : 'border-[#D1D5DB]'}`}>
                  {done && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className={`text-[11px] flex-1 truncate ${done ? 'line-through text-[#9CA3AF]' : 'text-[#1E1E2F] font-medium'}`}>{t}</span>
                <span className={`text-[9px] px-2 py-1 rounded-full font-medium shrink-0 ${done ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                  {done ? 'Done' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const features = [
  {
    icon: FiCheckSquare,
    title: 'Task Management',
    desc: 'Create, organise, and complete tasks with an interface built for focus.',
    bullets: ['Pending & completed states', 'Rich descriptions', 'Instant filters'],
  },
  {
    icon: FiTrendingUp,
    title: 'Progress Analytics',
    desc: 'Understand your productivity with live completion metrics.',
    bullets: ['Completion rate tracking', 'Activity summary', 'Task history feed'],
  },
  {
    icon: FiShield,
    title: 'Role-Based Access',
    desc: 'Admin and user roles with full control over what each can do.',
    bullets: ['Admin dashboard', 'User & task monitoring', 'Full audit log'],
  },
];

const Container = ({ children, className = '' }) => (
  <div className={`w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 ${className}`}>{children}</div>
);

const Landing = () => (
  <div className="min-h-screen bg-white">

    {/* ── Header ── */}
    <header className="sticky top-0 z-50 bg-white border-b border-[#F0F0F0]">
      <Container className="h-16 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center shrink-0 mr-3">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <span className="font-bold text-[#1E1E2F] text-[15px] tracking-tight">
            Avidus<span className="text-brand">Tasks</span>
          </span>
        </div>
        <nav className="flex items-center">
          <Link
            to="/login"
            className="hidden sm:inline-flex px-4 py-2 text-[13px] font-medium text-[#6B7280] hover:text-[#1E1E2F] rounded-lg hover:bg-gray-50 transition-colors mr-4"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center px-4 py-2 bg-[#1E1E2F] hover:bg-[#2D2D45] text-white text-[13px] font-semibold rounded-lg transition-colors"
          >
            Get started
          </Link>
        </nav>
      </Container>
    </header>

    {/* ── Hero ── */}
    <section className="bg-white">
      <Container className="py-16 sm:py-24 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">

          {/* Left Column: Content */}
          <div className="flex-1 max-w-xl flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center bg-surface-alt border border-[#C4C1FF]/60 rounded-full px-3 py-1 mb-6">
              <div className="w-2 h-2 bg-brand rounded-full mr-2" />
              <span className="text-[12px] font-medium text-brand">Task management, redesigned</span>
            </div>

            {/* Headline */}
            <h1 className="text-[40px] sm:text-[50px] lg:text-[58px] font-bold text-[#1E1E2F] leading-[1.1] tracking-[-0.025em] mb-5">
              Your work,{' '}
              <span className="text-brand">organized.</span>
            </h1>

            {/* Body */}
            <p className="text-[17px] sm:text-[19px] text-[#4B5563] font-medium leading-[1.6] mb-8">
              A clean, focused workspace for managing tasks,<br />
              tracking progress, and keeping teams aligned<br />
              <span className="text-brand font-bold mt-1 block">without the noise.</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6 w-full">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 bg-brand hover:bg-[#5B5BD6] text-white font-semibold text-[14px] rounded-lg transition-colors shadow-sm"
              >
                Start for free
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3 bg-white border border-[#E5E7EB] hover:border-[#C4C1FF] hover:bg-gray-50 text-[#374151] font-semibold text-[14px] rounded-lg transition-colors"
              >
                Sign in →
              </Link>
            </div>

            {/* Trust */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2">
              {['Free to start', 'No credit card', '2 user roles'].map((t) => (
                <span key={t} className="flex items-center text-[13px] text-[#9CA3AF]">
                  <FiCheck size={13} className="text-green-500 shrink-0 mr-2" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: App Preview */}
          <div className="flex-1 w-full max-w-[540px] flex justify-center lg:justify-end">
            <AppPreview />
          </div>

        </div>
      </Container>
    </section>

    {/* ── Stats bar ── */}
    <section className="border-y border-[#F0F0F0] bg-[#FAFAFA]">
      <Container className="py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 text-center sm:divide-x sm:divide-[#EBEBEB]">
          {[
            { value: 'Unlimited', label: 'Tasks per workspace' },
            { value: '2 roles',   label: 'Admin & user access' },
            { value: 'Real-time', label: 'Activity log tracking' },
          ].map(({ value, label }) => (
            <div key={label} className="sm:px-8">
              <div className="text-[22px] font-bold text-[#1E1E2F] tracking-tight">{value}</div>
              <div className="text-[13px] text-[#9CA3AF] mt-1">{label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>

    {/* ── Features ── */}
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="text-center mb-12 max-w-lg mx-auto">
          <h2 className="text-[28px] sm:text-[32px] font-bold text-[#1E1E2F] tracking-tight leading-tight mb-3">
            Built to keep you focused
          </h2>
          <p className="text-[15px] text-[#6B7280] leading-relaxed">
            Everything you need to manage work effectively. Nothing you don&apos;t.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc, bullets }) => (
            <div
              key={title}
              className="border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#C4C1FF] hover:shadow-[0_4px_20px_rgba(99,91,255,0.06)] transition-all"
            >
              <div className="w-9 h-9 bg-surface-alt rounded-lg flex items-center justify-center mb-4">
                <Icon className="text-brand" size={16} />
              </div>
              <h3 className="text-[14px] font-semibold text-[#1E1E2F] mb-1.5">{title}</h3>
              <p className="text-[13px] text-[#6B7280] leading-relaxed mb-4">{desc}</p>
              <ul className="space-y-1.5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-[12px] text-[#6B7280]">
                    <FiCheck size={11} className="text-brand shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>

    {/* ── Dark CTA ── */}
    <section className="bg-[#0F0F1A] py-20 sm:py-24">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-[28px] sm:text-[32px] font-bold text-white tracking-tight leading-tight mb-3">
            Ready to get organized?
          </h2>
          <p className="text-[14px] text-[#9CA3AF] leading-relaxed mb-8">
            Start managing your tasks with clarity today. Free, always.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-7 py-3 bg-brand hover:bg-[#5B5BD6] text-white font-semibold text-[14px] rounded-lg transition-colors"
          >
            Create free account →
          </Link>
        </div>
      </Container>
    </section>

    {/* ── Footer ── */}
    <footer className="bg-white border-t border-[#F0F0F0] py-8">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand rounded-md flex items-center justify-center shrink-0">
              <span className="text-white text-[10px] font-bold">A</span>
            </div>
            <span className="text-[13px] font-bold text-[#1E1E2F] tracking-tight">AvidusTasks</span>
          </div>
          <div className="flex items-center gap-5 text-[12px] text-[#9CA3AF]">
            <span className="hover:text-[#6B7280] cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-[#6B7280] cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-[#6B7280] cursor-pointer transition-colors">Contact</span>
          </div>
          <p className="text-[12px] text-[#9CA3AF]">
            &copy; {new Date().getFullYear()} AvidusTasks
          </p>
        </div>
      </Container>
    </footer>

  </div>
);

export default Landing;

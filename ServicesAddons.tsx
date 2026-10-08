import React, { useState } from 'react';
import {
  Palette,
  Layers,
  ShieldCheck,
  CreditCard,
  Webhook,
  Terminal,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Code2,
  Sliders,
  Database,
  Sparkles,
  Lock,
  FileCheck,
  ReceiptPercent,
  Building2,
  Workflow,
  KeyRound,
  Check,
  Zap,
  Server,
  ArrowUpRight,
} from 'lucide-react';

// ============================================================================
// Types & Contracts
// ============================================================================

export interface DeliverableFeature {
  title: string;
  badge: string;
  description: string;
  details: string[];
  icon: React.ElementType;
}

export interface PillarDeliverable {
  title: string;
  eyebrow: string;
  tagline: string;
  icon: React.ElementType;
  theme: {
    accent: string;
    badgeBg: string;
    borderGlow: string;
  };
  features: DeliverableFeature[];
}

export interface ExecutionStep {
  stepNumber: string;
  phase: string;
  title: string;
  duration: string;
  summary: string;
  deliverables: string[];
  specs: { label: string; value: string }[];
}

export interface BillingBreakdown {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  highlight: string;
  badge: string;
  items: { name: string; note: string; tag: string }[];
}

export interface FaqItem {
  id: string;
  question: string;
  category: string;
  summary: string;
  paragraphs: string[];
  highlights: string[];
}

// ============================================================================
// Data Models
// ============================================================================

const PILLAR_DESIGN: PillarDeliverable = {
  title: 'Product & Brand Design Deliverables',
  eyebrow: 'Pillar 01 • Design Architecture',
  tagline: 'Precision UI engineering built for scalability, design-to-code parity, and high conversion.',
  icon: Palette,
  theme: {
    accent: 'from-violet-500 to-fuchsia-500',
    badgeBg: 'bg-violet-500/10 border-violet-500/30 text-violet-300',
    borderGlow: 'hover:border-violet-500/40 hover:shadow-[0_0_35px_-5px_rgba(139,92,246,0.18)]',
  },
  features: [
    {
      title: 'Production-Ready Figma Workspace',
      badge: 'Auto Layout 5.0 + Variables',
      icon: Layers,
      description:
        'Structured file architecture following atomic principles with tokenized spacing, typography scales, semantic color modes, and interactive states.',
      details: [
        'Organized Design Tokens (W3C standard: colors, elevation, layout units)',
        'Native Dark/Light Mode Variables with automated semantic contrast',
        'Fluid responsive grids & responsive breakpoint components',
      ],
    },
    {
      title: 'Complete UI Component Library',
      badge: 'WCAG 2.1 AA Compliant',
      icon: Sliders,
      description:
        'Granular interactive components engineered for all viewport densities with comprehensive hover, focus-visible, active, disabled, and loading states.',
      details: [
        'Triple viewport coverage: Mobile (375px), Tablet (768px), Desktop (1440px+)',
        'Accessible color contrast ratios validated across every semantic pair',
        'Micro-interaction choreography and design handoff specifications',
      ],
    },
    {
      title: 'Full Asset & License Handover',
      badge: '100% Client IP Ownership',
      icon: FileCheck,
      description:
        'Zero vendor locks or proprietary restrictions. You receive all commercial typography licensing, optimized vectors, and complete legal IP assignment.',
      details: [
        'Commercial font licenses transferred directly to your organization',
        'Production-optimized SVG brand kits & web asset manifests',
        'Signed Intellectual Property (IP) assignment documentation on sign-off',
      ],
    },
  ],
};

const PILLAR_TECH: PillarDeliverable = {
  title: 'Technical & Integration Deliverables',
  eyebrow: 'Pillar 02 • Infrastructure & Code',
  tagline: 'Hardened backend connectors, fault-tolerant payment flows, and custom operational admin panels.',
  icon: Code2,
  theme: {
    accent: 'from-cyan-500 to-blue-500',
    badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
    borderGlow: 'hover:border-cyan-500/40 hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.18)]',
  },
  features: [
    {
      title: 'Payment Gateway Architecture',
      badge: 'SCA / 3D Secure 2.0 Ready',
      icon: CreditCard,
      description:
        'Custom-architected checkout experiences integrating Stripe, Adyen, or custom merchant processors with intelligent currency routing and fraud handling.',
      details: [
        'Stripe Checkout & Custom Elements / Adyen Drop-in implementation',
        'Dynamic 3D Secure / Strong Customer Authentication (SCA) compliance',
        'Decoupled adapter pattern for quick gateway swaps without rewrites',
      ],
    },
    {
      title: 'Hardened API Webhooks',
      badge: 'HMAC SHA-256 + Idempotency',
      icon: Webhook,
      description:
        'Military-grade webhook consumers equipped with cryptographic signature validation, replay attack prevention, and exponential backoff retry policies.',
      details: [
        'HMAC SHA-256 signature verification preventing unauthorized payloads',
        'Distributed idempotency keys guaranteeing zero duplicate charges/credits',
        'Dead-letter queue (DLQ) failover and automated alerting telemetry',
      ],
    },
    {
      title: 'Bespoke Internal Admin Tools',
      badge: 'Fine-Grained RBAC',
      icon: Server,
      description:
        'Tailored operational portals allowing your support and finance teams to inspect transactions, manage refunds, and control user access securely.',
      details: [
        'Role-Based Access Control (RBAC) with granular operator privileges',
        'Multi-tenant analytics dashboards with real-time audit logging',
        'Automated operational pipelines (reconciliation, sync, and exports)',
      ],
    },
  ],
};

const EXECUTION_STEPS: ExecutionStep[] = [
  {
    stepNumber: '01',
    phase: 'Architecture & Specifications',
    title: 'Design Reviews & Schemas',
    duration: 'Phase 1 • Schema Validation',
    summary:
      'We validate every component against real API contracts, database ERDs, and UX edge cases before writing production code.',
    deliverables: [
      'High-fidelity interactive Figma prototypes with complete variable trees',
      'Entity Relationship Diagrams (ERDs) and transactional database models',
      'OpenAPI 3.1 Contract Specs & Webhook Payload Schema definitions',
      'Atomic component token audit and typographic scale validation',
    ],
    specs: [
      { label: 'Prototypes', value: 'Figma Auto Layout 5.0' },
      { label: 'Contract Format', value: 'OpenAPI 3.1 / JSON Schema' },
      { label: 'Security Model', value: 'OWASP Top 10 Threat Modeling' },
    ],
  },
  {
    stepNumber: '02',
    phase: 'Fault Injection & Hardening',
    title: 'Sandbox Testing & Simulation',
    duration: 'Phase 2 • Stress Simulation',
    summary:
      'Every failure state is simulated in hardened staging environments with synthetic test cards, latency spikes, and edge-case payloads.',
    deliverables: [
      'Full test-card simulation suite (declined, 3DS challenges, chargebacks)',
      'Idempotency collision tests ensuring zero duplicate transactions',
      'Webhook payload fuzzing and HMAC verification unit tests',
      'End-to-end integration test runs with automated reporting',
    ],
    specs: [
      { label: 'Gateway Sandbox', value: 'Stripe / Adyen / Razorpay' },
      { label: 'Signature Validation', value: 'HMAC SHA-256 Verification' },
      { label: 'Fault Resilience', value: 'Exponential Backoff Retries' },
    ],
  },
  {
    stepNumber: '03',
    phase: 'Zero-Downtime Release',
    title: 'Production Cutover & Handover',
    duration: 'Phase 3 • Sovereign Launch',
    summary:
      'Zero-downtime release to your infrastructure, live key rotation, complete IP transfer, and real-time observability telemetry setup.',
    deliverables: [
      'Zero-downtime blue/green deployment cutover with rollback guards',
      'Live secret rotation and secure environment variable injection',
      'Full Git repository ownership transfer and CI/CD automated pipelines',
      'Production APM dashboards, Sentry alerting, and SLA documentation',
    ],
    specs: [
      { label: 'Cutover Downtime', value: '0.00% Zero-Interruption' },
      { label: 'IP Assignment', value: '100% Unconditional Ownership' },
      { label: 'Monitoring', value: 'Sentry + OpenTelemetry Telemetry' },
    ],
  },
];

const BILLING_AGENCY: BillingBreakdown = {
  title: 'Our Custom Development & Engineering Fee',
  subtitle: 'Fixed-Price or Milestone Agreement • Billed by Netqorix',
  icon: Building2,
  badge: 'Fixed Scope SOW',
  highlight: 'Transparent, capped deliverables with zero hidden surprise charges or hourly bloat.',
  items: [
    {
      name: 'Design System & Component Architecture',
      note: 'Production Figma file, token pipelines, auto layout components, and asset exports.',
      tag: 'Fixed Contract',
    },
    {
      name: 'Custom Backend & Gateway Engineering',
      note: 'Webhook consumers, HMAC verification engines, and database synchronization logic.',
      tag: 'Fixed Contract',
    },
    {
      name: 'Bespoke Admin Portals & Role Management',
      note: 'Tailored back-office tools, access control matrices, and audit logging pipelines.',
      tag: 'Fixed Contract',
    },
    {
      name: 'QA Simulation, Security Audits & Handover',
      note: 'Automated test suite, zero-downtime deployment, and repo ownership transfer.',
      tag: 'Fixed Contract',
    },
  ],
};

const BILLING_VENDOR: BillingBreakdown = {
  title: 'Direct Third-Party & Vendor Pass-Through',
  subtitle: 'Zero Markup • Billed Directly to Your Own Company Accounts',
  icon: ReceiptPercent,
  badge: '0% Agency Markup',
  highlight: '100% direct vendor billing. Netqorix never takes a cut, commission, or kickback.',
  items: [
    {
      name: 'Payment Processing Fees (Stripe / Adyen)',
      note: 'Standard processor rates (~2.9% + $0.30 per transaction or interchange plus rates).',
      tag: 'Direct Pass-Through',
    },
    {
      name: 'Cloud Hosting & Serverless Compute',
      note: 'Infrastructure costs (AWS, Vercel, Supabase, Cloudflare) on your company credentials.',
      tag: 'Direct Pass-Through',
    },
    {
      name: 'Commercial Fonts & Third-Party SaaS',
      note: 'Specific font software licenses and transactional email/SMS credits (Resend, Twilio).',
      tag: 'Direct Pass-Through',
    },
    {
      name: 'Domain, SSL & DNS Infrastructure',
      note: 'Registrar and Cloudflare enterprise renewal costs owned under your billing profile.',
      tag: 'Direct Pass-Through',
    },
  ],
};

const FAQ_LIST: FaqItem[] = [
  {
    id: 'security',
    category: 'Security & Integrity',
    question: 'How do you ensure our webhooks and admin tools are secure?',
    summary:
      'We treat every external webhook as an untrusted payload and apply strict cryptographic safeguards.',
    paragraphs: [
      'Every webhook incoming route enforces strict cryptographic HMAC SHA-256 signature verification utilizing unique rotating secrets. Requests lacking a verified signature or exceeding timestamp skew thresholds (typically 5 minutes) are terminated before any database interaction.',
      'To eliminate duplicate billing or accidental repeated fulfillment from network retries, all events require unique Idempotency Keys stored in Redis or transactional database locks. If an event is received twice, the consumer returns an immediate cached success response without re-executing logic.',
      'Our custom internal admin portals are built with strict Role-Based Access Control (RBAC), multi-factor authentication (MFA) enforcement, and immutable audit logging tracking every mutation, refund, or configuration change.',
    ],
    highlights: [
      'HMAC SHA-256 cryptographic verification',
      'Distributed Idempotency key locks',
      'Fine-grained RBAC with immutable audit logs',
      'Zero secrets committed to version control',
    ],
  },
  {
    id: 'gateway-swap',
    category: 'Architecture & Flexibility',
    question: 'What if we change our payment gateway down the road?',
    summary:
      'We decouple business logic from provider SDKs using a clean, adapter-driven software architecture.',
    paragraphs: [
      'We do not tightly couple your UI and application code to a single vendor SDK (such as hardcoding Stripe directly into your business database models). Instead, we implement an abstract Payment Gateway Adapter interface.',
      'Your checkout flows interact with generic domain primitives (e.g., createPaymentIntent(), handleWebhookEvent(), issueRefund()). Underneath, the specific provider driver handles the translation.',
      'If you decide to migrate from Stripe to Adyen, Razorpay, or an alternative merchant account for lower interchange rates, we simply swap the underlying adapter module. Your front-end tokens, admin workflows, and business rules remain intact.',
    ],
    highlights: [
      'Decoupled Adapter Software Pattern',
      'Zero database schema lock-in',
      'Quick multi-gateway routing support',
      'Preserved checkout UI and token conventions',
    ],
  },
  {
    id: 'ownership',
    category: 'Legal & Intellectual Property',
    question: 'Who owns the design files and source code after launch?',
    summary:
      'You receive 100% unencumbered intellectual property ownership of all Figma files, tokens, and code repositories.',
    paragraphs: [
      'From the moment final project milestones are settled, 100% of all intellectual property, design assets, and source code transfer unconditionally to your organization. We do not retain proprietary "black-box" modules or hold your files hostage.',
      'We execute full GitHub/GitLab organization repository transfers, hand over your native Figma workspace with editable variables, transfer commercial font and asset licenses, and assist in rotating all production environment API keys.',
      'You will possess complete sovereignty over your system, allowing your internal developers or future partners to maintain, iterate, and deploy without ongoing dependencies on our team.',
    ],
    highlights: [
      '100% intellectual property assignment',
      'Full Git repository and Figma workspace transfer',
      'All commercial licenses reassigned to your name',
      'Zero ongoing royalties or proprietary dependencies',
    ],
  },
];

// ============================================================================
// Interactive Visualizer Subcomponents
// ============================================================================

const InteractiveTokenInspector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'preview'>('tokens');

  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-zinc-950/90 p-4 font-mono text-xs shadow-inner">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <span className="h-2.5 w-2.5 rounded-full bg-violet-500 animate-pulse" />
          <span className="font-sans text-xs font-semibold text-zinc-300">Design Token Pipeline</span>
          <span className="rounded bg-violet-500/20 px-1.5 py-0.5 text-[10px] text-violet-300">Figma Sync v5</span>
        </div>
        <div className="flex space-x-1 rounded-lg bg-zinc-900 p-0.5">
          <button
            type="button"
            onClick={() => setActiveTab('tokens')}
            className={`px-2.5 py-1 rounded text-[11px] font-sans transition-colors ${
              activeTab === 'tokens' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Tokens
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-2.5 py-1 rounded text-[11px] font-sans transition-colors ${
              activeTab === 'preview' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Live Component
          </button>
        </div>
      </div>

      {activeTab === 'tokens' ? (
        <div className="pt-3 space-y-2 text-zinc-400">
          <div className="flex justify-between items-center py-1 border-b border-white/5">
            <span className="text-violet-400">--color-brand-primary</span>
            <span className="flex items-center gap-2 text-zinc-200">
              <span className="inline-block h-3 w-3 rounded-full bg-indigo-500 border border-white/30" />
              #6366F1 <span className="text-zinc-500">(Indigo-500)</span>
            </span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-white/5">
            <span className="text-violet-400">--radius-card-surface</span>
            <span className="text-zinc-200">16px (1.0rem)</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-white/5">
            <span className="text-violet-400">--elevation-interactive</span>
            <span className="text-zinc-200">0 10px 30px -10px rgba(99,102,241,0.3)</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-violet-400">--font-display-scale</span>
            <span className="text-emerald-400">Inter Display / 600 weight</span>
          </div>
        </div>
      ) : (
        <div className="pt-4 flex flex-col items-center justify-center gap-3 py-2">
          <div className="w-full max-w-xs rounded-xl border border-violet-500/30 bg-gradient-to-br from-violet-950/60 to-zinc-900 p-3.5 text-center">
            <div className="text-[11px] uppercase tracking-wider text-violet-300 font-sans font-semibold mb-1">
              Tokenized Button
            </div>
            <button
              type="button"
              className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-xs py-2 px-3 font-medium transition-all shadow-[0_0_15px_rgba(99,102,241,0.5)] flex items-center justify-center gap-1.5"
            >
              <span>Subscribe to Plan</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <p className="mt-2 text-[10px] text-zinc-400 font-sans">
              Auto-adapts hover, focus rings & light/dark contrast
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const InteractiveWebhookSimulator: React.FC = () => {
  const [simulatedStatus, setSimulatedStatus] = useState<'idle' | 'simulating' | 'success'>('success');
  const [latency, setLatency] = useState(14);
  const [copied, setCopied] = useState(false);

  const signatureSample = 't=1727982000,v1=4d7b89f81a8b43f9a72120e3...';

  const handleCopy = () => {
    navigator.clipboard?.writeText(signatureSample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulate = () => {
    setSimulatedStatus('simulating');
    setTimeout(() => {
      setLatency(Math.floor(Math.random() * 8) + 11);
      setSimulatedStatus('success');
    }, 450);
  };

  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-zinc-950/90 p-4 font-mono text-xs shadow-inner">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <span className={`h-2.5 w-2.5 rounded-full ${simulatedStatus === 'simulating' ? 'bg-amber-400 animate-spin' : 'bg-cyan-400 animate-pulse'}`} />
          <span className="font-sans text-xs font-semibold text-zinc-300">Live Ingestion Router</span>
          <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[10px] text-cyan-300">HMAC Verified</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSimulate}
            disabled={simulatedStatus === 'simulating'}
            className="flex items-center gap-1 rounded bg-zinc-800 hover:bg-zinc-700 px-2 py-0.5 text-[10px] font-sans text-cyan-300 transition-colors border border-white/5 active:scale-95"
            title="Simulate incoming Stripe payment webhook"
          >
            <Zap className="h-3 w-3 text-cyan-400" />
            {simulatedStatus === 'simulating' ? 'Verifying...' : 'Test Event'}
          </button>
          <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-sans font-medium">
            <CheckCircle2 className="h-3 w-3" /> 200 OK ({latency}ms)
          </span>
        </div>
      </div>

      <div className="pt-3 space-y-2 text-zinc-400">
        <div className="flex items-center justify-between py-0.5">
          <span className="text-zinc-500">POST</span>
          <span className="text-cyan-300">/api/webhooks/v1/stripe-events</span>
        </div>

        <div className="flex items-center justify-between py-0.5 border-t border-white/5 pt-1.5">
          <span className="text-zinc-500">Stripe-Signature</span>
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-300 truncate max-w-[140px] sm:max-w-[180px]">{signatureSample}</span>
            <button
              type="button"
              onClick={handleCopy}
              title="Copy Signature"
              className="text-zinc-400 hover:text-white p-1"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <KeyRound className="h-3 w-3" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between py-0.5 border-t border-white/5 pt-1.5">
          <span className="text-zinc-500">Idempotency-Key</span>
          <span className="text-emerald-400 font-semibold">idemp_live_99812_locked</span>
        </div>

        <div className="mt-2 rounded bg-zinc-900/90 p-2 text-[11px] border border-white/5 text-zinc-300">
          <span className="text-purple-400">&quot;event&quot;</span>: <span className="text-emerald-300">&quot;payment_intent.succeeded&quot;</span>,{' '}
          <span className="text-purple-400">&quot;amount&quot;</span>: <span className="text-amber-300">14900</span>,{' '}
          <span className="text-purple-400">&quot;currency&quot;</span>: <span className="text-emerald-300">&quot;usd&quot;</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Main ServicesAddons Component
// ============================================================================

export const ServicesAddons: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [openFaqId, setOpenFaqId] = useState<string | null>('security');

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="services-addons"
      className="relative w-full overflow-hidden bg-slate-950 py-24 text-zinc-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200"
    >
      {/* Background Ambience: Subtle Radials and Tech Mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-600/15 via-purple-600/10 to-transparent blur-3xl" />
        <div className="absolute top-1/3 -left-48 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute top-2/3 -right-48 h-96 w-96 rounded-full bg-cyan-600/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ====================================================================
            1. SECTION HEADER & POSITIONING
            ==================================================================== */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300 backdrop-blur-md transition-all hover:border-indigo-500/50">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
            <span className="relative flex h-2 w-2 rounded-full bg-indigo-500" />
            <span>Full-Cycle Execution</span>
          </div>

          {/* Headline */}
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="block text-white">Design & Integrations:</span>
            <span className="block bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              From Figma Tokens to Live Webhooks
            </span>
          </h2>

          {/* Subheadline */}
          <p className="mt-6 text-base text-zinc-400 sm:text-lg lg:text-xl leading-relaxed">
            We eliminate disconnected workflows by pairing production-grade UI design systems with hardened payment
            gateways and custom back-office tools.
          </p>

          {/* Value Prop Micro-Chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-300">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-zinc-900/60 px-3 py-1.5 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              Tokenized Figma Variables
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-zinc-900/60 px-3 py-1.5 backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
              HMAC Signature Validation
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-zinc-900/60 px-3 py-1.5 backdrop-blur">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              Zero Duplicate Charges (Idempotency)
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-zinc-900/60 px-3 py-1.5 backdrop-blur">
              <Lock className="h-3.5 w-3.5 text-emerald-400" />
              100% Client Code & IP Transfer
            </span>
          </div>
        </div>

        {/* ====================================================================
            2. "WHAT YOU ACTUALLY RECEIVE" (DUAL-PILLAR GRID)
            ==================================================================== */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
              The Architecture of Deliverables
            </h3>
            <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              What You Actually Receive On Project Completion
            </p>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-zinc-400">
              No superficial static mockups or untested endpoints. You receive a fully synthesized product system where
              visual components correspond 1:1 with resilient server-side contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* ----------------- PILLAR A: DESIGN ----------------- */}
            <div className={`group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900/70 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 ${PILLAR_DESIGN.theme.borderGlow}`}>
              <div>
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${PILLAR_DESIGN.theme.badgeBg}`}>
                    <Palette className="h-3.5 w-3.5" />
                    {PILLAR_DESIGN.eyebrow}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">Standard: W3C Design Tokens</span>
                </div>

                <h4 className="mt-4 text-2xl font-bold tracking-tight text-white group-hover:text-violet-200 transition-colors">
                  {PILLAR_DESIGN.title}
                </h4>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {PILLAR_DESIGN.tagline}
                </p>

                {/* Interactive Token Inspection Widget */}
                <InteractiveTokenInspector />

                {/* Features List */}
                <div className="mt-8 space-y-6">
                  {PILLAR_DESIGN.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/5 bg-zinc-950/40 p-4 transition-colors hover:border-violet-500/20"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300 border border-violet-500/20 shrink-0">
                            <feature.icon className="h-4 w-4" />
                          </div>
                          <h5 className="font-semibold text-zinc-100 text-base">{feature.title}</h5>
                        </div>
                        <span className="rounded bg-violet-500/10 px-2 py-0.5 text-[11px] font-mono font-medium text-violet-300 border border-violet-500/20">
                          {feature.badge}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{feature.description}</p>
                      <ul className="mt-3 space-y-1.5">
                        {feature.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                            <Check className="h-3.5 w-3.5 text-violet-400 mt-0.5 shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Assurance */}
              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 font-medium text-violet-300">
                  <FileCheck className="h-4 w-4" /> Formats: .fig, SVG, JSON Tokens, Typography Kits
                </span>
                <span className="font-mono text-zinc-500">v5.0 Ready</span>
              </div>
            </div>

            {/* ----------------- PILLAR B: TECHNICAL ----------------- */}
            <div className={`group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900/70 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 ${PILLAR_TECH.theme.borderGlow}`}>
              <div>
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${PILLAR_TECH.theme.badgeBg}`}>
                    <Terminal className="h-3.5 w-3.5" />
                    {PILLAR_TECH.eyebrow}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">RFC 2104 / TLS 1.3</span>
                </div>

                <h4 className="mt-4 text-2xl font-bold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                  {PILLAR_TECH.title}
                </h4>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {PILLAR_TECH.tagline}
                </p>

                {/* Interactive Webhook Simulator Widget */}
                <InteractiveWebhookSimulator />

                {/* Features List */}
                <div className="mt-8 space-y-6">
                  {PILLAR_TECH.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/5 bg-zinc-950/40 p-4 transition-colors hover:border-cyan-500/20"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shrink-0">
                            <feature.icon className="h-4 w-4" />
                          </div>
                          <h5 className="font-semibold text-zinc-100 text-base">{feature.title}</h5>
                        </div>
                        <span className="rounded bg-cyan-500/10 px-2 py-0.5 text-[11px] font-mono font-medium text-cyan-300 border border-cyan-500/20">
                          {feature.badge}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{feature.description}</p>
                      <ul className="mt-3 space-y-1.5">
                        {feature.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                            <Check className="h-3.5 w-3.5 text-cyan-400 mt-0.5 shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Assurance */}
              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 font-medium text-cyan-300">
                  <ShieldCheck className="h-4 w-4" /> Security: HMAC-SHA256, RBAC, Secret Vault Injection
                </span>
                <span className="font-mono text-zinc-500">OWASP Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================
            3. THE EXECUTION LIFECYCLE (3-STEP STEPPER / TIMELINE)
            ==================================================================== */}
        <div className="mt-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              <Workflow className="h-3.5 w-3.5 text-indigo-400" />
              <span>Rigorous Delivery Methodology</span>
            </div>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              The Execution Lifecycle: From Concept to Production Cutover
            </h3>
            <p className="mt-3 text-sm text-zinc-400 sm:text-base">
              A continuous 3-stage delivery pipeline engineered to eliminate architectural rework, catch payment edge
              cases early, and assure flawless go-live execution.
            </p>
          </div>

          {/* Stepper Navigation */}
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {EXECUTION_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`group relative flex flex-col text-left p-6 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'border-indigo-500/50 bg-gradient-to-b from-indigo-950/40 via-zinc-900 to-zinc-900/80 shadow-[0_0_30px_-5px_rgba(99,102,241,0.25)]'
                      : 'border-white/10 bg-zinc-900/40 hover:border-white/20 hover:bg-zinc-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                        isActive
                          ? 'border-indigo-400/40 bg-indigo-500/20 text-indigo-300'
                          : 'border-white/10 bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      STEP {step.stepNumber}
                    </span>
                    <span className="text-xs font-medium text-zinc-400">{step.duration}</span>
                  </div>

                  <div className="mt-4">
                    <div className="text-xs font-medium text-indigo-400">{step.phase}</div>
                    <div className="mt-1 text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
                      {step.title}
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {step.summary}
                  </p>

                  <div
                    className={`mt-6 h-1 w-full rounded-full transition-all duration-500 ${
                      isActive ? 'bg-gradient-to-r from-violet-500 to-indigo-500' : 'bg-white/5'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Deep-Dive Active Step Card */}
          <div className="mt-6 rounded-2xl border border-indigo-500/30 bg-zinc-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 font-mono font-bold text-sm border border-indigo-500/30">
                    {EXECUTION_STEPS[activeStep].stepNumber}
                  </span>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                      Active Phase Overview
                    </span>
                    <h4 className="text-xl font-bold text-white sm:text-2xl">
                      {EXECUTION_STEPS[activeStep].title}
                    </h4>
                  </div>
                </div>

                <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
                  {EXECUTION_STEPS[activeStep].summary}
                </p>

                <div className="mt-6">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Key Phase Deliverables & Sign-Off Criteria:
                  </h5>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {EXECUTION_STEPS[activeStep].deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-start gap-2 rounded-lg border border-white/5 bg-zinc-950/60 p-2.5 text-xs text-zinc-300"
                      >
                        <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Specifications Panel */}
              <div className="lg:col-span-5 rounded-xl border border-white/10 bg-zinc-950 p-5 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-sans font-semibold text-zinc-200 text-xs flex items-center gap-1.5">
                    <Sliders className="h-3.5 w-3.5 text-indigo-400" />
                    Validation Criteria
                  </span>
                  <span className="text-[10px] text-zinc-500">Phase Gate Checklist</span>
                </div>

                <div className="mt-4 space-y-3">
                  {EXECUTION_STEPS[activeStep].specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex justify-between items-center py-1.5 border-b border-white/5">
                      <span className="text-zinc-400 font-sans text-xs">{spec.label}</span>
                      <span className="text-indigo-300 font-semibold text-xs">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-lg bg-indigo-950/40 border border-indigo-500/20 p-3 text-[11px] font-sans text-indigo-200">
                  <div className="font-semibold text-indigo-300 flex items-center gap-1 mb-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> Quality Assurance Gate
                  </div>
                  No deployment transitions to the next phase without sign-off on both visual Figma parity and API payload schema tests.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================
            4. BILLING TRANSPARENCY CARD
            ==================================================================== */}
        <div className="mt-28">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-zinc-900/90 via-zinc-900/60 to-zinc-950 p-8 sm:p-12 backdrop-blur-xl shadow-2xl">
            {/* Ambient Glows */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
                <ReceiptPercent className="h-3.5 w-3.5" />
                Zero Conflict of Interest
              </span>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Billing Transparency: Clear Scope Boundaries
              </h3>
              <p className="mt-3 text-sm text-zinc-300 sm:text-base leading-relaxed">
                We believe in absolute financial clarity. We strictly delineate between our bespoke engineering
                milestones and your direct third-party service subscriptions.
              </p>
            </div>

            {/* Split Comparison Grid */}
            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Agency Fee Column */}
              <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      <BILLING_AGENCY.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base sm:text-lg">
                        {BILLING_AGENCY.title}
                      </h4>
                      <p className="text-xs text-indigo-400 font-medium">{BILLING_AGENCY.subtitle}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-zinc-400 bg-zinc-900/60 p-3 rounded-lg border border-white/5">
                    {BILLING_AGENCY.highlight}
                  </p>

                  <div className="mt-6 space-y-3">
                    {BILLING_AGENCY.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-white/5 bg-zinc-900/30 p-3 hover:border-indigo-500/30 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-zinc-200">{item.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                            {item.tag}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-zinc-400">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                  <span>Scope Guarantee</span>
                  <span className="text-indigo-300 font-medium">Defined via SOW • No Hourly Creep</span>
                </div>
              </div>

              {/* Vendor Pass-Through Column */}
              <div className="rounded-2xl border border-emerald-500/20 bg-zinc-950/70 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <BILLING_VENDOR.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base sm:text-lg">
                        {BILLING_VENDOR.title}
                      </h4>
                      <p className="text-xs text-emerald-400 font-medium">{BILLING_VENDOR.subtitle}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-zinc-400 bg-zinc-900/60 p-3 rounded-lg border border-white/5">
                    {BILLING_VENDOR.highlight}
                  </p>

                  <div className="mt-6 space-y-3">
                    {BILLING_VENDOR.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-white/5 bg-zinc-900/30 p-3 hover:border-emerald-500/30 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-zinc-200">{item.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                            {item.tag}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-zinc-400">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                  <span>Merchant Autonomy</span>
                  <span className="text-emerald-300 font-medium">Billed To Your Card • Zero Middleman</span>
                </div>
              </div>
            </div>

            {/* Bottom Callout Banner */}
            <div className="mt-8 rounded-xl border border-white/10 bg-zinc-900/70 p-4 text-xs text-zinc-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>Our Guarantee:</strong> You retain complete ownership of all third-party accounts, API tokens, and payout bank accounts from day one.
                </span>
              </div>
              <span className="font-mono text-[11px] text-zinc-400 shrink-0">Client Root Credentials Only</span>
            </div>
          </div>
        </div>

        {/* ====================================================================
            5. INTERACTIVE ACCORDION FAQ
            ==================================================================== */}
        <div className="mt-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              <Database className="h-3.5 w-3.5 text-cyan-400" />
              <span>Architectural FAQ</span>
            </div>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Frequently Asked Technical & Handover Questions
            </h3>
            <p className="mt-3 text-sm text-zinc-400 sm:text-base">
              Clear answers regarding security posture, gateway migrations, and intellectual property ownership.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl space-y-4">
            {FAQ_LIST.map((faq) => {
              const isOpen = openFaqId === faq.id;
              const buttonId = `faq-trigger-${faq.id}`;
              const regionId = `faq-content-${faq.id}`;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-indigo-500/40 bg-zinc-900/90 shadow-[0_0_25px_-5px_rgba(99,102,241,0.15)]'
                      : 'border-white/10 bg-zinc-900/40 hover:border-white/20 hover:bg-zinc-900/60'
                  }`}
                >
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={regionId}
                    onClick={() => toggleFaq(faq.id)}
                    className="flex w-full items-start justify-between p-6 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    <div className="pr-4">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold block mb-1">
                        {faq.category}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                        {faq.question}
                      </h4>
                      <p className="mt-1.5 text-xs text-zinc-400 line-clamp-1">{faq.summary}</p>
                    </div>
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-zinc-800 text-zinc-300 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : ''
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  {/* Accordion Body with ARIA */}
                  {isOpen && (
                    <div
                      id={regionId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="border-t border-white/10 px-6 pb-6 pt-4 text-xs sm:text-sm text-zinc-300"
                    >
                      <div className="space-y-3 text-zinc-300 leading-relaxed">
                        {faq.paragraphs.map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>

                      {/* Key Highlights */}
                      <div className="mt-5 rounded-xl border border-white/10 bg-zinc-950/70 p-4">
                        <span className="text-xs font-semibold text-zinc-200 block mb-2 font-mono uppercase">
                          Architecture Highlights:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {faq.highlights.map((hl, hlIdx) => (
                            <div key={hlIdx} className="flex items-center gap-2 text-zinc-300">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                              <span>{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ====================================================================
            6. CONVERSION-FOCUSED CALL TO ACTION (CTA)
            ==================================================================== */}
        <div className="mt-28 relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-violet-950/70 via-indigo-950/80 to-slate-900 p-8 sm:p-12 text-center shadow-2xl">
          <div className="mx-auto max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300">
              <Zap className="h-3.5 w-3.5" />
              <span>Ready for Production</span>
            </div>

            <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Bridge the Gap Between Figma Tokens & Production Infrastructure
            </h3>

            <p className="mt-3 text-sm text-zinc-300 sm:text-base leading-relaxed">
              Book a 30-minute architecture discovery call. We review your current Figma library, API schemas, and gateway requirements to provide an exact scope with zero surprises.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Schedule Architecture Session</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-zinc-900/80 hover:bg-zinc-800 px-6 py-3.5 text-sm font-semibold text-zinc-200 transition-all hover:border-white/30"
              >
                <span>Explore Milestone Pricing</span>
                <ArrowUpRight className="h-4 w-4 text-zinc-400" />
              </a>
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" /> NDA Provided Pre-Call
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" /> Direct Lead Engineer Call
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesAddons;

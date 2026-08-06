import {
  Bot,
  BrainCircuit,
  Cpu,
  Globe2,
  Layers3,
  MonitorSmartphone,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";

import { siteUrl } from "./site";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const services = [
  {
    title: "Native Mobile Apps",
    href: "/mobile",
    description: "Premium iOS and Android products engineered for speed, retention, and marketplace scale.",
    icon: Smartphone,
    tags: ["Swift", "Kotlin", "Compose", "Store launch"],
  },
  {
    title: "Web Platforms",
    href: "/services#web",
    description: "Complex SaaS, marketplaces, internal tools, and customer portals built on resilient architecture.",
    icon: Globe2,
    tags: ["Next.js", "APIs", "Dashboards", "Cloud"],
  },
  {
    title: "AI & Machine Learning",
    href: "/services#ai",
    description: "Computer vision, recommendation engines, automation copilots, and production ML systems.",
    icon: BrainCircuit,
    tags: ["LLMs", "Vision", "MLOps", "Agents"],
  },
  {
    title: "Robotics & Automation",
    href: "/services#robotics",
    description: "Smart automation, robot fleet interfaces, control systems, and operations intelligence.",
    icon: Bot,
    tags: ["ROS", "Controls", "Telemetry", "Robotics"],
  },
  {
    title: "IoT Solutions",
    href: "/services#iot",
    description: "Connected devices, edge dashboards, sensor networks, and secure device lifecycle platforms.",
    icon: Cpu,
    tags: ["Edge", "Sensors", "MQTT", "Realtime"],
  },
];

export const stats = [
  { value: "48+", label: "Products shipped" },
  { value: "12", label: "Industries served" },
  { value: "99.95%", label: "Target platform uptime" },
  { value: "6wk", label: "Prototype sprint" },
];

export const featuredProjects = [
  {
    title: "PlantPal",
    href: "/plantpal",
    category: "Mobile + AI",
    description: "AI plant recognition, personalized care plans, reminders, and a calm mobile community experience.",
    tags: ["iOS", "Android", "Computer Vision"],
    // Brand red only; cards differ by the anchor point of the glow, not by hue.
    accent:
      "bg-[radial-gradient(110%_80%_at_12%_0%,rgba(255,0,51,.11),transparent_55%)] dark:bg-[radial-gradient(110%_80%_at_12%_0%,rgba(255,0,51,.30),transparent_58%)]",
  },
  {
    title: "NeuroOps Control",
    href: "/projects",
    category: "AI Automation",
    description: "Autonomous workflow orchestration for operations teams with auditability and human approvals.",
    tags: ["Agents", "Analytics", "Workflow"],
    accent:
      "bg-[radial-gradient(110%_80%_at_88%_0%,rgba(255,0,51,.10),transparent_55%)] dark:bg-[radial-gradient(110%_80%_at_88%_0%,rgba(255,0,51,.26),transparent_58%)]",
  },
  {
    title: "Atlas Robotics",
    href: "/projects",
    category: "Robotics",
    description: "Fleet telemetry, predictive maintenance, and real-time command surfaces for warehouse robotics.",
    tags: ["Robotics", "IoT", "Realtime"],
    accent:
      "bg-[radial-gradient(120%_85%_at_50%_0%,rgba(255,0,51,.09),transparent_58%)] dark:bg-[radial-gradient(120%_85%_at_50%_0%,rgba(255,0,51,.22),transparent_60%)]",
  },
];

export const whyUs = [
  {
    title: "Product-first engineering",
    description: "Strategy, UX, platform architecture, and release execution stay connected from day one.",
    icon: Rocket,
  },
  {
    title: "Systems that can scale",
    description: "We design the data, API, cloud, and observability layers before growth exposes the weak points.",
    icon: Layers3,
  },
  {
    title: "Security by default",
    description: "Identity, permissions, privacy, and operational controls are built into the product foundation.",
    icon: ShieldCheck,
  },
  {
    title: "AI-native delivery",
    description: "Modern AI workflows are applied where they make the product faster, smarter, or more efficient.",
    icon: Sparkles,
  },
];

export const testimonials = [
  {
    quote: "MediaRise brought the clarity of a senior product team and the execution speed of a focused studio.",
    name: "Elena V.",
    role: "Founder, HealthTech platform",
  },
  {
    quote: "They turned our robotics telemetry problem into a polished control surface our operators actually trust.",
    name: "Marcus L.",
    role: "COO, automation company",
  },
  {
    quote: "PlantPal proved they can combine elegant mobile design with serious AI infrastructure.",
    name: "Nadia R.",
    role: "Consumer apps advisor",
  },
];

export const serviceDetails = [
  {
    id: "mobile",
    title: "Mobile Applications",
    kicker: "iOS, Android, and cross-platform product systems",
    description: "We ship native apps with thoughtful UX, resilient offline states, secure auth, analytics, subscriptions, and store launch support.",
    capabilities: ["Native Swift and Kotlin delivery", "React Native and Flutter teams", "Push notifications and subscriptions", "App Store and Play Store launch systems"],
    icon: MonitorSmartphone,
  },
  {
    id: "web",
    title: "Web Development",
    kicker: "Complex platforms and high-performance interfaces",
    description: "From customer-facing portals to operational SaaS, we build web systems with clean data models, fast interfaces, and measurable reliability.",
    capabilities: ["Next.js platforms", "API and backend architecture", "Admin dashboards", "Realtime collaboration"],
    icon: Globe2,
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    kicker: "Applied intelligence for real products",
    description: "We integrate LLMs, computer vision, ranking systems, automation agents, and production ML workflows with strong evaluation loops.",
    capabilities: ["AI copilots and agents", "Computer vision pipelines", "Recommendation engines", "MLOps and model monitoring"],
    icon: BrainCircuit,
  },
  {
    id: "robotics",
    title: "Robotics & Automation",
    kicker: "Software for physical-world operations",
    description: "We create operator consoles, fleet dashboards, automation logic, robotics telemetry, and control interfaces for industrial teams.",
    capabilities: ["ROS-aware interfaces", "Fleet operations dashboards", "Predictive maintenance", "Human-in-the-loop controls"],
    icon: Bot,
  },
  {
    id: "iot",
    title: "IoT Solutions",
    kicker: "Connected devices, sensor networks, and edge systems",
    description: "We connect hardware to secure cloud services, realtime dashboards, alerting, firmware workflows, and device management experiences.",
    capabilities: ["MQTT and realtime streams", "Device onboarding", "Edge analytics", "Secure fleet management"],
    icon: Cpu,
  },
];

export const process = [
  { title: "Discovery", description: "Product goals, user journeys, technical risk, and the smallest valuable release." },
  { title: "Architecture", description: "Data, APIs, mobile/web surfaces, infrastructure, security, analytics, and release plan." },
  { title: "Build", description: "Design systems, production code, QA loops, automated checks, and weekly release demos." },
  { title: "Scale", description: "Launch support, monitoring, optimization, roadmap planning, and growth experiments." },
];

export const projectFilters = ["All", "Mobile", "AI", "Robotics", "Web"];

export type PortfolioProject = {
  title: string;
  category: string;
  type: string;
  description: string;
  href: string;
  metrics: string[];
  /** Real product screenshot. Cards without one fall back to the icon header. */
  image?: string;
  imageAlt?: string;
};

export const projects: PortfolioProject[] = [
  {
    title: "Vibe Video",
    category: "Mobile",
    type: "iOS + macOS video editor",
    description:
      "Short-form editor with a multitrack timeline, green-screen overlays, stickers and one-tap export to TikTok, Reels, Shorts and YouTube.",
    href: "https://vibevideo.fun",
    metrics: ["Shipping on the App Store for iPhone, iPad and Mac", "Localized into 6 languages"],
    image: "/images/projects/vibevideo-editor.webp",
    imageAlt: "Vibe Video editor on macOS: multitrack timeline with a chroma-key overlay and the layer inspector",
  },
  {
    title: "PlantPal",
    category: "Mobile",
    type: "AI plant care app",
    description: "Flagship consumer app with AI identification, care reminders, disease hints, and community loops.",
    href: "/plantpal",
    metrics: ["91% week-one task completion", "34% reminder conversion lift"],
  },
  {
    title: "VisionLine QA",
    category: "AI",
    type: "Computer vision inspection",
    description: "Realtime production-line anomaly detection dashboard with model confidence workflows.",
    href: "/projects",
    metrics: ["23ms edge inference", "42% fewer manual reviews"],
  },
  {
    title: "FleetCore",
    category: "Robotics",
    type: "Robotics operations suite",
    description: "Command center for autonomous warehouse units with telemetry, routes, and maintenance signals.",
    href: "/projects",
    metrics: ["800+ devices monitored", "99.9% event ingestion"],
  },
  {
    title: "PulseDesk",
    category: "Web",
    type: "SaaS analytics platform",
    description: "Executive analytics workspace for distributed teams with permissions and realtime reporting.",
    href: "/projects",
    metrics: ["4.8s to 1.1s dashboard load", "18 markets launched"],
  },
];

export const plantPalFeatures = [
  "AI plant identification from a single photo",
  "Personalized watering, light, and feeding schedules",
  "Care reminders synchronized across devices",
  "Plant health diagnostics and recovery guidance",
  "Community collections, notes, and progress timelines",
  "Premium insights for rare and indoor plants",
];

export const androidBenefits = [
  "Kotlin-first codebases with Jetpack Compose UI systems",
  "Play Store readiness, signing, rollout, and ASO support",
  "Performance profiling for cold starts, memory, and battery",
  "Offline-first data, push, subscriptions, widgets, and wearables",
  "Secure auth, encrypted storage, and policy-compliant releases",
];

export const contactCards = [
  { title: "New products", value: "hello@mediarise.org" },
  { title: "Partnerships", value: "partners@mediarise.org" },
  { title: "Office", value: "Remote-first studio serving global clients" },
];

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MediaRise",
  url: siteUrl,
  logo: `${siteUrl}/images/mediarise-logo.png`,
  sameAs: [siteUrl],
  description: "Premium technology company specializing in mobile apps, web platforms, AI, robotics, IoT, and digital transformation.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@mediarise.org",
  },
};

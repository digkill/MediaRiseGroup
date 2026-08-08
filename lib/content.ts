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
    title: "Vibe Video",
    href: "/vibe-video",
    category: "iOS · iPadOS · macOS",
    description:
      "Short-form video editor for iPhone, iPad and Mac: multitrack timeline, green-screen overlays, stickers and one-tap export to social formats.",
    tags: ["Swift", "AVFoundation", "App Store"],
    // Brand red only; cards differ by the anchor point of the glow, not by hue.
    accent:
      "bg-[radial-gradient(110%_80%_at_12%_0%,rgba(255,0,51,.11),transparent_55%)] dark:bg-[radial-gradient(110%_80%_at_12%_0%,rgba(255,0,51,.30),transparent_58%)]",
  },
  {
    title: "PlantPal",
    href: "/plantpal",
    category: "Mobile + AI",
    description: "AI plant recognition, personalized care plans, reminders, and a calm mobile community experience.",
    tags: ["Kotlin", "Compose", "Computer Vision"],
    accent:
      "bg-[radial-gradient(110%_80%_at_88%_0%,rgba(255,0,51,.10),transparent_55%)] dark:bg-[radial-gradient(110%_80%_at_88%_0%,rgba(255,0,51,.26),transparent_58%)]",
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
    type: "iOS, iPadOS & macOS video editor",
    description:
      "One SwiftUI codebase shipping as a touch editor on iPhone and iPad and a windowed editor on Mac: multitrack timeline, green screen, stickers and one-tap social export.",
    href: "/vibe-video",
    metrics: ["Native iPhone, iPad and Mac builds from one codebase", "On the App Store, localized into 6 languages"],
    image: "/images/projects/vibevideo/mac-editor.webp",
    imageAlt: "Vibe Video editor on macOS: multitrack timeline with a chroma-key overlay and the layer inspector",
  },
  {
    title: "Rush Messanger",
    category: "Mobile",
    type: "End-to-end encrypted messenger",
    description:
      "Direct messages, groups, channels and WebRTC audio/video calls across native iOS and Android clients, a Tauri desktop app and a Rust realtime backend.",
    href: "https://www.rushmessanger.com",
    metrics: [
      "Rust server with native iOS, Android and Tauri desktop clients",
      "E2EE by X25519/ECDH exchange and AES-256-GCM — private keys stay on device",
    ],
  },
  {
    title: "Platinum OS One",
    category: "Systems",
    type: "Linux platform & Rust build system",
    description:
      "A universal Linux platform for bootable images: one Ubuntu Base userspace and one package set across phones, tablets, PCs and robots, driven by a Rust build pipeline and a Qt/QML device shell.",
    href: "https://github.com/digkill/Platinum-OS",
    metrics: [
      "Ten-crate Rust workspace; board support ships as TOML data, not engine branches",
      "Board targets: Orange Pi Zero 3W, Raspberry Pi 5, Parallels ARM64",
    ],
    image: "/images/projects/platinum/shell-apps.webp",
    imageAlt: "Platinum OS shell on a landscape display: the Applications grid with Calendar, Clock, Contacts, AI, Files, Terminal and Messages",
  },
  {
    title: "Hunter Demons",
    category: "Games",
    type: "3D action game on Godot",
    description:
      "Wave-based demon hunting with a cyber-sakura katana: touch-first controls, eight enemy types with two bosses, and levels from a neon district to a flooded temple.",
    href: "https://github.com/digkill/HunterDemons",
    metrics: [
      "Godot 4.6 with the mobile renderer and Jolt physics; 7.6k lines of GDScript",
      "Export targets for iOS, Android, macOS, Windows and Raspberry Pi arm64",
    ],
    image: "/images/projects/hunterdemons/neon-district.webp",
    imageAlt: "Hunter Demons gameplay: the heroine Yukka facing a demon in a neon-lit district, with health, mana and Dragon Spirit meters and on-screen touch controls",
  },
  {
    title: "PlantPal",
    category: "Mobile",
    type: "AI plant care app",
    description: "Consumer app with AI plant identification, personalized care plans, reminders, and community collections.",
    href: "/plantpal",
    metrics: ["Kotlin and Jetpack Compose, Play Store release in preparation", "Stores data on device — nothing collected or shared"],
  },
];

/** Derived from the data so a filter can never point at an empty result set. */
export const projectFilters = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];

export const vibeVideo = {
  appStoreUrl: "https://apps.apple.com/us/app/vibe-video-video-editor/id6794705650",
  siteUrl: "https://vibevideo.fun",
  platforms: ["iOS 17+", "iPadOS 17+", "macOS 14+"],
  mac: [
    {
      src: "/images/projects/vibevideo/mac-editor.webp",
      alt: "Vibe Video on macOS: multitrack timeline with a chroma-key overlay selected and the layer inspector open",
      caption: "Multitrack timeline with per-lane layer order, split and trim",
      wide: true,
    },
    {
      src: "/images/projects/vibevideo/mac-formats.webp",
      alt: "Canvas format menu listing TikTok, YouTube Shorts, Instagram Reels, Facebook Reels, Instagram portrait and post, YouTube and a custom size",
      caption: "Canvas presets for TikTok, Shorts, Reels, Instagram and YouTube — plus a custom size",
    },
    {
      src: "/images/projects/vibevideo/mac-memes.webp",
      alt: "Green-screen meme picker showing a grid of cat clips shot on a green background",
      caption: "Built-in green-screen meme library",
    },
    {
      src: "/images/projects/vibevideo/mac-text.webp",
      alt: "Text sticker inspector with style presets, colour, font size, outline and plate controls",
      caption: "Text styling: presets, colour, outline and plate",
    },
    {
      src: "/images/projects/vibevideo/mac-export.webp",
      alt: "Export finished dialog showing the TikTok 1080x1920 output with save and share actions",
      caption: "Export straight to the gallery or the share sheet",
    },
  ],
  mobile: [
    {
      src: "/images/projects/vibevideo/iphone-editor.webp",
      alt: "Vibe Video on iPhone in dark appearance: preview, tool bar and three timeline lanes",
      caption: "iPhone — dark appearance",
    },
    {
      src: "/images/projects/vibevideo/iphone-light.webp",
      alt: "The same iPhone project in light appearance",
      caption: "iPhone — light appearance",
    },
    {
      src: "/images/projects/vibevideo/ipad-editor.webp",
      alt: "Vibe Video on iPad Pro with the sticker inspector and a four-lane timeline",
      caption: "iPad — inspector alongside the timeline",
      wide: true,
    },
  ],
  features: [
    "Multitrack timeline with drag between lanes, trim and split",
    "Green-screen chroma key plus person and background removal",
    "Video, image and text stickers sharing one z-order stack",
    "Export presets for TikTok, Shorts, Reels, Instagram and YouTube",
    "Voice-over and camera capture recorded into the project",
    "Projects saved as .pjvv documents with autosave between launches",
  ],
};

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

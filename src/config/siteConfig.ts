export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  artist: string;
  category: string;
  year: string;
  medium: string;
  dimensions: string;
  valuation: string;
  vaultLocation: string;
  provenance: string;
  description: string;
  imageUrl: string;
  palette: string[];
  aspect: 'tall' | 'wide' | 'square';
  featured?: boolean;
}

export interface SiteConfig {
  brandName: string;
  brandTagline: string;
  heroLabel: string;
  heroTitle: string;
  heroDescription: string;
  primaryCta: string;
  secondaryCta: string;
  subCtaText: string;
  prankSuspenseDelayMs?: number;
  prankDurationMs: number;
  prankAudioPath: string;
  shareTitle: string;
  shareText: string;
  galleryItems: GalleryItem[];
}

export const siteConfig: SiteConfig = {
  brandName: "VELORA",
  brandTagline: "Contemporary Art, Gallery & Billionaires Sovereign Vault",
  heroLabel: "VELORA CONTEMPORARY // PRIVATE SOVEREIGN VAULT",
  heroTitle: "CONTEMPORARY MASTERWORKS & SOVEREIGN ARCHIVES.",
  heroDescription: "An invitation-only gallery of original contemporary paintings and ultra-valuable blue-chip acquisitions. Verified provenance, private audits, and sovereign subterranean vault authentication.",
  primaryCta: "EXPLORE GALLERY",
  secondaryCta: "MY ARTWORK GALLERY",
  subCtaText: "High-resolution masterworks catalog.",
  prankSuspenseDelayMs: 3000, // 3s suspense delay as requested before loud audio starts
  prankDurationMs: 19000, // 3s suspense + 16s loud playback before CLOSE button appears
  prankAudioPath: "/audio/prank-master.mp3",
  shareTitle: "VELORA — Contemporary Art & Sovereign Gallery",
  shareText: "Explore the exclusive VELORA gallery and sovereign collection 💎",
  galleryItems: [
    {
      id: "velora-01",
      title: "The Ethereal Gaze (Masterwork I)",
      subtitle: "Contemporary Expressive Figuration",
      artist: "VELORA Studio",
      category: "Contemporary Figuration / Oil & Mixed Media",
      year: "2026 Sovereign Edition",
      medium: "Oil, pure pigment & cold wax on fine Belgian linen",
      dimensions: "160 × 120 cm",
      valuation: "$142,000,000 USD",
      vaultLocation: "Zurich Freeport Subterranean Vault #4",
      provenance: "Acquired via Private Sovereign Treaty. Exhibited at Biennale Arte.",
      description: "A monumental study of human perception and raw emotion. Rendered in sweeping tactile strokes of deep cobalt, crimson, and layered impasto oils.",
      imageUrl: "/images/kexart/1.webp",
      palette: ["#1a2a44", "#8b1e2d", "#d4af37", "#121212"],
      aspect: "tall",
      featured: true,
    },
    {
      id: "velora-02",
      title: "Chromatic Reverie (Composition II)",
      subtitle: "Abstract Neo-Expressionism",
      artist: "VELORA Studio",
      category: "Neo-Expressionism / Encaustic & Oil",
      year: "2025 Bluechip Archive",
      medium: "Raw earth mineral pigments and Venetian turpentine",
      dimensions: "180 × 140 cm",
      valuation: "$118,500,000 USD",
      vaultLocation: "Geneva Freeport High-Security Depository",
      provenance: "Direct studio accession into Sovereign Family Office Trust.",
      description: "An evocative immersion into emotional topography. Luminous chromatic fields meet dense textural underpaintings.",
      imageUrl: "/images/kexart/2.webp",
      palette: ["#2d1b4e", "#c59b27", "#183059", "#0d0d0d"],
      aspect: "tall",
      featured: true,
    },
    {
      id: "velora-03",
      title: "Monochrome Introspection (Plate III)",
      subtitle: "Structured Tonal Minimalism",
      artist: "VELORA Studio",
      category: "Post-War & Contemporary Minimalism",
      year: "2025 Sovereign Edition",
      medium: "Aerosol, carbon graphite, and unprimed heavyweight sailcloth",
      dimensions: "150 × 110 cm",
      valuation: "$96,000,000 USD",
      vaultLocation: "Singapore Le Freeport Vault A-12",
      provenance: "Commissioned exclusively for the Sovereign Biennial Pavilion.",
      description: "A profound deconstruction of form and silence. Subtle gradations of black, charcoal, and pale silver interact with spatial lighting.",
      imageUrl: "/images/kexart/3.webp",
      palette: ["#111111", "#444444", "#888888", "#f0f0f0"],
      aspect: "tall",
      featured: false,
    },
    {
      id: "velora-04",
      title: "Nocturne Ascendance (Study IV)",
      subtitle: "Luminous Lyrical Abstraction",
      artist: "VELORA Studio",
      category: "Lyrical Abstraction / Enamel & Oil",
      year: "2026 Sovereign Edition",
      medium: "Ground lapis lazuli, gold leaf sizing, and cold wax",
      dimensions: "200 × 160 cm",
      valuation: "$165,000,000 USD",
      vaultLocation: "Luxembourg Freeport Sovereign Bunker",
      provenance: "Single-owner private collection since debut.",
      description: "Vibrant currents of indigo and amber clash across an expansive field, exploring the boundary between nocturnal solitude and awakening.",
      imageUrl: "/images/kexart/4.webp",
      palette: ["#0b1d3a", "#e2a93b", "#5c1d24", "#080c14"],
      aspect: "tall",
      featured: true,
    },
    {
      id: "velora-05",
      title: "The Obsidian Flow (Study V)",
      subtitle: "Gestural Figuration & Dynamic Form",
      artist: "VELORA Studio",
      category: "Contemporary Figuration / Oil on Canvas",
      year: "2025 Sovereign Archive",
      medium: "Viscous oil paste and bitumen on raw canvas",
      dimensions: "175 × 130 cm",
      valuation: "$88,000,000 USD",
      vaultLocation: "Vaduz Liechtenstein Private Vault",
      provenance: "Exhibited internationally; private sale confirmation verified.",
      description: "Dramatic gestural brushwork creating a lifelike tension between the subject and the ambient void.",
      imageUrl: "/images/kexart/5.webp",
      palette: ["#1e1e24", "#d4af37", "#701a1e", "#050505"],
      aspect: "tall",
      featured: false,
    },
    {
      id: "velora-06",
      title: "Harmonic Radiance (No. 6)",
      subtitle: "Color-Field Luminescence",
      artist: "VELORA Studio",
      category: "Color Field / Acrylic & Polymer",
      year: "2026 Sovereign Edition",
      medium: "Fluorescent acrylic glazes and titanium white on stretched linen",
      dimensions: "190 × 150 cm",
      valuation: "$112,000,000 USD",
      vaultLocation: "Monaco Safe Custody Private Wing",
      provenance: "Direct studio cataloging with bilateral insurance endorsement.",
      description: "Infinite subtle glazes producing an inner optical vibration that responds directly to natural gallery illuminance.",
      imageUrl: "/images/kexart/6.webp",
      palette: ["#3b1c32", "#c99a3e", "#204051", "#0a0a0f"],
      aspect: "tall",
      featured: false,
    },
    {
      id: "velora-07",
      title: "Ethereal Echoes (Composition VII)",
      subtitle: "Billionaire Sovereign Vault Masterpiece",
      artist: "VELORA Studio",
      category: "Contemporary Mixed Media Masterwork",
      year: "2026 Sovereign Edition",
      medium: "Archival pigment, 24k gold leaf dust & dammar varnish",
      dimensions: "210 × 170 cm",
      valuation: "$185,000,000 USD",
      vaultLocation: "Zurich Freeport Subterranean Vault #1",
      provenance: "The crown asset of the VELORA collection: uniting museum-grade provenance with breathtaking optical presence.",
      description: "The crown asset of the VELORA collection: uniting museum-grade provenance with breathtaking optical presence.",
      imageUrl: "/images/kexart/7.webp",
      palette: ["#16213e", "#e94560", "#0f3460", "#ffd700"],
      aspect: "tall",
      featured: true,
    },
  ],
};

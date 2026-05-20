export const SERVICES = [
  "spotify",
  "apple-music",
  "netflix",
  "youtube",
  "chatgpt",
  "cursor",
  "drive",
  "amazon-prime-video",
  "claude",
  "apple-tv+",
  "disney+",
  "hbo-max",
  "hulu",
  "paramount+",
  "microsoft-365",
  "github-copilot",
  "notion",
  "dropbox",
  "linkedin-premium",
  "xbox-game-pass",
] as const;
export const SERVICE_CATEGORIES = ["popular"] as const;

export type Service = (typeof SERVICES)[number];

export type ServiceMetadata = {
  name: string;
  logoUrl: string;
};

export const SERVICES_REGISTRY = {
  youtube: {
    name: "YouTube",
    logoUrl: "/services/youtube.svg",
  },
  spotify: {
    name: "Spotify",
    logoUrl: "/services/spotify.svg",
  },
  netflix: {
    name: "Netflix",
    logoUrl: "/services/netflix.svg",
  },
  "apple-music": {
    name: "Apple Music",
    logoUrl: "/services/apple-music.svg",
  },
  chatgpt: {
    name: "ChatGPT",
    logoUrl: "/services/chatgpt.svg",
  },
  cursor: {
    name: "Cursor",
    logoUrl: "/services/cursor.svg",
  },
  drive: {
    name: "Drive",
    logoUrl: "/services/drive.svg",
  },
  "amazon-prime-video": {
    name: "Amazon Prime Video",
    logoUrl: "/services/amazon-prime-video.svg",
  },
  claude: {
    name: "Claude",
    logoUrl: "/services/claude.svg",
  },
  "apple-tv+": {
    name: "Apple TV+",
    logoUrl: "/services/apple-tv+.svg",
  },
  "disney+": {
    name: "Disney+",
    logoUrl: "/services/disney+.svg",
  },
  "hbo-max": {
    name: "HBO Max",
    logoUrl: "/services/hbo-max.svg",
  },
  hulu: {
    name: "Hulu",
    logoUrl: "/services/hulu.svg",
  },
  "paramount+": {
    name: "Paramount+",
    logoUrl: "/services/paramount+.svg",
  },
  "microsoft-365": {
    name: "Microsoft 365",
    logoUrl: "/services/microsoft-365.svg",
  },
  "github-copilot": {
    name: "GitHub Copilot",
    logoUrl: "/services/github-copilot.svg",
  },
  notion: {
    name: "Notion",
    logoUrl: "/services/notion.svg",
  },
  dropbox: {
    name: "Dropbox",
    logoUrl: "/services/dropbox.svg",
  },
  "linkedin-premium": {
    name: "LinkedIn Premium",
    logoUrl: "/services/linkedin.svg",
  },
  "xbox-game-pass": {
    name: "Xbox Game Pass",
    logoUrl: "/services/xbox.svg",
  },
} satisfies Record<Service, ServiceMetadata>;

export function getServiceMetadata(service: Service): ServiceMetadata {
  return SERVICES_REGISTRY[service];
}

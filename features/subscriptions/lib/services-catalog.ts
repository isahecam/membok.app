export const SERVICES = ["spotify", "apple-music"] as const;

export type Service = (typeof SERVICES)[number];

export type ServiceMetadata = {
  name: string;
  logoUrl: string;
};

export const SERVICES_REGISTRY = {
  spotify: {
    name: "Spotify",
    logoUrl: "/services/spotify.svg",
  },
  "apple-music": {
    name: "Apple Music",
    logoUrl: "/services/apple-music.svg",
  },
} satisfies Record<Service, ServiceMetadata>;

export function getServiceMetadata(service: Service): ServiceMetadata {
  return SERVICES_REGISTRY[service];
}

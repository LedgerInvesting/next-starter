import { getSelfURL } from "@/lib/utils";

export type SiteConfig = {
	company: string;
	name: string;
	description: string;
	url: string;
	domain?: string;
	ogImage: string;
  twitter_handle?: string;
	links: {
		twitter?: string;
		github?: string;
		linkedin?: string;
		youtube?: string;
		instagram?: string;
	};
};

export const siteConfig: SiteConfig = {
	company: "Acme Inc.",
	name: "Site name",
	description: "This is a new site in Next.js with Tailwind CSS.",
	domain: "example.com",
	url: "https://example.com",
	ogImage: getSelfURL('/og.png'),
  twitter_handle: '@example',
	links: {
		twitter: "https://twitter.com/example",
		github: "https://github.com/example",
    youtube: 'https://youtube.com/@example',
    linkedin: 'https://www.linkedin.com/company/example',
    instagram: 'https://www.instagram.com/example',
	},
};

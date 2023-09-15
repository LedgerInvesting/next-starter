import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
	const date = new Date(input);
	return date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}

export function getSelfURL(path?: string) {
	if (process.env.NEXT_PUBLIC_APP_URL?.startsWith("http")) {
		return `${process.env.NEXT_PUBLIC_APP_URL}${path ?? ""}`;
	}
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}${path ?? ""}`;
	}
	throw new Error("NEXT_PUBLIC_APP_URL or VERCEL_URL must be set");
}

export const sampleArray = (array: any[]) => {
	return array[Math.floor(Math.random() * array.length)];
};

export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

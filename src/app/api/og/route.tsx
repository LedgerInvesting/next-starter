import { siteConfig } from '@/config/site';
import GithubAltLogo from '@/images/social/github-alt';
import { ImageResponse } from 'next/server'

import * as z from 'zod'

export const runtime = 'edge'

// https://vercel.com/docs/functions/edge-functions/og-image-generation/og-image-examples
// Test it: http://localhost:3000/api/og?heading=Test&type=blog&mode=light
const ogImageSchema = z.object({
	heading: z.string(),
	type: z.string(),
	mode: z.enum(['light', 'dark']).default('dark'),
})

const interRegular = fetch(
	new URL("../../../../assets/fonts/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const interBold = fetch(
	new URL("../../../../assets/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(req: Request) {
	try {
		const fontRegular = await interRegular;
		const fontBold = await interBold;

		const url = new URL(req.url);
		const values = ogImageSchema.parse(Object.fromEntries(url.searchParams));
		const heading =
			values.heading.length > 140
				? `${values.heading.substring(0, 140)}...`
				: values.heading;

		const { mode } = values;
		const paint = mode === "dark" ? "#fff" : "#000";

		const fontSize = heading.length > 100 ? "70px" : "100px";

		return new ImageResponse(
			(
				<div
					tw="flex relative flex-col p-12 w-full h-full items-start"
					style={{
						color: paint,
						background:
							mode === "dark"
								? "linear-gradient(90deg, #000 0%, #111 100%)"
								: "white",
					}}
				>
					<div tw="flex flex-col flex-1 py-10">
						<div
							tw="flex text-xl uppercase font-bold tracking-tight"
							style={{ fontFamily: "Inter", fontWeight: "normal" }}
						>
							{values.type}
						</div>
						<div
							tw="flex leading-[1.1] text-[80px] font-bold"
							style={{
								fontFamily: "Cal Sans",
								fontWeight: "bold",
								marginLeft: "-3px",
								fontSize,
							}}
						>
							{heading}
						</div>
					</div>
					<div tw="flex items-center w-full justify-between">
						<div
							tw="flex text-xl"
							style={{ fontFamily: "Inter", fontWeight: "normal" }}
						>
							{siteConfig.domain}
						</div>
						<div
							tw="flex items-center text-xl"
							style={{ fontFamily: "Inter", fontWeight: "normal" }}
						>
							<GithubAltLogo color={paint} filled={false} />
							<div tw="flex ml-2">{siteConfig.links.github}</div>
						</div>
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: "Inter",
						data: fontRegular,
						weight: 400,
						style: "normal",
					},
					{
						name: "Cal Sans",
						data: fontBold,
						weight: 700,
						style: "normal",
					},
				],
			}
		);
	} catch (error) {
		return new Response(`Failed to generate image`, {
			status: 500,
		});
	}
}

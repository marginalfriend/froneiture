import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'islorofnknirtmsfebqw.supabase.co',
				port: '',
				pathname: '/storage/v1/object/public/images/**',
			},
		],
	},
};

export default nextConfig;

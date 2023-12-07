import { NextSeo } from 'next-seo';

const SEO = () => {
	return (
		<NextSeo
			title='Portals'
			description='A cross-chain marketplace for content with access control'
			openGraph={{
				url: 'https://portals-teal.vercel.app',
				title: 'Portals',
				description: 'A cross-chain marketplace for content with access control.',
				images: [
					{
						url: 'https://i.ibb.co/5xD7fXY/OG.png',
						width: 1200,
						height: 630,
						alt: 'Portals OG Image',
						type: 'image/png',
					},
				],
				siteName: 'Portals',
			}}
			twitter={{
				handle: '@Envoy_1084',
				site: '@Envoy_1084',
				cardType: 'summary_large_image',
			}}
		/>
	);
};

export default SEO;

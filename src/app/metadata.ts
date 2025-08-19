import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kangalos.ur.ac.rw';
  const appName = process.env.NEXT_PUBLIC_APP_NAME ?? 'Kangalos: Project Management Platform';
  const locale = process.env.NEXT_PUBLIC_LOCALE ?? 'en_US';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: appName,
      template: `%s | ${appName}`,
    },
    description: "An all-in-one project management platform for the University of Rwanda and its partner institutions. Discover, track, and manage research projects, student theses, and innovation initiatives.",
    keywords: [
      'Project Management',
      'University of Rwanda',
      'Research Projects',
      'Innovation Platform',
      'Student Thesis',
      'Grant Management',
      'Academic Research',
      'Kangalos',
      'Project Directory',
      'Funding Tracker',
      'Research Management',
      'Innovation Hub',
    ],
    authors: [{ name: 'University of Rwanda' }],
    creator: 'University of Rwanda',
    publisher: 'University of Rwanda',
    formatDetection: { email: false, address: false, telephone: false },
    openGraph: {
      type: 'website',
      locale,
      url: siteUrl,
      siteName: appName,
      title: appName,
      description: "An all-in-one project management platform for the University of Rwanda and its partner institutions. Discover, track, and manage research projects, student theses, and innovation initiatives.",
      images: [
        {
          url: `${siteUrl}/images/kangalos-banner.png`,
          width: 1200,
          height: 630,
          alt: appName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: appName,
      description: "An all-in-one project management platform for the University of Rwanda and its partner institutions.",
      images: [`${siteUrl}/images/kangalos-banner.png`],
      creator: "@UniversityRwanda",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: [
        { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        { rel: 'mask-icon', url: '/favicons/safari-pinned-tab.svg', color: "#1e40af" },
      ],
    },
    manifest: '/favicons/site.webmanifest',
  };
}

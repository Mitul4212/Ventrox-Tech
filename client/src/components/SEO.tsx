import { Helmet } from "react-helmet-async";

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    keywords?: string[];
    image?: string;
    type?: string;
}

export function SEO({
    title,
    description,
    canonical,
    keywords = [],
    image = "/og-image.png",
    type = "website"
}: SEOProps) {
    const siteUrl = "https://www.ventroxtech.in";
    const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
    const fullImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title} | VentroX Tech</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullCanonical} />
            {keywords.length > 0 && (
                <meta name="keywords" content={keywords.join(", ")} />
            )}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullCanonical} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />
        </Helmet>
    );
}

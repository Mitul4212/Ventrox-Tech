import { Helmet } from "react-helmet-async";

export function SchemaJSONLD() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "VentroX Tech",
        "url": "https://www.ventroxtech.in",
        "logo": "https://www.ventroxtech.in/logo.png",
        "sameAs": [
            "https://www.linkedin.com/company/ventroxtech",
            "https://twitter.com/ventroxtech",
            "https://www.instagram.com/ventroxtech"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-XXXXXXXXXX",
            "contactType": "customer service",
            "areaServed": ["IN", "US", "UK", "AE"],
            "availableLanguage": ["English", "Hindi", "Gujarati"]
        }
    };

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "VentroX Tech",
        "image": "https://www.ventroxtech.in/logo.png",
        "url": "https://www.ventroxtech.in",
        "telephone": "+91-XXXXXXXXXX",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Your Street Address",
            "addressLocality": "Ahmedabad",
            "addressRegion": "Gujarat",
            "postalCode": "380001",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 23.0225,
            "longitude": 72.5714
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "09:00",
            "closes": "18:00"
        },
        "priceRange": "$$"
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(organizationSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(localBusinessSchema)}
            </script>
        </Helmet>
    );
}

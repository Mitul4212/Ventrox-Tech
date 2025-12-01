import { useEffect } from "react";
import { useLocation } from "wouter";

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Replace with actual ID

export function Analytics() {
    const [location] = useLocation();

    useEffect(() => {
        // Initialize GA4
        const script = document.createElement("script");
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        script.async = true;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
            window.dataLayer.push(args);
        }
        window.gtag = gtag;
        gtag("js", new Date());
        gtag("config", GA_MEASUREMENT_ID);

        return () => {
            // Cleanup if needed, though usually GA script stays
        };
    }, []);

    useEffect(() => {
        // Track page views
        if (window.gtag) {
            window.gtag("config", GA_MEASUREMENT_ID, {
                page_path: location,
            });
        }
    }, [location]);

    return null;
}

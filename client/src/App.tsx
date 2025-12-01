import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";
import AppDevelopment from "@/pages/services/AppDevelopment";
import WebDevelopment from "@/pages/services/WebDevelopment";
import AIAutomation from "@/pages/services/AIAutomation";
import GlobalLanding from "@/pages/global/GlobalLanding";
import { HelmetProvider } from "react-helmet-async";
import { SchemaJSONLD } from "@/components/SchemaJSONLD";
import { Analytics } from "@/components/Analytics";
import { useEffect } from "react";
import { apiRequest } from "./lib/queryClient";

function PageViewTracker() {
  const [location] = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        await apiRequest("POST", "/api/analytics/pageview", {
          path: location,
          referrer: document.referrer || null,
        });
      } catch {
        // Silently fail - analytics shouldn't break the app
      }
    };
    trackPageView();
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/contact" component={Contact} />
      <Route path="/blog/:slug?" component={Blog} />
      <Route path="/admin" component={Admin} />
      <Route path="/admin" component={Admin} />

      {/* Service Pages */}
      <Route path="/services/app-development" component={AppDevelopment} />
      <Route path="/services/web-development" component={WebDevelopment} />
      <Route path="/services/ai-automation" component={AIAutomation} />

      {/* Global Landing Pages */}
      <Route path="/global/:region" component={GlobalLanding} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isAdmin = location === "/admin";

  return (
    <HelmetProvider>
      <SchemaJSONLD />
      <Analytics />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <PageViewTracker />
          <div className="flex flex-col min-h-screen">
            {!isAdmin && <Navigation />}
            <main className="flex-1">
              <Router />
            </main>
            {!isAdmin && <Footer />}
          </div>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

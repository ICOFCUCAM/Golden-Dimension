import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<Index />} />
              <Route path="/services" element={<Index />} />
              <Route path="/services/:serviceId" element={<Index />} />
              <Route path="/industries" element={<Index />} />
              <Route path="/methodology" element={<Index />} />
              <Route path="/engagement-models" element={<Index />} />
              <Route path="/leadership" element={<Index />} />
              <Route path="/transport" element={<Index />} />
              <Route path="/news" element={<Index />} />
              <Route path="/legal" element={<Index />} />
              <Route path="/contact" element={<Index />} />
              <Route path="/admin" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;

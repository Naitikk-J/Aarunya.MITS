import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Headliners from "./pages/Headliners";
import Theme from "./pages/Theme";
import AboutUs from "./pages/AboutUs";
import History from "./pages/History";
import Schedule from "./pages/Schedule";
import Events from "./pages/Events";
import Merch from "./pages/Merch";
import Competitions from "./pages/Competitions";
import Sponsors from "./pages/Sponsors";
import Hierarchy from "./pages/Hierarchy";
import ContactUs from "./pages/ContactUs";
import Register from "./pages/Register";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/merch" element={<Merch />} />
                    <Route path="/competitions" element={<Competitions />} />
                    <Route path="/sponsors" element={<Sponsors />} />
                    <Route path="/hierarchy" element={<Hierarchy />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/headliners" element={<Headliners />} />
                    <Route path="/theme" element={<Theme />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;

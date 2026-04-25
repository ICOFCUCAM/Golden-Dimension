import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-ivory">
      <div className="text-center px-8">
        <div className="text-8xl md:text-9xl font-bold italic text-brand-accent mb-6">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-brand-ink mb-4">Page Not Found</h1>
        <p className="text-brand-mute text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-ink to-brand-ink text-brand-ivory font-semibold rounded-lg hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
        >
          <ArrowLeft size={18} />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

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
    <div className="min-h-screen flex items-center justify-center bg-[#0B1F3A]">
      <div className="text-center px-8">
        <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] bg-clip-text text-transparent mb-6">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-white/50 text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] text-[#0B1F3A] font-semibold rounded-lg hover:shadow-xl hover:shadow-[#C8A44D]/25 transition-all duration-300"
        >
          <ArrowLeft size={18} />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

// components/ui/card.jsx
import { Link } from "react-router-dom";

const Card = ({ children, className, footerText, linkText, linkHref }) => (
  <div className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ${className}`}>
    {children}
    {footerText && linkText && linkHref && (
      <div className="mt-2 text-sm text-center">
        {footerText}{' '}
        <Link to={linkHref} className="text-primary hover:underline">
          {linkText}
        </Link>
      </div>
    )}
  </div>
);

export default Card;

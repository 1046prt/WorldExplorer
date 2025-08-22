import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import "/styles/navigation-breadcrumb.css"; 

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface NavigationBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function NavigationBreadcrumb({ items }: NavigationBreadcrumbProps) {
  return (
    <nav className="nb-container">
      <Link href="/" className="nb-home">
        <Home className="nb-icon" />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="nb-item">
          <ChevronRight className="nb-icon" />
          {item.href ? (
            <Link href={item.href} className="nb-link">
              {item.label}
            </Link>
          ) : (
            <span className="nb-current">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

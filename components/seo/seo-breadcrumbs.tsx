import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SEOBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function SEOBreadcrumbs({ items, className = "" }: SEOBreadcrumbsProps) {
  // Generate structured data for breadcrumbs
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://theworldexplorer.vercel.app",
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        ...(item.href && {
          item: `https://theworldexplorer.vercel.app${item.href}`,
        }),
      })),
    ],
  };

  return (
    <>
      {/* Structured Data for Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      {/* Visual Breadcrumbs */}
      <nav className={`breadcrumbs ${className}`} aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link href="/" className="breadcrumb-link">
              <Home size={16} />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="breadcrumb-item">
              <ChevronRight size={16} className="breadcrumb-separator" />
              {item.href ? (
                <Link href={item.href} className="breadcrumb-link">
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumb-current" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <style jsx>{`
        .breadcrumbs {
          margin: var(--spacing-md) 0;
          padding: 0;
        }

        .breadcrumb-list {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          list-style: none;
          margin: 0;
          padding: 0;
          font-size: var(--font-size-sm);
        }

        .breadcrumb-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .breadcrumb-link {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .breadcrumb-link:hover {
          color: var(--color-primary);
        }

        .breadcrumb-separator {
          color: var(--color-text-muted);
        }

        .breadcrumb-current {
          color: var(--color-text-primary);
          font-weight: var(--font-weight-medium);
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </>
  );
}

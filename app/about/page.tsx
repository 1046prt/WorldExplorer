"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Github,
  Globe,
  Mail,
  Users,
  Code,
  Target,
  Rocket,
  ArrowRight,
  Lightbulb,
  Palette,
  Contact2Icon,
} from "lucide-react";
import { GlobalNavigation } from "@/components/global-navigation";
import Footer from "@/components/footer";
import "@/styles/about.css";

const AboutPage = () => {
  // Structured data for About page
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About WorldExplorer",
    description:
      "Learn about WorldExplorer, our mission to make world exploration accessible and engaging through interactive educational tools.",
    url: "https://theworldexplorer.vercel.app/about",
    mainEntity: {
      "@type": "Organization",
      name: "WorldExplorer",
      description: "Interactive educational platform for world exploration",
      founder: [
        {
          "@type": "Person",
          name: "Prakash Raj",
          jobTitle: "Developer & Creator",
          email: "1046prt@gmail.com",
        },
        {
          "@type": "Person",
          name: "Shiven Anandam",
          jobTitle: "Graphic Designer",
          email: "shivensrivastava018@gmail.com",
        },
      ],
    },
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <title>About WorldExplorer - Our Mission & Team | WorldExplorer</title>
      <meta
        name="description"
        content="Learn about WorldExplorer, our mission to make world exploration accessible through interactive educational tools. Meet our team and discover our story."
      />
      <meta
        name="keywords"
        content="about worldexplorer, mission, team, educational platform, world exploration, interactive learning, geography education"
      />
      <link rel="canonical" href="https://theworldexplorer.vercel.app/about" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutStructuredData),
        }}
      />

      <div className="about-page">
        <GlobalNavigation showBackButton={true} backHref="/" />

        <div className="about-container">
          {/* Hero Section */}
          <div className="about-hero">
            <div className="about-hero-logo-container">
              <Image
                src="/images/logo/WORLD.svg"
                alt="WorldExplorer Logo"
                width={80}
                height={80}
                className="about-hero-logo"
              />
              <div>
                <h1 className="about-hero-title">WorldExplorer</h1>
                <p className="about-hero-tagline">
                  Discover the world, one country at a time
                </p>
              </div>
            </div>

            <p className="about-hero-description">
              We built WorldExplorer because we believe learning about our world
              should be engaging, accessible, and fun. Whether you&apos;re a
              student, educator, or just curious about different cultures and
              places, our platform makes exploring countries and their rich
              histories an enjoyable experience.
            </p>
          </div>

          {/* Mission Section */}
          <div className="about-section">
            <div className="about-section-header">
              <div className="about-section-icon">
                <Target size={24} />
              </div>
              <h2 className="about-section-title">
                Why We Created WorldExplorer
              </h2>
            </div>
            <p className="about-section-text">
              WorldExplorer brings together comprehensive information about
              countries, their landmarks, cultures, and histories in an
              interactive and engaging way.In today&apos;s interconnected world,
              understanding different cultures and countries is more important
              than ever. We wanted to create a platform that goes beyond basic
              facts and figures to help people truly appreciate the diversity
              and beauty of our planet.
            </p>
          </div>

          {/* Features Section */}
          <div className="about-features-section">
            <h2 className="about-features-title">
              What Makes WorldExplorer Special
            </h2>
            <div className="about-features-grid">
              <div className="about-feature-card">
                <div className="about-feature-header">
                  <div className="about-feature-icon">🗺️</div>
                  <h3 className="about-feature-title">
                    Interactive Exploration
                  </h3>
                </div>
                <p className="about-feature-description">
                  Navigate through countries with our intuitive search and
                  filtering system. Find exactly what you&apos;re looking for,
                  whether it&apos;s a specific landmark, cultural tradition, or
                  geographical feature.
                </p>
              </div>

              <div className="about-feature-card">
                <div className="about-feature-header">
                  <div className="about-feature-icon">🏛️</div>
                  <h3 className="about-feature-title">Rich Cultural Content</h3>
                </div>
                <p className="about-feature-description">
                  Dive deep into the stories behind famous landmarks, learn
                  about local traditions, and discover the unique aspects that
                  make each country special. Our content goes beyond
                  surface-level information.
                </p>
              </div>

              <div className="about-feature-card">
                <div className="about-feature-header">
                  <div className="about-feature-icon">🎓</div>
                  <h3 className="about-feature-title">Educational Tools</h3>
                </div>
                <p className="about-feature-description">
                  Test your knowledge with interactive quizzes, explore
                  historical timelines, and engage with educational games
                  designed to make learning memorable and enjoyable.
                </p>
              </div>

              <div className="about-feature-card">
                <div className="about-feature-header">
                  <div className="about-feature-icon">💱</div>
                  <h3 className="about-feature-title">Practical Information</h3>
                </div>
                <p className="about-feature-description">
                  Access real-time currency conversion, weather information, and
                  other practical details that help you understand what life is
                  like in different parts of the world.
                </p>
              </div>

              <div className="about-feature-card">
                <div className="about-feature-header">
                  <div className="about-feature-icon">🎨</div>
                  <h3 className="about-feature-title">Beautiful Design</h3>
                </div>
                <p className="about-feature-description">
                  Experience a clean, modern interface that works seamlessly
                  across all devices. We&apos;ve prioritized accessibility and
                  user experience to ensure everyone can explore comfortably.
                </p>
              </div>

              <div className="about-feature-card">
                <div className="about-feature-header">
                  <div className="about-feature-icon">🌍</div>
                  <h3 className="about-feature-title">Global Perspective</h3>
                </div>
                <p className="about-feature-description">
                  Our platform covers all 195 countries with detailed
                  information about their geography, culture, history, and
                  modern-day significance in our interconnected world.
                </p>
              </div>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="about-tech-section">
            <div className="about-section-header">
              <div className="about-section-icon">
                <Code size={24} />
              </div>
              <h2 className="about-section-title">
                Built with Modern Technology
              </h2>
            </div>
            <p className="about-section-text">
              We use cutting-edge web technologies to ensure WorldExplorer is
              fast, reliable, and accessible to everyone.
            </p>
            <div className="about-tech-grid">
              <div className="about-tech-category">
                <h3 className="about-tech-category-title">
                  <Rocket size={20} />
                  Frontend
                </h3>
                <ul className="about-tech-list">
                  <li>Next.js 15 for optimal performance and SEO</li>
                  <li>React 19 with the latest features</li>
                  <li>TypeScript for reliable, maintainable code</li>
                </ul>
              </div>
              <div className="about-tech-category">
                <h3 className="about-tech-category-title">
                  <Palette size={20} />
                  Design & UI
                </h3>
                <ul className="about-tech-list">
                  <li>Tailwind CSS for responsive design</li>
                  <li>Radix UI for accessible components</li>
                  <li>Lucide React for beautiful icons</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contributors Section */}
          <div className="about-contributors-section">
            <div className="about-section-header">
              <div className="about-section-icon">
                <Users size={24} />
              </div>
              <h2 className="about-section-title">Meet the Team</h2>
            </div>
            <p className="about-section-text">
              WorldExplorer is brought to you by a small but passionate team
              dedicated to making world exploration accessible to everyone.
            </p>

            <div className="about-contributors-grid">
              <div className="about-contributor-card">
                <div className="about-contributor-avatar primary">PR</div>
                <h3 className="about-contributor-name">Prakash Raj</h3>
                <p className="about-contributor-role">Developer & Creator</p>
                <div className="about-contributor-links">
                  <a
                    href="https://github.com/1046prt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-contributor-link"
                    title="GitHub Profile"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="mailto:1046prt@gmail.com"
                    className="about-contributor-link"
                    title="Send Email"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>

              <div className="about-contributor-card">
                <div className="about-contributor-avatar success">SA</div>
                <h3 className="about-contributor-name">Shiven Anandam</h3>
                <p className="about-contributor-role">Graphic Designer</p>
                <div className="about-contributor-links">
                  <a
                    href="https://github.com/shiven0204"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-contributor-link"
                    title="GitHub Profile"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="mailto:shivensrivastava018@gmail.com"
                    className="about-contributor-link"
                    title="Send Email"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contributing Section */}
          <div className="about-contributing-section">
            <div className="about-section-header">
              <div className="about-section-icon">
                <Contact2Icon size={24} />
              </div>
              <h2 className="about-section-title">Join Us</h2>
            </div>
            <p className="about-section-text">
              WorldExplorer is an open-source project, and we welcome
              contributions from developers, designers, educators, and anyone
              passionate about making world knowledge more accessible. Every
              contribution, no matter how small, helps make the platform better
              for everyone.
            </p>

            <div className="about-contributing-grid">
              <div className="about-contributing-card">
                <h3 className="about-contributing-card-title">
                  <Code size={20} />
                  For Developers
                </h3>
                <ul className="about-contributing-list">
                  <li>
                    <ArrowRight size={16} />
                    Add new features and improvements
                  </li>
                  <li>
                    <ArrowRight size={16} />
                    Fix bugs and optimize performance
                  </li>
                  <li>
                    <ArrowRight size={16} />
                    Improve accessibility and user experience
                  </li>
                  <li>
                    <ArrowRight size={16} />
                    Enhance mobile responsiveness
                  </li>
                </ul>
              </div>

              <div className="about-contributing-card">
                <h3 className="about-contributing-card-title">
                  <Lightbulb size={20} />
                  For Content Contributors
                </h3>
                <ul className="about-contributing-list">
                  <li>
                    <ArrowRight size={16} />
                    Add country information and facts
                  </li>
                  <li>
                    <ArrowRight size={16} />
                    Contribute cultural insights and stories
                  </li>
                  <li>
                    <ArrowRight size={16} />
                    Create educational quiz questions
                  </li>
                  <li>
                    <ArrowRight size={16} />
                    Suggest new features and improvements
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="about-cta-section">
            <h2 className="about-cta-title">Start Your Journey Today</h2>
            <p className="about-cta-description">
              Ready to explore the world? Discover fascinating countries, learn
              about different cultures, and expand your global knowledge with
              WorldExplorer.
            </p>
            <div className="about-cta-buttons">
              <Link
                href="/browse/countries"
                className="about-cta-button primary"
              >
                <Globe size={20} />
                Explore Countries
              </Link>
              <Link href="/" className="about-cta-button secondary">
                Home
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;

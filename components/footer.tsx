import { FC } from "react";
import { Github, Twitter, Globe, Mail } from "lucide-react";
import "@/styles/footer.css";
import Link from "next/link";
import Image from "next/image";

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="flex items-center mb-4">
            <Image
              src="/images/logo/WORLD.svg"
              alt="WorldExplorer Logo"
              width={60}
              height={60}
              className="mr-3"
            />
            <h2 className="footer-title">WorldExplorer</h2>
          </div>
          <p className="footer-text">
            Discover countries, cultures, landmarks, and more through an
            interactive world exploration platform.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-subtitle">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <a href="/browse/countries">Countries</a>
            </li>
            <li>
              <a href="/browse/landmarks">Landmarks</a>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-subtitle">Connect with Us</h3>
          <div className="footer-socials">
            <a
              href="https://github.com/1046prt"
              target="_blank"
              aria-label="Github"
            >
              <Github size={20} />
            </a>
            <a
              href="https://x.com/1046prt"
              target="_blank"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a href="/" target="_blank" aria-label="Website">
              <Globe size={20} />
            </a>
            <a href="mailto:1046prt@gmail.com" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="text-center">
          <p>
            © {new Date().getFullYear()} WorldExplorer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

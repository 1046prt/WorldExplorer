import { FC } from "react";
import { Github, Twitter, Globe, Mail } from "lucide-react";
import "/styles/footer.css";

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section">
          <h2 className="footer-title">🌍 WorldExplorer</h2>
          <p className="footer-text">
            Discover countries, cultures, landmarks, and more through an
            interactive world exploration platform.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer-section">
          <h3 className="footer-subtitle">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/countries">Countries</a>
            </li>
            <li>
              <a href="/landmarks">Landmarks</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </div>

        {/* Social Section */}
        <div className="footer-section">
          <h3 className="footer-subtitle">Connect with Us</h3>
          <div className="footer-socials">
            <a href="https://github.com/" target="_blank" aria-label="Github">
              <Github size={20} />
            </a>
            <a href="https://twitter.com/" target="_blank" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a
              href="https://worldexplorer.com"
              target="_blank"
              aria-label="Website"
            >
              <Globe size={20} />
            </a>
            <a href="mailto:contact@worldexplorer.com" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} WorldExplorer
      </div>
    </footer>
  );
};

export default Footer;

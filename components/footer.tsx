import { FC } from "react";
import { Github, Twitter, Globe, Mail } from "lucide-react";
import "/styles/footer.css";

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-title">🌍 WorldExplorer</h2>
          <p className="footer-text">
            Discover countries, cultures, landmarks, and more through an
            interactive world exploration platform.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-subtitle">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/browse/countries">Countries</a>
            </li>
            <li>
              <a href="/browse/landmarks">Landmarks</a>
            </li>
            <li>
              <a href="/README">About</a>
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
              href="https://twitter.com/1046prt"
              target="_blank"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a href="/" target="_blank" aria-label="Website">
              <Globe size={20} />
            </a>
            <a href="https://mailto:1046prt@gmail.com" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} WorldExplorer
      </div>
    </footer>
  );
};

export default Footer;

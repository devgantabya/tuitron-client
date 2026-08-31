import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
import footerLogoLight from "../../assets/logo-primary.png";
import footerLogoDark from "../../assets/logo-white.png";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="text-lg font-semibold">
          <img
            src={footerLogoLight}
            alt="Tuitron"
            className="h-8 dark:hidden"
          />
          <img
            src={footerLogoDark}
            alt="Tuitron"
            className="h-8 hidden dark:block"
          />
        </Link>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            className="text-muted-foreground hover:text-primary transition-colors"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-muted-foreground hover:text-primary transition-colors"
            to="/tuitions"
          >
            Tuitions
          </Link>
          <Link
            className="text-muted-foreground hover:text-primary transition-colors"
            to="/tutors"
          >
            Tutors
          </Link>
          <Link
            className="text-muted-foreground hover:text-primary transition-colors"
            to="/about"
          >
            About
          </Link>
          <Link
            className="text-muted-foreground hover:text-primary transition-colors"
            to="/contact"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground text-lg">
          <a
            href="https://www.facebook.com/devgantabya"
            className="hover:text-primary transition-colors"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/dev_gantabya/"
            className="hover:text-primary transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/dev_gantabya"
            className="hover:text-primary transition-colors"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://www.linkedin.com/in/devgantabya/"
            className="hover:text-primary transition-colors"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      <div className="text-center max-w-7xl mx-auto py-4 text-xs text-muted-foreground border-t">
        © {new Date().getFullYear()} Tuitron. All Rights Reserved.
      </div>
    </footer>
  );
}

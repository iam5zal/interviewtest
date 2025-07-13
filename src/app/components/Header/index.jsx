
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import styles from "./styles.module.scss";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) setIsOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <div className={styles.leftSection}>
          <Link href="#" className={styles.brand}>AEON</Link>

          {!isMobile && (
            <nav className={styles.desktopNav}>
              <Link href="#">Showcase</Link>
              <Link href="#">Docs</Link>
              <Link href="#">Blog</Link>
              <Link href="#">Analytics</Link>
              <Link href="#">Commerce</Link>
              <Link href="#">Templates</Link>
              <Link href="#">Enterprise</Link>
              <Link href="/login" className={styles.login}>Login</Link>
            </nav>
          )}
        </div>

        <div className={styles.rightSection}>
          <div className={styles.searchWrapper}>
            
            <input
              type="text"
              placeholder="Search documentation..."
              className={styles.searchInput}
            />
           {isMobile &&   <FaSearch className={styles.searchIcon} />}
          </div>
          {isMobile && (
            <button onClick={toggleMenu} className={styles.toggleBtn}>
              {isOpen ? <FaTimes className={styles.icon} /> : <FaBars className={styles.icon} />}
            </button>
          )}
        </div>
      </div>

      {isMobile && isOpen && (
        <nav className={styles.mobileNav}>
          <Link href="#">Showcase</Link>
          <Link href="#">Docs</Link>
          <Link href="#">Blog</Link>
          <Link href="#">Analytics</Link>
          <Link href="#">Commerce</Link>
          <Link href="#">Templates</Link>
          <Link href="#">Enterprise</Link>
          <Link href="/login" className={styles.login}>Login</Link>
        </nav>
      )}
    </header>
  );
}
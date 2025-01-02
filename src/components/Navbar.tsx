"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMenu, HiOutlineX, HiOutlineHome, HiOutlineInformationCircle, HiOutlineBookOpen, HiOutlineChatAlt2, HiOutlineSearch, HiOutlineUser } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { text: "Home", href: "/", icon: HiOutlineHome },
    { text: "About", href: "/about", icon: HiOutlineInformationCircle },
    {
      text: "Services",
      href: "/konsultasi/lawyer",
      icon: HiOutlineBookOpen,
    },
    { text: "Chats", href: "/chats", icon: HiOutlineChatAlt2 },
  ];

  return (
    <nav
      className={`fixed top-0 w-full transition-all duration-300 z-50 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-sm border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Image */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="font-lora text-xl text-white">Hacktivist</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.text}
                href={item.href}
                className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
              >
                <item.icon className="text-2xl" />
                {item.text}
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors">
              <HiOutlineSearch className="text-xl" />
            </button>
            <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors">
              <HiOutlineUser className="text-xl" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <HiOutlineX className={`text-2xl ${isOpen ? "hidden" : ""}`} />
            <HiOutlineMenu className={`text-2xl ${isOpen ? "hidden" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 bg-slate-900/95 backdrop-blur-sm border-t border-white/10">
            {menuItems.map((item) => (
              <Link
                key={item.text}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="text-2xl" />
                {item.text}
              </Link>
            ))}
            <hr className="my-4 border-white/10" />
            <div className="flex justify-around px-4">
              <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                <HiOutlineSearch className="text-xl" />
              </button>
              <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                <HiOutlineUser className="text-xl" />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

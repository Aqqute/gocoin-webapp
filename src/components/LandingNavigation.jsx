// import { useState } from "react";
import logoWhite from "/images/logo-white.svg";
import LandingButton from "./LandingButton";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LandingNavigation() {
    const navLinks = [
        { name: "Home", route: "/landing/home" },
        { name: "Lite paper", route: "/landing/lite" },
        { name: "Get Tokens", route: "" },
        { name: "Contact Us", route: "" },
    ];

    const location = useLocation();
    // const [isActive, setIsActive] = useState("");

    const [isScrolled, setIsScrolled] = useState(false);

     useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50); // Lowered threshold
        };

        // Check initial scroll position
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return (
     <div className={`flex justify-center sticky top-0 z-20 py-5 transition-all duration-300 ${isScrolled ? 'bg-[#0A0A0A]' : 'bg-transparent'}`}>
        <nav className={`h-[60px] w-4/5 flex justify-between items-center`}>
            <img src={logoWhite} alt="Logo" />
            <div className="flex items-center gap-5">
                <ul className="flex gap-4 items-center">
                    {navLinks.map((link, idx) => {
                        const isActive = link.route === location.pathname;
                        return (
                            <li key={idx} className={`text-[#B2B1B1] cursor-pointer ${isActive ? 'font-bold text-[#FBBB27]' : 'hover:text-[#FBBB27]'} transition-colors duration-300`}>{link.name}</li>
                        )
                    })}
                </ul>
                <LandingButton content="Farm GoC Tokens"/>
            </div>
        </nav>
    </div>
  )
}

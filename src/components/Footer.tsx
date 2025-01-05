import Link from "next/link"
import Image from "next/image"
import { 
    IoLogoTwitter, 
    IoLogoLinkedin,
    IoLogoInstagram,
    IoMailOutline,
    IoCallOutline,
    IoLocationOutline,
    IoShieldOutline
} from 'react-icons/io5'
import Hacktivist from '@/assets/icons/logo.png'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        services: [
            { name: "Hukum Pidana", href: "/services/pidana" },
            { name: "Hukum Bisnis", href: "/services/bisnis" },
            { name: "Hukum Properti", href: "/services/properti" },
            { name: "Hukum Keluarga", href: "/services/keluarga" },
            { name: "Hukum Kontrak", href: "/services/kontrak" },
            { name: "Hukum Perlindungan", href: "/services/perlindungan" }
        ],
        company: [
            { name: "Tentang Kami", href: "/about" },
            { name: "Tim Kami", href: "/team" },
            { name: "Karir", href: "/careers" },
            { name: "Blog", href: "/blog" },
            { name: "Press Kit", href: "/press" },
            { name: "Partner", href: "/partners" }
        ],
        support: [
            { name: "FAQ", href: "/faq" },
            { name: "Kontak", href: "/contact" },
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Sitemap", href: "/sitemap" },
            { name: "Help Center", href: "/help" }
        ],
        resources: [
            { name: "Legal Templates", href: "/templates" },
            { name: "E-Books", href: "/ebooks" },
            { name: "Webinars", href: "/webinars" },
            { name: "Case Studies", href: "/cases" },
            { name: "Legal News", href: "/news" },
            { name: "Legal Tips", href: "/tips" }
        ]
    }

    return (
        <footer className="bg-slate-900 pt-16">
            {/* Newsletter Section */}
            <div className="container mx-auto px-4 mb-16">
                <div className="bg-slate-800 rounded-2xl p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Dapatkan Update Legal Terbaru
                            </h3>
                            <p className="text-gray-400">
                                Subscribe utk dptkan tips hukum & update terbaru lgsg ke inbox kamu
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <input 
                                type="email"
                                placeholder="Masukkan email kamu..."
                                className="flex-1 px-4 py-3 bg-slate-900 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                            <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
                    {/* Company Info - 2 columns wide */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <Image
                                src={Hacktivist}
                                alt="Logo"
                                width={120}
                                height={40}
                                className="w-auto h-8 object-contain"
                            />
                            <span className="text-xl font-bold text-white">Hacktivist</span>
                        </Link>
                        <p className="text-gray-400 mb-6">
                            Solusi hukum modern dgn kombinasi pengalaman & teknologi AI utk hasil terbaik. Kami berkomitmen memberikan layanan hukum terpercaya sejak 2009.
                        </p>
                        <div className="flex gap-4 mb-6">
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <IoLogoTwitter className="w-6 h-6" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <IoLogoLinkedin className="w-6 h-6" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <IoLogoInstagram className="w-6 h-6" />
                            </Link>
                        </div>
                        <div className="flex items-center gap-2 text-yellow-500">
                            <IoShieldOutline className="w-5 h-5" />
                            <span className="text-sm font-medium">ISO 9001:2015 Certified</span>
                        </div>
                    </div>

                    {/* Quick Links - 4 columns */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Layanan</h3>
                        <ul className="space-y-4">
                            {footerLinks.services.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-6">Perusahaan</h3>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-6">Support</h3>
                        <ul className="space-y-4">
                            {footerLinks.support.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-6">Resources</h3>
                        <ul className="space-y-4">
                            {footerLinks.resources.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Contact Info Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-slate-800 mb-8">
                    <div className="flex items-center gap-3">
                        <IoLocationOutline className="w-5 h-5 text-yellow-500" />
                        <span className="text-gray-400">Jl. Gatot Subroto No.123, Jakarta</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <IoCallOutline className="w-5 h-5 text-yellow-500" />
                        <span className="text-gray-400">+62 821-2345-6789</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <IoMailOutline className="w-5 h-5 text-yellow-500" />
                        <span className="text-gray-400">info@hacktivist.law</span>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} Hacktivist Law Firm. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                                Terms of Service
                            </Link>
                            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm">
                                Cookies Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
} 
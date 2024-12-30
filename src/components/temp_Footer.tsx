"use client";

import { IonIcon } from "@ionic/react";
import { mailOutline, callOutline, locationOutline, timeOutline } from "ionicons/icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900/95 text-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-lora mb-4 text-white">Kantor Hukum Hacktivist Indonesia</h3>
            <p className="text-sm text-white/80">Partner terpercaya untuk kebutuhan hukum anda. Kami berkomitmen memberikan layanan konsultasi & pendampingan hukum terbaik.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Layanan Kami</h3>
            <ul className="space-y-2">
              {["Konsultasi Hukum", "Pendampingan Kasus", "Pengurusan Dokumen", "Mediasi"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-white/80 hover:text-white transition-colors cursor-pointer">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Informasi Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/80">
                <IonIcon icon={locationOutline} className="text-lg mt-1 text-white/90" />
                <p>
                  South Tower, Green Office Park 1
                  <br />
                  Jl. BSD Green Office Park 6th Floor
                  <br />
                  Sampora, Kec. Cisauk
                  <br />
                  Kabupaten Tangerang
                  <br />
                  Banten 15345
                </p>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <IonIcon icon={callOutline} className="text-lg text-white/90" />
                <div>
                  <p className="mb-1">Telepon:</p>
                  <p>(021) 9999-9999</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <IonIcon icon={timeOutline} className="text-lg text-white/90" />
                <div>
                  <p className="mb-1">Jam Operasional:</p>
                  <p>Senin - Jumat: 09.00 - 17.00</p>
                  <p>Sabtu - Minggu: Tutup</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <IonIcon icon={mailOutline} className="text-lg text-white/90" />
                <p>konsultasi@hacktivist.id</p>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Update Hukum</h3>
            <p className="text-sm text-white/80 mb-4">Subscribe untuk dapat info & artikel hukum terbaru</p>
            <form className="flex gap-2">
              <input type="email" placeholder="Email kamu" className="flex-1 px-4 py-2 bg-white/5 rounded-lg text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/30" />
              <button type="submit" className="px-4 py-2 bg-blue-800/30 rounded-lg text-sm hover:bg-blue-700/30 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/70">
          <p>© {currentYear} Kantor Hukum Hacktivist. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}

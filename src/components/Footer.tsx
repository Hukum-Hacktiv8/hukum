"use client";

import { IonIcon } from "@ionic/react";
import { callOutline, locationOutline, timeOutline } from "ionicons/icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white/90">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-lora mb-4 text-white">Kantor Hukum Hacktivist Indonesia</h3>
            <p className="text-sm text-white/80">Partner terpercaya untuk kebutuhan hukum anda. Kami berkomitmen memberikan layanan konsultasi & pendampingan hukum terbaik.</p>
          </div>

          {/* Layanan */}
          <div className="space-y-4">
            <h3 className="text-xl font-lora mb-4 text-white">Layanan Kami</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Konsultasi Hukum</li>
              <li>Pendampingan Kasus</li>
              <li>Pengurusan Dokumen</li>
              <li>Mediasi</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-lora mb-4 text-white">Informasi Kontak</h3>
            <div className="space-y-3 text-sm text-white/80">
              <p className="flex items-center gap-2">
                <IonIcon icon={locationOutline} className="text-lg" />
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
              <p className="flex items-center gap-2">
                <IonIcon icon={callOutline} />
                Telepon: (021) 9999-9999
              </p>
              <p className="flex items-center gap-2">
                <IonIcon icon={timeOutline} />
                Jam Operasional:
                <br />
                Senin - Jumat: 09.00 - 17.00
              </p>
            </div>
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

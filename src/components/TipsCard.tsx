import Link from "next/link";
import { motion } from "framer-motion";

export default function TipsCard() {
  const tips = [
    {
      image:
        "https://images.hukumonline.com/frontend/lt515b7ec90fe0c/lt64df56656b9b2.jpg",
      title: "Cara Hitung Pesangon Berdasarkan UU Cipta Kerja",
      link: "https://www.hukumonline.com/klinik/a/cara-hitung-pesangon-lt515b7ec90fe0c/",
    },
    {
      image:
        "https://images.hukumonline.com/frontend/lt66a12b77d0258/lt66a12c7c1762d.jpg",
      title: "Tips Terhindar dari Penipuan Mobil Skema Segitiga",
      link: "https://www.hukumonline.com/klinik/a/tips-terhindar-dari-penipuan-mobil-skema-segitiga-lt66a12b77d0258/",
    },
    {
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      title: "Cara Hitung Pesangon Berdasarkan UU Cipta Kerja",
      link: "https://www.hukumonline.com/klinik/a/cara-hitung-pesangon-lt515b7ec90fe0c/",
    },
    {
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      title: "Cara Hitung Pesangon Berdasarkan UU Cipta Kerja",
      link: "https://www.hukumonline.com/klinik/a/cara-hitung-pesangon-lt515b7ec90fe0c/",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tips.map((tip, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative overflow-hidden rounded-xl bg-slate-800 hover:bg-slate-700/80 transition-all duration-300"
        >
          <Link href={tip.link} className="block">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={tip.image}
                alt={tip.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg p-4">
                <h2 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                  {tip.title}
                </h2>
              </div>
            </div>
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

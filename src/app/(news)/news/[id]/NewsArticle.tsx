"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IoTimeOutline,
  IoBookmarkOutline,
  IoBookmark,
  IoPrintOutline,
  IoChevronBack,
  IoLogoTwitter,
  IoLogoLinkedin,
  IoLogoFacebook,
  IoLogoWhatsapp,
} from "react-icons/io5";

interface Article {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  content: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  thumbnail: string;
  isSaved: boolean;
  tags: string[];
  relatedArticles: {
    id: number;
    title: string;
    category: string;
    thumbnail: string;
  }[];
}

type Props = {
  article: Article;
};

export default function NewsArticle({ article }: Props) {
  //   const [article, setArticle] = useState<Article>({
  //     id: 1,
  //     category: "Hukum Bisnis",
  //     title:
  //       "Perubahan Signifikan UU Perseroan Terbatas: Dampak Terhadap Startup & UKM",
  //     subtitle:
  //       "Regulasi baru membawa angin segar bagi pelaku usaha kecil & menengah dlm pendirian & pengelolaan PT",
  //     content: `
  // Dlm perkembangan terbaru dunia hukum bisnis Indonesia, perubahan UU PT membawa sejumlah implikasi penting yg perlu dicermati pelaku usaha.

  // Beberapa poin krusial meliputi:

  // 1. Penyederhanaan Proses Pendirian PT
  // - Waktu pengurusan yg lbh singkat
  // - Persyaratan dokumen yg lbh sederhana
  // - Opsi pendirian secara elektronik

  // 2. Pengaturan Holding Company
  // - Definisi & kriteria holding company
  // - Hak & kewajiban perusahaan induk
  // - Mekanisme pengawasan

  // 3. Fleksibilitas Struktur Modal
  // - Penghapusan modal dasar minimum
  // - Kemudahan dlm perubahan modal
  // - Opsi saham tanpa nilai nominal

  // 4. Perlindungan Pemegang Saham Minoritas
  // - Hak voting yg lbh kuat
  // - Mekanisme penyelesaian sengketa
  // - Transparansi informasi

  // 5. Adopsi Teknologi
  // - RUPS secara elektronik
  // - Sistem administrasi digital
  // - Tanda tangan elektronik

  // Dampak Terhadap Startup & UKM:

  // a) Kemudahan Pendirian
  // - Proses lbh cepat & murah
  // - Fleksibilitas struktur bisnis
  // - Mengurangi hambatan birokrasi

  // b) Peluang Investasi
  // - Akses modal lbh luas
  // - Struktur kepemilikan lbh fleksibel
  // - Daya tarik investor meningkat

  // c) Tata Kelola yg Lebih Baik
  // - Standar profesional
  // - Transparansi operasional
  // - Perlindungan stakeholder

  // Langkah Adaptasi yg Diperlukan:

  // 1. Update dokumen legal
  // 2. Penyesuaian struktur organisasi
  // 3. Peningkatan sistem teknologi
  // 4. Pelatihan SDM
  // 5. Konsultasi dgn ahli hukum

  // Kesimpulan:

  // Perubahan UU PT ini membuka peluang besar bagi pertumbuhan startup & UKM di Indonesia. Namun, diperlukan pemahaman & persiapan yg matang utk memaksimalkan manfaatnya.
  //         `,
  //     author: {
  //       name: "Dr. Sarah Wijaya, S.H., M.H.",
  //       title: "Partner, Wijaya & Associates Law Firm",
  //       avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  //     },
  //     publishedAt: "28 Feb 2024",
  //     readTime: "8 min read",
  //     thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
  //     isSaved: false,
  //     tags: ["Hukum Bisnis", "UU PT", "Startup", "UKM", "Regulasi"],
  //     relatedArticles: [
  //       {
  //         id: 2,
  //         title: "5 Aspek Hukum yg Wajib Diperhatikan Startup",
  //         category: "Startup",
  //         thumbnail:
  //           "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a",
  //       },
  //       {
  //         id: 3,
  //         title: "Panduan Lengkap Perizinan Usaha di Era Digital",
  //         category: "Regulasi",
  //         thumbnail:
  //           "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
  //       },
  //     ],
  //   });

  // const [article4, setArticle4] = useState<Article>({
  //   id: 4,
  //   category: "Perkembangan Hukum",
  //   title: "Mengenal Hukum: Pilar Penting Kehidupan Bermasyarakat",
  //   subtitle: "membahas pengertian, tujuan, dan jenis-jenis hukum yang berlaku",
  //   content: `
  //   <p className="font-bold mt-5">Pengertian Hukum</p>
  //           <p className="">
  //             Secara umum, hukum dapat didefinisikan sebagai sekumpulan norma
  //             atau aturan yang mengikat dan memiliki sanksi yang tegas jika
  //             dilanggar. Hukum bersifat universal karena berlaku untuk semua
  //             orang tanpa memandang status sosial, agama, atau ras. Hukum juga
  //             mencerminkan nilai-nilai dan norma yang dianut oleh masyarakat
  //             dalam suatu wilayah tertentu.
  //           </p>
  //           <p className="font-bold mt-5">Tujuan Hukum</p>
  //           <p className="">
  //             Tujuan utama hukum adalah menciptakan ketertiban dan keadilan
  //             dalam masyarakat. Secara spesifik, tujuan hukum meliputi:
  //           </p>
  //           <ol>
  //             <li>
  //               1. <b>Menjaga Ketertiban:</b> Hukum mengatur perilaku individu
  //               agar tidak mengganggu hak orang lain.
  //             </li>
  //             <li>
  //               2. <b>Memberikan Keadilan:</b> Hukum memastikan bahwa setiap
  //               orang diperlakukan secara adil tanpa diskriminasi.
  //             </li>
  //             <li>
  //               3. <b>Melindungi Hak: </b> Hukum melindungi hak asasi manusia
  //               dari tindakan yang merugikan.
  //             </li>
  //             <li>
  //               4. <b>Menyelesaikan Sengketa:</b> Hukum menyediakan mekanisme
  //               penyelesaian konflik antara individu atau kelompok.
  //             </li>
  //             <li>
  //               5. <b>Mengatur Hubungan Sosial: </b> Hukum menjadi pedoman dalam
  //               berinteraksi secara harmonis di masyarakat.
  //             </li>
  //           </ol>

  //           <p className="font-bold mt-5">Jenis-Jenis Hukum</p>
  //           <p>
  //             Hukum dapat dikategorikan berdasarkan berbagai aspek, seperti
  //             sumber, sifat, dan wilayah berlakunya. Berikut adalah beberapa
  //             jenis hukum yang umum dikenal:
  //           </p>
  //           <ol>
  //             <li>
  //               1. <b>Berdasarkan Sumbernya:</b>
  //               <ul className="ml-8">
  //                 <li className="list-disc">
  //                   <b>Hukum Tertulis: </b>Aturan yang dituangkan dalam
  //                   peraturan perundang-undangan, seperti undang-undang dan
  //                   peraturan pemerintah.
  //                 </li>
  //                 <li className="list-disc">
  //                   <b>Hukum Tidak Tertulis: </b>Kebiasaan atau adat yang diakui
  //                   dan dijalankan oleh masyarakat.
  //                 </li>
  //               </ul>
  //             </li>
  //             <li>
  //               2. <b>Berdasarkan Isinya:</b>
  //               <ul className="ml-8">
  //                 <li className="list-disc">
  //                   <b>Hukum Privat (Perdata): </b>Mengatur hubungan
  //                   antarindividu, seperti hukum keluarga, waris, dan kontrak.
  //                 </li>
  //                 <li className="list-disc">
  //                   <b>Hukum Publik: </b>Mengatur hubungan antara individu
  //                   dengan negara, seperti hukum pidana dan hukum tata negara.
  //                 </li>
  //               </ul>
  //             </li>
  //             <li>
  //               3. <b>Berdasarkan Wilayah Berlakunya: </b>
  //               <ul className="ml-8">
  //                 <li className="list-disc">
  //                   <b>Hukum Nasional: </b>Berlaku di suatu negara tertentu.
  //                 </li>
  //                 <li className="list-disc">
  //                   <b>Hukum Internasional: </b>Mengatur hubungan antara negara
  //                   atau individu di lintas negara.
  //                 </li>
  //               </ul>
  //             </li>
  //           </ol>

  //           <p className="font-bold mt-5">Pentingnya Kesadaran Hukum</p>
  //           <p className="">
  //             Kesadaran hukum masyarakat sangat penting untuk menciptakan
  //             lingkungan yang tertib dan damai. Beberapa cara meningkatkan
  //             kesadaran hukum antara lain:
  //           </p>
  //           <ul className="ml-8">
  //             <li className="list-disc">
  //               Edukasi tentang peraturan yang berlaku.
  //             </li>
  //             <li className="list-disc">
  //               Penyuluhan hukum oleh pihak berwenang.
  //             </li>
  //             <li className="list-disc">
  //               Menerapkan hukum secara konsisten dan adil.
  //             </li>
  //           </ul>

  //           <p className="font-bold mt-5">Penutup</p>
  //           <p className="">
  //             Hukum adalah fondasi utama dalam kehidupan bermasyarakat. Dengan
  //             memahami hukum, kita tidak hanya mengetahui hak dan kewajiban,
  //             tetapi juga turut menjaga ketertiban dan keadilan. Oleh karena
  //             itu, setiap individu diharapkan memiliki kesadaran hukum yang
  //             tinggi untuk menciptakan masyarakat yang harmonis dan berkeadilan.
  //           </p>`,
  //   author: {
  //     name: "Dr. Sarah Wijaya, S.H., M.H.",
  //     title: "Partner, Wijaya & Associates Law Firm",
  //     avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  //   },
  //   publishedAt: "28 Feb 2024",
  //   readTime: "8 min read",
  //   thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
  //   isSaved: false,
  //   tags: ["Hukum Bisnis", "UU PT", "Startup", "UKM", "Regulasi"],
  //   relatedArticles: [
  //     {
  //       id: 2,
  //       title: "5 Aspek Hukum yg Wajib Diperhatikan Startup",
  //       category: "Startup",
  //       thumbnail:
  //         "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a",
  //     },
  //     {
  //       id: 3,
  //       title: "Panduan Lengkap Perizinan Usaha di Era Digital",
  //       category: "Regulasi",
  //       thumbnail:
  //         "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
  //     },
  //   ],
  // });

  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="bg-slate-900 min-h-screen pb-12">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white"
        >
          <IoChevronBack className="w-5 h-5" />
          <span>Kembali ke News</span>
        </Link>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 rounded-xl overflow-hidden"
            >
              {/* Article Header */}
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-yellow-500/10 text-yellow-500 text-sm font-medium rounded-lg mb-4">
                  {article.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {article.title}
                </h1>
                <p className="text-xl text-gray-300 mb-6">{article.subtitle}</p>
                <div className="flex items-center justify-between border-t border-slate-700 pt-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full"
                      unoptimized
                    />
                    <div>
                      <h3 className="font-medium text-white">
                        {article.author.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {article.author.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <IoTimeOutline className="w-5 h-5" />
                      <span>{article.readTime}</span>
                    </div>
                    <span>{article.publishedAt}</span>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative aspect-[21/9] w-full">
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>

              {/* Article Body */}
              <div className="p-6 md:p-8">
                <div className="text-gray-300 space-y-6">
                  {article.content.split("\n\n").map((paragraph, idx) => {
                    // Jika paragraf kosong, skip
                    if (!paragraph.trim()) return null;

                    // Jika berisi list dengan angka (1. 2. dst)
                    if (paragraph.trim().match(/^\d+\./)) {
                      const items = paragraph.split("\n");
                      return (
                        <ol key={idx} className="list-decimal pl-6 space-y-2">
                          {items.map((item, i) => (
                            <li key={i}>{item.replace(/^\d+\.\s*/, "")}</li>
                          ))}
                        </ol>
                      );
                    }

                    // Jika berisi list dengan huruf (a) b) dst)
                    if (paragraph.trim().match(/^[a-z]\)/i)) {
                      const items = paragraph.split("\n");
                      return (
                        <ol
                          key={idx}
                          className="list-[lower-alpha] pl-6 space-y-2"
                        >
                          {items.map((item, i) => (
                            <li key={i}>{item.replace(/^[a-z]\)\s*/i, "")}</li>
                          ))}
                        </ol>
                      );
                    }

                    // Jika sepertinya heading (1 baris & diawali dgn kata2 tertentu)
                    if (
                      paragraph.trim().split("\n").length === 1 &&
                      (paragraph.includes("Dampak") ||
                        paragraph.includes("Kesimpulan") ||
                        paragraph.includes("Langkah"))
                    ) {
                      return (
                        <h2 key={idx} className="text-xl font-bold text-white">
                          {paragraph}
                        </h2>
                      );
                    }

                    // Paragraf biasa
                    return <p key={idx}>{paragraph}</p>;
                  })}
                </div>

                {/* Tags & Share */}
                <div className="mt-8 pt-8 border-t border-slate-700">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, idx) => (
                        <Link
                          key={idx}
                          href={`/news/tag/${tag.toLowerCase()}`}
                          className="px-3 py-1 bg-slate-700 text-sm text-gray-300 rounded-lg hover:bg-slate-600"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="p-2 text-gray-400 hover:text-blue-400">
                        <IoLogoTwitter className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600">
                        <IoLogoLinkedin className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-500">
                        <IoLogoFacebook className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-500">
                        <IoLogoWhatsapp className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            {/* Action Buttons */}
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
                >
                  {isSaved ? (
                    <IoBookmark className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <IoBookmarkOutline className="w-5 h-5" />
                  )}
                  <span>Save Article</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600">
                  <IoPrintOutline className="w-5 h-5" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Related Articles
              </h3>
              <div className="space-y-4">
                {article.relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/news/${related.id}`}
                    className="group block"
                  >
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3">
                      <Image
                        src={related.thumbnail}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                    <span className="text-sm text-yellow-500">
                      {related.category}
                    </span>
                    <h4 className="text-white font-medium group-hover:text-yellow-500 transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}

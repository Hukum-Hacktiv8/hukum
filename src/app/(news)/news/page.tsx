"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";

interface NewsArticle {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    title: string;
  };
  publishedAt: string;
  readTime: string;
  thumbnail: string;
  isSaved: boolean;
}

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([
    {
      id: 1,
      category: "Hukum Bisnis",
      title: "Perubahan Signifikan UU Perseroan Terbatas: Dampak Terhadap Startup & UKM",
      excerpt: "Regulasi baru membawa angin segar bagi pelaku usaha kecil & menengah dlm pendirian & pengelolaan PT",
      author: {
        name: "Dr. Sarah Wijaya, S.H., M.H.",
        title: "Partner, Wijaya & Associates",
      },
      publishedAt: "28 Feb 2024",
      readTime: "8 min read",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      isSaved: false,
    },
    {
      id: 2,
      category: "Perkembangan Hukum",
      title: "MA Terbitkan PERMA Baru tentang Persidangan Elektronik",
      excerpt: "Modernisasi sistem peradilan melalui adopsi teknologi digital utk tingkatkan efisiensi persidangan",
      author: {
        name: "Prof. Budi Santoso, S.H., LL.M.",
        title: "Pengamat Hukum",
      },
      publishedAt: "27 Feb 2024",
      readTime: "6 min read",
      thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
      isSaved: true,
    },
    {
      id: 3,
      category: "Regulasi",
      title: "Panduan Lengkap Implementasi UU Perlindungan Data Pribadi",
      excerpt: "Hal-hal yg perlu diperhatikan perusahaan dlm menerapkan UU PDP yg baru berlaku",
      author: {
        name: "Linda Kusuma, S.H., M.H.",
        title: "Legal Consultant",
      },
      publishedAt: "26 Feb 2024",
      readTime: "10 min read",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      isSaved: false,
    },
  ]);

  const handleSave = (articleId: number) => {
    setArticles(
      articles.map((article) => {
        if (article.id === articleId) {
          return { ...article, isSaved: !article.isSaved };
        }
        return article;
      })
    );
  };

  return (
    <div className="bg-slate-900 min-h-screen pb-12">
      {/* Simple Category Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {["All", "Hukum Bisnis", "Pidana", "Perdata", "Regulasi", "Updates"].map((category, idx) => (
            <button key={idx} className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${idx === 0 ? "bg-yellow-500 text-slate-900 font-medium" : "bg-slate-800 text-gray-400 hover:text-white"}`}>
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-8">
          {/* Main News Column */}
          <div className="col-span-12 lg:col-span-8">
            {articles.map((article, idx) => (
              <motion.article key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className={`group bg-slate-800 rounded-xl overflow-hidden hover:bg-slate-800/80 transition-colors ${idx !== articles.length - 1 ? "mb-6" : ""}`}>
                <Link href={`/news/${article.id}`} className="grid md:grid-cols-12 gap-6 p-4">
                  {/* Thumbnail - Updated with padding */}
                  <div className="md:col-span-5 relative">
                    <div className="relative aspect-[16/10] md:aspect-[4/3] w-full h-full rounded-lg overflow-hidden">
                      <Image src={article.thumbnail} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={idx === 0} unoptimized />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent md:hidden" />
                    </div>
                    <span className="absolute top-4 left-4 px-3 py-1 bg-yellow-500 text-slate-900 text-sm font-medium rounded-lg md:hidden">{article.category}</span>
                  </div>

                  {/* Content - rest sama */}
                  <div className="md:col-span-7">
                    <div className="flex items-center justify-between mb-4">
                      <span className="hidden md:block px-3 py-1 bg-yellow-500/10 text-yellow-500 text-sm font-medium rounded-lg">{article.category}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleSave(article.id);
                        }}
                        className="text-gray-400 hover:text-yellow-500"
                      >
                        {article.isSaved ? <IoBookmark className="w-5 h-5 text-yellow-500" /> : <IoBookmarkOutline className="w-5 h-5" />}
                      </button>
                    </div>

                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors line-clamp-2">{article.title}</h2>

                    <p className="text-gray-400 mb-4 line-clamp-2 text-sm leading-relaxed">{article.excerpt}</p>

                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <h4 className="font-medium text-white">{article.author.name}</h4>
                        <p className="text-gray-400">{article.author.title}</p>
                      </div>
                      <div className="flex items-center gap-3 text-gray-400">
                        <span>{article.publishedAt}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-400" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            {/* Popular Topics */}
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                {["Hukum Bisnis", "Startup", "UU PDP", "Persidangan", "Digital", "Regulasi", "UKM"].map((topic, idx) => (
                  <Link key={idx} href={`/news/topic/${topic.toLowerCase()}`} className="px-3 py-1.5 bg-slate-700 text-sm text-gray-300 rounded-lg hover:bg-slate-600 transition-colors">
                    {topic}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">Legal Newsletter</h3>
              <p className="text-gray-400 text-sm mb-4">Dptkan update hukum terbaru & analisis lgsg ke inbox</p>
              <div className="space-y-3">
                <input type="email" placeholder="Email kamu" className="w-full px-4 py-2.5 bg-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                <button className="w-full px-4 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium rounded-lg transition-colors">Subscribe</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { readBlogAll } from "@/models/blogpost";

interface NewsArticle {
  id: number;
  _id: string;
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
<<<<<<< HEAD
  const [articles, setArticles] = useState<NewsArticle[]>([
    {
      id: 1,
      category: "Hukum Bisnis",
      title:
        "Perubahan Signifikan UU Perseroan Terbatas: Dampak Terhadap Startup & UKM",
      excerpt:
        "Regulasi baru membawa angin segar bagi pelaku usaha kecil dan menengah dalam pendirian dan pengelolaan PT",
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
      excerpt:
        "Modernisasi sistem peradilan melalui adopsi teknologi digital untuk meningkatkan efisiensi persidangan",
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
      excerpt:
        "Hal-hal yang perlu diperhatikan perusahaan dalam menerapkan UU PDP yang baru berlaku",
      author: {
        name: "Linda Kusuma, S.H., M.H.",
        title: "Legal Consultant",
      },
      publishedAt: "26 Feb 2024",
      readTime: "10 min read",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      isSaved: false,
    },
    {
      id: 4,
      category: "Perkembangan Hukum",
      title: "Mengenal Hukum: Pilar Penting Kehidupan Bermasyarakat",
      excerpt:
        "Membahas pengertian, tujuan, dan jenis-jenis hukum yang berlaku.",
      author: {
        name: "Linda Kusuma, S.H., M.H.",
        title: "Legal Consultant",
      },
      publishedAt: "25 Feb 2024",
      readTime: "10 min read",
      thumbnail:
        "https://images.unsplash.com/photo-1447023029226-ef8f6b52e3ea?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isSaved: false,
    },
    {
      id: 5,
      category: "Perkembangan Hukum",
      title: "Peranan Hukum dalam Membangun Masyarakat yang Berkeadaban",
      excerpt:
        "Artikel ini akan membahas peranan hukum dalam kehidupan bermasyarakat serta bagaimana hukum dapat menjadi katalisator perubahan sosial.",
      author: {
        name: "Linda Kusuma, S.H., M.H.",
        title: "Legal Consultant",
      },
      publishedAt: "24 Feb 2024",
      readTime: "10 min read",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1661497281000-b5ecb39a2114?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isSaved: false,
    },
    {
      id: 6,
      category: "Perkembangan Hukum",
      title:
        "Implementasi Hukum dalam Kehidupan Sehari-Hari: Tantangan dan Solusi",
      excerpt:
        "Artikel ini akan mengulas bagaimana hukum diterapkan dalam kehidupan sehari-hari, apa saja hambatan yang dihadapi, dan langkah-langkah untuk mengatasinya.",
      author: {
        name: "Linda Kusuma, S.H., M.H.",
        title: "Legal Consultant",
      },
      publishedAt: "24 Feb 2024",
      readTime: "10 min read",
      thumbnail:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isSaved: false,
    },
    {
      id: 7,
      category: "Perkembangan Hukum",
      title: "Hukum dan Teknologi: Tantangan dan Peluang di Era Digital",
      excerpt:
        "Artikel ini akan membahas bagaimana teknologi memengaruhi hukum, tantangan yang muncul, serta peluang yang dapat dimanfaatkan untuk menciptakan sistem hukum yang lebih efektif.",
      author: {
        name: "Linda Kusuma, S.H., M.H.",
        title: "Legal Consultant",
      },
      publishedAt: "23 Feb 2024",
      readTime: "10 min read",
      thumbnail:
        "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isSaved: false,
    },
    {
      id: 8,
      category: "Perkembangan Hukum",
      title: "Hukum dan Hak Asasi Manusia: Pilar Kebebasan dan Keadilan",
      excerpt:
        "Artikel ini akan membahas hubungan antara hukum dan HAM, tantangan dalam penegakannya, serta langkah-langkah yang dapat diambil untuk memperkuat perlindungan HAM.",
      author: {
        name: "Linda Kusuma, S.H., M.H.",
        title: "Legal Consultant",
      },
      publishedAt: "22 Feb 2024",
      readTime: "10 min read",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1661542759930-9cf315dae451?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isSaved: false,
    },
    {
      id: 9,
      category: "Perkembangan Hukum",
      title: "Hukum Adat: Menjaga Tradisi di Tengah Modernisasi",
      excerpt:
        "Artikel ini akan membahas peran hukum adat,tantangannya, serta relevansinya dalam sistem hukum nasional.",
      author: {
        name: "Linda Kusuma, S.H., M.H.",
        title: "Legal Consultant",
      },
      publishedAt: "20 Feb 2024",
      readTime: "10 min read",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1694281930432-18b307e102b5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isSaved: false,
    },
    {
      id: 10,
      category: "Perkembangan Hukum",
      title:
        "Hukum Ekonomi: Pilar Stabilitas dan Pertumbuhan dalam Dunia Bisnis",
      excerpt:
        "Artikel ini akan membahas peran hukum ekonomi, tantangan yang dihadapi, serta strategi untuk memperkuat sistem hukum ekonomi.",
      author: {
        name: "Linda Kusuma, S.H., M.H.",
        title: "Legal Consultant",
      },
      publishedAt: "10 Feb 2024",
      readTime: "10 min read",
      thumbnail:
        "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isSaved: false,
    },
  ]);
=======
  // const [articles, setArticles] = useState<NewsArticle[]>([
  //   {
  //     id: 1,
  //     category: "Hukum Bisnis",
  //     title:
  //       "Perubahan Signifikan UU Perseroan Terbatas: Dampak Terhadap Startup & UKM",
  //     excerpt:
  //       "Regulasi baru membawa angin segar bagi pelaku usaha kecil & menengah dlm pendirian & pengelolaan PT",
  //     author: {
  //       name: "Dr. Sarah Wijaya, S.H., M.H.",
  //       title: "Partner, Wijaya & Associates",
  //     },
  //     publishedAt: "28 Feb 2024",
  //     readTime: "8 min read",
  //     thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
  //     isSaved: false,
  //   },
  //   {
  //     id: 2,
  //     category: "Perkembangan Hukum",
  //     title: "MA Terbitkan PERMA Baru tentang Persidangan Elektronik",
  //     excerpt:
  //       "Modernisasi sistem peradilan melalui adopsi teknologi digital utk tingkatkan efisiensi persidangan",
  //     author: {
  //       name: "Prof. Budi Santoso, S.H., LL.M.",
  //       title: "Pengamat Hukum",
  //     },
  //     publishedAt: "27 Feb 2024",
  //     readTime: "6 min read",
  //     thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
  //     isSaved: true,
  //   },
  //   {
  //     id: 3,
  //     category: "Regulasi",
  //     title: "Panduan Lengkap Implementasi UU Perlindungan Data Pribadi",
  //     excerpt:
  //       "Hal-hal yg perlu diperhatikan perusahaan dlm menerapkan UU PDP yg baru berlaku",
  //     author: {
  //       name: "Linda Kusuma, S.H., M.H.",
  //       title: "Legal Consultant",
  //     },
  //     publishedAt: "26 Feb 2024",
  //     readTime: "10 min read",
  //     thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
  //     isSaved: false,
  //   },
  //   {
  //     id: 4,
  //     category: "Perkembangan Hukum",
  //     title: "Mengenal Hukum: Pilar Penting Kehidupan Bermasyarakat",
  //     excerpt:
  //       "Membahas pengertian, tujuan, dan jenis-jenis hukum yang berlaku.",
  //     author: {
  //       name: "Linda Kusuma, S.H., M.H.",
  //       title: "Legal Consultant",
  //     },
  //     publishedAt: "25 Feb 2024",
  //     readTime: "10 min read",
  //     thumbnail:
  //       "https://images.unsplash.com/photo-1447023029226-ef8f6b52e3ea?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     isSaved: false,
  //   },
  //   {
  //     id: 5,
  //     category: "Perkembangan Hukum",
  //     title: "Peranan Hukum dalam Membangun Masyarakat yang Berkeadaban",
  //     excerpt:
  //       "Artikel ini akan membahas peranan hukum dalam kehidupan bermasyarakat serta bagaimana hukum dapat menjadi katalisator perubahan sosial.",
  //     author: {
  //       name: "Linda Kusuma, S.H., M.H.",
  //       title: "Legal Consultant",
  //     },
  //     publishedAt: "24 Feb 2024",
  //     readTime: "10 min read",
  //     thumbnail:
  //       "https://plus.unsplash.com/premium_photo-1661497281000-b5ecb39a2114?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     isSaved: false,
  //   },
  //   {
  //     id: 6,
  //     category: "Perkembangan Hukum",
  //     title:
  //       "Implementasi Hukum dalam Kehidupan Sehari-Hari: Tantangan dan Solusi",
  //     excerpt:
  //       "Artikel ini akan mengulas bagaimana hukum diterapkan dalam kehidupan sehari-hari, apa saja hambatan yang dihadapi, dan langkah-langkah untuk mengatasinya.",
  //     author: {
  //       name: "Linda Kusuma, S.H., M.H.",
  //       title: "Legal Consultant",
  //     },
  //     publishedAt: "24 Feb 2024",
  //     readTime: "10 min read",
  //     thumbnail:
  //       "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     isSaved: false,
  //   },
  //   {
  //     id: 7,
  //     category: "Perkembangan Hukum",
  //     title: "Hukum dan Teknologi: Tantangan dan Peluang di Era Digital",
  //     excerpt:
  //       "Artikel ini akan membahas bagaimana teknologi memengaruhi hukum, tantangan yang muncul, serta peluang yang dapat dimanfaatkan untuk menciptakan sistem hukum yang lebih efektif.",
  //     author: {
  //       name: "Linda Kusuma, S.H., M.H.",
  //       title: "Legal Consultant",
  //     },
  //     publishedAt: "23 Feb 2024",
  //     readTime: "10 min read",
  //     thumbnail:
  //       "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     isSaved: false,
  //   },
  //   {
  //     id: 8,
  //     category: "Perkembangan Hukum",
  //     title: "Hukum dan Hak Asasi Manusia: Pilar Kebebasan dan Keadilan",
  //     excerpt:
  //       "Artikel ini akan membahas hubungan antara hukum dan HAM, tantangan dalam penegakannya, serta langkah-langkah yang dapat diambil untuk memperkuat perlindungan HAM.",
  //     author: {
  //       name: "Linda Kusuma, S.H., M.H.",
  //       title: "Legal Consultant",
  //     },
  //     publishedAt: "22 Feb 2024",
  //     readTime: "10 min read",
  //     thumbnail:
  //       "https://plus.unsplash.com/premium_photo-1661542759930-9cf315dae451?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     isSaved: false,
  //   },
  //   {
  //     id: 9,
  //     category: "Perkembangan Hukum",
  //     title: "Hukum Adat: Menjaga Tradisi di Tengah Modernisasi",
  //     excerpt:
  //       "Artikel ini akan membahas peran hukum adat,tantangannya, serta relevansinya dalam sistem hukum nasional.",
  //     author: {
  //       name: "Linda Kusuma, S.H., M.H.",
  //       title: "Legal Consultant",
  //     },
  //     publishedAt: "20 Feb 2024",
  //     readTime: "10 min read",
  //     thumbnail:
  //       "https://plus.unsplash.com/premium_photo-1694281930432-18b307e102b5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     isSaved: false,
  //   },
  //   {
  //     id: 10,
  //     category: "Perkembangan Hukum",
  //     title:
  //       "Hukum Ekonomi: Pilar Stabilitas dan Pertumbuhan dalam Dunia Bisnis",
  //     excerpt:
  //       "Artikel ini akan membahas peran hukum ekonomi, tantangan yang dihadapi, serta strategi untuk memperkuat sistem hukum ekonomi.",
  //     author: {
  //       name: "Linda Kusuma, S.H., M.H.",
  //       title: "Legal Consultant",
  //     },
  //     publishedAt: "10 Feb 2024",
  //     readTime: "10 min read",
  //     thumbnail:
  //       "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     isSaved: false,
  //   },
  // ]);

  const [articles, setArticles] = useState<NewsArticle[]>([]);

  const fetchArticle = async () => {
    const response = await fetch("http://localhost:3000/api/blogpost");

    const responseJson = await response.json();
    setArticles(responseJson.data);
    // console.log(responseJson.data, "<<<196");

    return responseJson;
  };

  useEffect(() => {
    fetchArticle();
  }, []);
>>>>>>> a99850624aa8cc051c406998c22bfb4ad2018dfa

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Generate unique categories from articles data
  const categories = [
    "All",
    ...new Set(articles.map((article) => article.category)),
  ];

  // Filter articles based on selected category
  const filteredArticles = articles.filter((article) =>
    selectedCategory === "All" ? true : article.category === selectedCategory
  );

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
      {/* Category Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "bg-yellow-500 text-slate-900 font-medium"
                  : "bg-slate-800 text-gray-400 hover:text-white"
              }`}
            >
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
            {filteredArticles.map((article, idx) => (
              <motion.article
                key={article._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`group bg-slate-800 rounded-xl overflow-hidden hover:bg-slate-800/80 transition-colors ${
                  idx !== articles.length - 1 ? "mb-6" : ""
                }`}
              >
                <Link
                  href={`/news/${article._id}`}
                  className="grid md:grid-cols-12 gap-6 p-4"
                >
                  {/* Thumbnail - Updated with padding */}
                  <div className="md:col-span-5 relative">
                    <div className="relative aspect-[16/10] md:aspect-[4/3] w-full h-full rounded-lg overflow-hidden">
                      <Image
                        src={article.thumbnail}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={idx === 0}
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent md:hidden" />
                    </div>
                    <span className="absolute top-4 left-4 px-3 py-1 bg-yellow-500 text-slate-900 text-sm font-medium rounded-lg md:hidden">
                      {article.category}
                    </span>
                  </div>

                  {/* Content - rest sama */}
                  <div className="md:col-span-7">
                    <div className="flex items-center justify-between mb-4">
                      <span className="hidden md:block px-3 py-1 bg-yellow-500/10 text-yellow-500 text-sm font-medium rounded-lg">
                        {article.category}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleSave(article.id);
                        }}
                        className="text-gray-400 hover:text-yellow-500"
                      >
                        {article.isSaved ? (
                          <IoBookmark className="w-5 h-5 text-yellow-500" />
                        ) : (
                          <IoBookmarkOutline className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors line-clamp-2">
                      {article.title}
                    </h2>

                    <p className="text-gray-400 mb-4 line-clamp-2 text-sm leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <h4 className="font-medium text-white">
                          {article.author.name}
                        </h4>
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
              <h3 className="text-lg font-bold text-white mb-4">
                Popular Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories
                  .filter((cat) => cat !== "All")
                  .map((category) => (
                    <Link
                      key={category}
                      href={`/news?category=${category.toLowerCase()}`}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        selectedCategory === category
                          ? "bg-yellow-500 text-slate-900"
                          : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                      }`}
                    >
                      {category}
                    </Link>
                  ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">
                Legal Newsletter
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Dapatkan update hukum terbaru dan analisis langsung ke inbox
                Anda
              </p>
              <button className="w-full px-4 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

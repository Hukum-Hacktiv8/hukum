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

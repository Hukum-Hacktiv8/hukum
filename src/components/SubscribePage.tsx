"use client";

import { motion } from "framer-motion";
import { FaCrown, FaCheck, FaStar, FaGem } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

// Definisi tipe data untuk plan
type Plan = {
  name: string;
  icon: JSX.Element;
  price: string;
  yearlyPrice?: string;
  color: string;
  popular?: boolean;
  features: string[];
};

// Data plans
/* 
    seharusnya card sudah pertama free 
    yang kedua premium dan semua fitur yang ada + ada video call dan chat with AI
*/

const plans: Plan[] = [
  {
    name: "Basic",
    icon: <FaStar className="text-4xl text-[#DAA520]" />,
    price: "IDR 99,000",
    yearlyPrice: "IDR 990,000",
    color: "from-[#B8860B] to-[#DAA520]",
    features: [
      "Basic Legal Consultation",
      "Document Review (2/month)",
      "Email Support",
      "Basic Legal Templates",
      "24/7 Chat Support",
    ],
  },
  {
    name: "Premium",
    icon: <FaCrown className="text-4xl text-[#DAA520]" />,
    price: "IDR 299,000",
    yearlyPrice: "IDR 2,990,000",
    color: "from-[#B8860B] to-[#DAA520]",
    popular: true,
    features: [
      "Priority Legal Consultation",
      "Unlimited Document Review",
      "Priority Email & Phone Support",
      "Premium Legal Templates",
      "24/7 Priority Chat Support",
      "Monthly Legal Newsletter",
      "Legal Workshop Access",
    ],
  },
];

// Komponen untuk card subscription
const SubscriptionCard = ({
  plan,
  isSelected,
  onSelect,
}: {
  plan: Plan;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  //   console.log(plan);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative rounded-2xl bg-slate-800/50 backdrop-blur-sm overflow-hidden group cursor-pointer
                ${
                  isSelected
                    ? "ring-2 ring-[#DAA520] border-transparent"
                    : plan.popular
                    ? "ring-2 ring-[#DAA520]/50 border-transparent"
                    : "border border-slate-700/50 hover:border-[#DAA520]/30"
                }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div
          className={`absolute top-0 right-0 text-white text-sm px-4 py-1 rounded-bl-lg
                    ${isSelected ? "bg-[#DAA520]" : "bg-[#DAA520]/70"}`}
        >
          Most Popular
        </div>
      )}

      {/* Background Gradient */}
      <div
        className={`p-8 bg-gradient-to-br ${plan.color} absolute inset-0 
                ${
                  isSelected ? "opacity-10" : "opacity-5 group-hover:opacity-8"
                }`}
      />

      {/* Card Content */}
      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          {plan.icon}
          <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
        </div>

        {/* Pricing */}
        {plan.price === "Custom" ? (
          <div className="mb-8">
            <div className="text-3xl font-bold text-white mb-1">
              Custom Pricing
            </div>
            <div className="text-white/60">Contact us for custom quote</div>
          </div>
        ) : (
          <div className="mb-8">
            <div className="text-3xl font-bold text-white mb-1">
              {plan.price}
            </div>
            <div className="text-white/60">per month</div>
            <div className="text-sm text-white/40 mt-1">
              {plan.yearlyPrice} / year
            </div>
          </div>
        )}

        {/* Features List */}
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 text-white/80">
              <FaCheck className="text-[#DAA520] flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <Link href="/konfirmasi/subscription">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              console.log(`Selected plan: ${plan.name}`);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 rounded-lg bg-gradient-to-r ${plan.color} 
                        text-white font-semibold hover:opacity-90 transition-all`}
          >
            {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

// Main component
export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-lora text-white mb-4"
          >
            Choose Your Legal Protection Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            Select the perfect plan for your legal needs with our flexible
            subscription options
          </motion.p>
        </div>

        {/* Subscription Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <SubscriptionCard
              key={plan.name}
              plan={plan}
              isSelected={selectedPlan === plan.name}
              onSelect={() => setSelectedPlan(plan.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

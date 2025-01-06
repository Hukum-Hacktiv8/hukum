import { IoCheckmark } from 'react-icons/io5'

export default function SubscriptionSection() {
    const plans = [
        {
            name: "Free Trial",
            price: "0",
            duration: "14 Hari",
            features: [
                "Semua fitur Free",
                "1x Konsultasi dgn pengacara",
                "Akses penuh template dokumen",
                "Chat support 24/7",
                "Review 1 dokumen hukum"
            ],
            isPopular: false,
            btnText: "Mulai Trial",
            btnStyle: "border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-slate-900"
        },
        {
            name: "Pro",
            price: "999K",
            duration: "per bulan",
            features: [
                "Semua fitur Free",
                "Konsultasi langsung dgn pengacara",
                "Akses penuh template dokumen",
                "Prioritas support 24/7",
                "Review dokumen hukum",
                "Update kasus real-time"
            ],
            isPopular: true,
            btnText: "Pilih Pro",
            btnStyle: "bg-yellow-500 text-slate-900 hover:bg-yellow-400"
        },
        {
            name: "Free",
            price: "0",
            duration: "selamanya",
            features: [
                "Konsultasi dgn AI Assistant",
                "Akses artikel hukum dasar",
                "Template dokumen terbatas",
                "Chat support 8/5"
            ],
            isPopular: false,
            btnText: "Mulai Gratis",
            btnStyle: "border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-slate-900"
        }
    ]

    return (
        <section className="py-20 bg-slate-900">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Pilih Plan yg Sesuai
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Solusi hukum terjangkau utk setiap kebutuhan Anda
                    </p>
                </div>

                {/* Subscription Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <div 
                            key={index}
                            className={`relative bg-slate-800 rounded-2xl p-8 ${
                                plan.isPopular ? 'ring-2 ring-yellow-500' : ''
                            }`}
                        >
                            {plan.isPopular && (
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-slate-900 text-sm font-semibold px-4 py-1 rounded-full">
                                    Paling Populer
                                </span>
                            )}
                            
                            <div className="text-center mb-8">
                                <h3 className="text-xl font-bold text-white mb-4">{plan.name}</h3>
                                <div className="flex items-end justify-center gap-1">
                                    <span className="text-4xl font-bold text-white">Rp {plan.price}</span>
                                    <span className="text-gray-400">/{plan.duration}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <IoCheckmark className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${plan.btnStyle}`}>
                                {plan.btnText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 
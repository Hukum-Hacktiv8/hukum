export default function StatsSection() {
    const stats = [
        {
            number: "15+",
            label: "Tahun Pengalaman",
            description: "Melayani berbagai kasus hukum di Indonesia"
        },
        {
            number: "1000+",
            label: "Kasus Berhasil",
            description: "Menangani berbagai kasus dgn tingkat keberhasilan tinggi"
        },
        {
            number: "50+",
            label: "Pengacara Profesional",
            description: "Tim ahli hukum dgn spesialisasi beragam"
        },
        {
            number: "24/7",
            label: "Dukungan AI",
            description: "Analisis kasus awal & konsultasi dgn AI assistant"
        }
    ]

    return (
        <section className="py-20 bg-slate-900">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Dipercaya oleh Ribuan Klien
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Kami berkomitmen memberikan layanan hukum terbaik dgn kombinasi pengalaman & teknologi modern
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div 
                            key={index}
                            className="bg-slate-800 p-6 rounded-lg text-center transform hover:scale-105 transition-transform"
                        >
                            <div className="text-yellow-500 text-4xl font-bold mb-2">
                                {stat.number}
                            </div>
                            <h3 className="text-white text-xl font-semibold mb-2">
                                {stat.label}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
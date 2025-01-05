import { 
    IoScaleOutline, 
    IoBusinessOutline, 
    IoHomeOutline,
    IoPeopleOutline,
    IoDocumentTextOutline,
    IoShieldOutline
} from 'react-icons/io5'

export default function ServicesSection() {
    const services = [
        {
            icon: <IoScaleOutline className="w-8 h-8" />,
            title: "Hukum Pidana",
            description: "Pembelaan kasus pidana dgn pendekatan yg komprehensif & strategis"
        },
        {
            icon: <IoBusinessOutline className="w-8 h-8" />,
            title: "Hukum Bisnis",
            description: "Konsultasi & pendampingan legal utk kebutuhan bisnis & korporasi"
        },
        {
            icon: <IoHomeOutline className="w-8 h-8" />,
            title: "Hukum Properti",
            description: "Penanganan sengketa properti & perizinan pembangunan"
        },
        {
            icon: <IoPeopleOutline className="w-8 h-8" />,
            title: "Hukum Keluarga",
            description: "Mediasi & penyelesaian masalah keluarga dgn pendekatan yg sensitif"
        },
        {
            icon: <IoDocumentTextOutline className="w-8 h-8" />,
            title: "Hukum Kontrak",
            description: "Penyusunan & review kontrak utk kepastian hukum bisnis"
        },
        {
            icon: <IoShieldOutline className="w-8 h-8" />,
            title: "Hukum Perlindungan",
            description: "Perlindungan hak cipta, paten & kekayaan intelektual"
        }
    ]

    return (
        <section className="py-20 bg-slate-900">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Layanan Hukum Komprehensif
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Kami menyediakan berbagai layanan hukum yg disesuaikan dgn kebutuhan spesifik setiap klien
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div 
                            key={index}
                            className="bg-slate-800 p-6 rounded-lg group hover:bg-yellow-500 transition-all duration-300"
                        >
                            <div className="text-yellow-500 mb-4 group-hover:text-white transition-colors">
                                {service.icon}
                            </div>
                            <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-slate-900">
                                {service.title}
                            </h3>
                            <p className="text-gray-400 group-hover:text-slate-800">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
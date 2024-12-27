"use client"

export default function MottoSection() {
    return (
        <div className="
            bg-white/10 
            backdrop-blur-xl 
            p-10 
            border 
            border-white/20 
            rounded-3xl 
            relative
            text-white 
            text-center 
            h-auto 
            overflow-hidden 
            group
        ">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <h2 className="text-4xl font-lora mb-8 relative">
                Konsultasi Hukum Modern
            </h2>
            
            <div className="space-y-8 relative">
                <div className="text-xl font-light space-y-4">
                    <p className="leading-relaxed">
                        Temukan solusi hukum terpercaya melalui konsultasi dengan pengacara profesional berpengalaman
                    </p>
                </div>
                
                <div className="text-sm text-white/80 italic">
                    &quot;Mewujudkan keadilan dan kepastian hukum bagi seluruh lapisan masyarakat Indonesia&quot;
                </div>
            </div>
        </div>
    )
} 


//! bisa diganti logo
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="relative min-h-screen">
            <div className="fixed inset-0 w-full h-full">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    preload="auto"
                    className="object-cover w-full h-full brightness-125"
                >
                    <source 
                        src="https://res.cloudinary.com/dngm0voif/video/upload/v1735297045/Skyscraper_Building_City_Urban_4K_Free_HD_Stock_Footage_-_No_Copyright_Skyscraper_Building_sky_xufzgo.mp4" 
                        type="video/mp4" 
                    />
                </video>
            </div>
            <div className="fixed inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40" />
            <div className="relative">
                {children}
            </div>
        </div>
    )
} 
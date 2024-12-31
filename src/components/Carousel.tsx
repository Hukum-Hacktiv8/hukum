export default function Carousel() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="carousel w-full px-4">
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className="carousel-item w-full md:w-1/3 px-2">
            <div className="bg-slate-800/50 p-6 rounded-xl w-full">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={`https://picsum.photos/seed/${num}/64/64`}
                    alt="Client"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-white font-medium">
                      Client Name {num}
                    </h3>
                    <p className="text-white/60 text-sm">Business Owner</p>
                  </div>
                </div>
                <p className="text-white/80">
                  "Pelayanan sangat profesional dan responsif. Sangat membantu
                  dalam menyelesaikan masalah hukum saya."
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

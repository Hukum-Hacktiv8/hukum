import Link from "next/link";

export default function TipsCard() {
  return (
    <div className="flex justify-center gap-5 p-5">
      {/* Tips 1 */}
      <div className="card glass w-96">
        <figure>
          <img
            src="https://images.hukumonline.com/frontend/lt515b7ec90fe0c/lt64df56656b9b2.jpg"
            alt="tips1"
          />
        </figure>
        <div className="card-body">
          <Link href="https://www.hukumonline.com/klinik/a/cara-hitung-pesangon-lt515b7ec90fe0c/">
            <h2 className="card-title">
              Cara Hitung Pesangon Berdasarkan UU Cipta Kerja
            </h2>
          </Link>
        </div>
      </div>
      {/* Tips 2 */}
      <div className="card glass w-96">
        <figure>
          <img
            src="https://images.hukumonline.com/frontend/lt66a12b77d0258/lt66a12c7c1762d.jpg"
            alt="tips2"
          />
        </figure>
        <div className="card-body">
          <Link href="https://www.hukumonline.com/klinik/a/tips-terhindar-dari-penipuan-mobil-skema-segitiga-lt66a12b77d0258/">
            <h2 className="card-title">
              Tips Terhindar dari Penipuan Mobil Skema Segitiga
            </h2>
          </Link>
        </div>
      </div>
      {/* Tips 3 */}
      <div className="card glass w-96">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="car!"
          />
        </figure>
        <div className="card-body">
          <Link href="https://www.hukumonline.com/klinik/a/cara-hitung-pesangon-lt515b7ec90fe0c/">
            <h2 className="card-title">
              Cara Hitung Pesangon Berdasarkan UU Cipta Kerja
            </h2>
          </Link>
        </div>
      </div>
      {/* Tips 4 */}
      <div className="card glass w-96">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="car!"
          />
        </figure>
        <div className="card-body">
          <Link href="https://www.hukumonline.com/klinik/a/cara-hitung-pesangon-lt515b7ec90fe0c/">
            <h2 className="card-title">
              Cara Hitung Pesangon Berdasarkan UU Cipta Kerja
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
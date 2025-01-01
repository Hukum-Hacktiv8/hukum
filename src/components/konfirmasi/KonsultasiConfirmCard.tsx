"use client";

export default function KonsultasiConfirmCard() {
  return (
    <main className="">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://images.pexels.com/photos/4427610/pexels-photo-4427610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Lawyer"
            className="h-40 rounded-lg ml-2"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Jasa Konsultasi (One-time)</h2>
          <p>Click the button to listen on Spotiwhy app.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
      </div>
    </main>
  );
}

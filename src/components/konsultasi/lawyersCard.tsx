import Link from "next/link";

export default function LawyersCard() {
  return (
    <>
      <div className="flex justify-center p-5 gap-6 mt-20">
        {/* Lawyer 1 */}
        <div className="card bg-base-100 w-96 shadow-xl">
          <figure>
            <img
              src="https://images.pexels.com/photos/4427622/pexels-photo-4427622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Lawyer1"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Dr.Stephanie Mo</h2>

            <div className="card-actions justify-end">
              <button className="btn bg-red-500 text-white hover:bg-red-600">
                Unavailable
              </button>
            </div>
          </div>
        </div>
        {/* Lawyer 2 */}
        <div className="card bg-base-100 w-96 shadow-xl">
          <figure>
            <img
              src="https://images.pexels.com/photos/4427620/pexels-photo-4427620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Lawyer2"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Dr. Andi Sanjaya</h2>

            <div className="card-actions justify-end">
              <button className="btn bg-red-500 text-white hover:bg-red-600">
                Unavailable
              </button>
            </div>
          </div>
        </div>
        {/* Lawyer 3 */}
        <div className="card bg-base-100 w-96 shadow-xl">
          <figure>
            <img
              src="https://images.pexels.com/photos/4427610/pexels-photo-4427610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Lawyer3"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Dr. Andria Pratama</h2>

            <div className="card-actions justify-end">
              <Link href="/konsultasi">
                <button className="btn btn-primary">Available</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

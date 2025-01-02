export default function WaveDivider() {
  return (
    <div className="wave-container relative w-full h-[150px] overflow-hidden">
      <svg
        className="waves h-full w-[100%] min-w-[1000px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="wave-path"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="wave-parallax">
          {/* Wave 1 - Paling belakang */}
          <use
            xlinkHref="#wave-path"
            x="48"
            y="0"
            fill="rgba(15,23,42,0.4)"
            className="wave1"
          />
          {/* Wave 2 - Tengah */}
          <use
            xlinkHref="#wave-path"
            x="48"
            y="3"
            fill="rgba(30,58,138,0.3)"
            className="wave2"
          />
          {/* Wave 3 - Paling depan - Disamakan dengan footer & navbar */}
          <use
            xlinkHref="#wave-path"
            x="48"
            y="5"
            fill="rgba(15,23,42,0.95)"
            className="wave3"
          />
        </g>
      </svg>
    </div>
  );
}

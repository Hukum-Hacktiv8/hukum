export default function ChatPage() {
  return (
    <>
      <div className="p-10">
        <div className="flex justify-center text-5xl font-bold p-5">
          KONSULTASI
        </div>
        <div className="w-30 bg-light-gray p-2">
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble ">
              Halo, selamat datang di Halaman Konsultasi. Konsultasi chat lebih
              mudah, aman dan telah membantu banyak klien. Konsultasi via Chat
              Rp50.000 untuk 30 menit
            </div>
            <div className="chat-footer opacity-50"></div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">I hate you!</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
        </div>
      </div>
    </>
  );
}

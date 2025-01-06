import cron from "node-cron";
import { activateRoom, deactiveRoom, deleteRoomIfExpired } from "@/models/chatroom";
export function startCronJobs() {
  // Create chat room every day at 9 Pagi
  cron.schedule(
    "0 9 * * *",
    async () => {
      console.log("menjalankan aktivasi room...");
      try {
        await activateRoom();
        console.log("bisa ni mengaktifkan room");
      } catch (error) {
        console.error("Gagal mengaktifkan room:", error);
      }
    },
    {
      timezone: "Asia/Jakarta",
    }
  );

  // Delete expired chat rooms every 17.00 Wib  minutes
  cron.schedule(
    "0 17 * * *",
    async () => {
      console.log("menjalankan deaktivasi room...");
      try {
        await deactiveRoom();
        console.log("bisa ni deactive room");
      } catch (error) {
        console.error("Gagal deactive room:", error);
      }
    },
    {
      timezone: "Asia/Jakarta",
    }
  );

  // Cron job untuk menghapus room yang sudah tidak aktif setiap hari jam 18:01
  cron.schedule(
    "1 18 * * *",
    async () => {
      console.log("Menjalankan penghapusan room yang tidak aktif...");
      try {
        await deleteRoomIfExpired();
        console.log("Berhasil menghapus room yang tidak aktif");
      } catch (error) {
        console.error("Gagal menghapus room yang tidak aktif:", error);
      }
    },
    {
      timezone: "Asia/Jakarta",
    }
  );
}

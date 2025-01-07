"use client";

import { useState } from "react";
import DigitalSignature from "@/components/DigitalSignature";
import { createPDFTemplate, addSignatureToPDF } from "@/utils/pdfTemplate";
import { useRouter } from "next/navigation";

export default function Page() {
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const handleSaveSignature = (image: string) => {
    setSignatureImage(image);
  };
  const logo: string = "https://thumbs.dreamstime.com/b/law-firm-logo-concept-lawyer-attorney-legal-lawyer-service-law-firm-logo-template-lawyer-attorney-jurist-judge-business-woman-326864298.jpg";
  const handlePreviewPDF = () => {
    if (signatureImage) {
      // Buat template PDF
      const pdf = createPDFTemplate(logo);

      // Tambahkan tanda tangan
      addSignatureToPDF(pdf, signatureImage);

      // Buat preview PDF
      const pdfData = pdf.output("datauristring");
      setPdfPreview(pdfData);
    }
  };

  const generatePDF = () => {
    if (signatureImage) {
      const pdf = createPDFTemplate(logo);
      addSignatureToPDF(pdf, signatureImage);
      pdf.save("surat-pernyataan.pdf");
    }
  };

  const savePDFToDatabase = async () => {
    if (signatureImage) {
      setIsSaving(true);
      try {
        const pdf = createPDFTemplate(logo);
        addSignatureToPDF(pdf, signatureImage);
        const pdfData = pdf.output("datauristring");

        const response = await fetch("http://localhost:3000/api/savePDF", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pdfData,
            filename: `surat-pernyataan-${Date.now()}.pdf`,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save PDF");
        }

        // const result = await response.json();
        // alert(`PDF berhasil disimpan ke database dengan ID: ${result.id}`);
        router.push("/");
      } catch (error) {
        console.error("Error saving PDF:", error);
        // alert("Gagal menyimpan PDF ke database");
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Digital Signature</h1>

      {/* Area Tanda Tangan */}
      <div className="mb-6">
        <h2 className="text-xl mb-2">Buat Tanda Tangan</h2>
        <DigitalSignature onSave={handleSaveSignature} />
      </div>

      {/* Preview Tanda Tangan */}
      {signatureImage && (
        <div className="mb-6">
          <h2 className="text-xl mb-2">Preview Tanda Tangan:</h2>
          <img src={signatureImage} alt="Signature" className="border border-gray-300 max-w-[300px]" />
        </div>
      )}

      {/* Tombol Aksi */}
      <div className="space-x-4 mb-6">
        <button onClick={handlePreviewPDF} className="px-4 py-2 bg-blue-500 text-white rounded" disabled={!signatureImage}>
          Preview PDF
        </button>
        <button onClick={generatePDF} className="px-4 py-2 bg-green-500 text-white rounded" disabled={!signatureImage}>
          Download PDF
        </button>
        <button onClick={savePDFToDatabase} className="px-4 py-2 bg-purple-500 text-white rounded" disabled={!signatureImage || isSaving}>
          {isSaving ? "Menyimpan..." : "Continue "}
        </button>
      </div>

      {/* Preview PDF */}
      {pdfPreview && (
        <div className="mt-6">
          <h2 className="text-xl mb-2">Preview PDF:</h2>
          <iframe src={pdfPreview} className="w-full h-[600px] border border-gray-300" />
        </div>
      )}
    </div>
  );
}

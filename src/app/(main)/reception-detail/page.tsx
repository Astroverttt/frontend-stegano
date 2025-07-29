"use client";

import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ProfileCard from "@/components/ProfileCard";
import { DETAIL_PAGE } from "@/constant";
import Divider from "@/components/ui/Divider";

interface ReceiptDetail {
  receipt_id: string;
  artwork_title: string;
  image_url: string;
  purchase_date: string;
  price: number;
  buyer_secret_code: string;
  download_url: string;
  watermark_api: string;
}

interface WatermarkResult {
  extracted_in: string;
  copyright_hash: string;
  creator_message: string;
}

const ReceiptDetailPage: React.FC = () => {
  // const router = useRouter();
  // const { id: receiptId } = router.query;
  const receiptId = "1";
  const data = DETAIL_PAGE;
  const test = true;

  const [receipt, setReceipt] = useState<ReceiptDetail | null>(null);
  const [watermark, setWatermark] = useState<WatermarkResult | null>(null);
  const [loadingReceipt, setLoadingReceipt] = useState(true);
  const [loadingWatermark, setLoadingWatermark] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = "http://localhost:8000";

  const handleExtractWatermark = useCallback(
    async (currentReceipt: ReceiptDetail) => {
      setLoadingWatermark(true);
      setError(null);
      setWatermark(null);

      try {
        const response = await fetch(
          API_BASE_URL + currentReceipt.watermark_api,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image_url: API_BASE_URL + currentReceipt.image_url,
              buyer_secret_code: currentReceipt.buyer_secret_code,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Gagal mengekstrak watermark.");
        }

        const data: WatermarkResult = await response.json();
        setWatermark(data);
      } catch (err: any) {
        setError(
          err.message || "Terjadi kesalahan saat mengekstrak watermark."
        );
      } finally {
        setLoadingWatermark(false);
      }
    },
    [API_BASE_URL]
  );

  useEffect(() => {
    if (!receiptId) return;

    const fetchReceiptDetail = async () => {
      setLoadingReceipt(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Anda harus login untuk melihat detail pembelian.");
          setLoadingReceipt(false);
          return;
        }

        const response = await fetch(
          API_BASE_URL + "/api/payments/receipt/" + receiptId,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Gagal memuat detail pembelian.");
        }

        const data: ReceiptDetail = await response.json();
        setReceipt(data);
        handleExtractWatermark(data);
      } catch (err: any) {
        setError(
          err.message || "Terjadi kesalahan saat memuat detail pembelian."
        );
      } finally {
        setLoadingReceipt(false);
      }
    };

    fetchReceiptDetail();
  }, [receiptId, API_BASE_URL, handleExtractWatermark]);

  if (loadingReceipt) {
    return (
      <p className="text-center py-10 text-gray-500">
        Memuat detail pembelian...
      </p>
    );
  }

  return (
    <div className="w-screen bg-[#f2f4f5] flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 my-3">
        Tanda Terima Pembelian
      </h1>

      {test && (
        <main className="py-8 bg-white px-8 mb-10 rounded-2xl mx-10 shadow-lg min-w-3/4">
          <h1 className="text-2xl font-bold text-gray-900">{data.title}</h1>
          <ProfileCard data={data} className="my-2" />
          <Image
            src={data.imageUrl}
            alt={data.title}
            width={600}
            height={400}
            className="object-contain max-h-[500px] w-full pb-4"
          />
          <Divider />
          <div className="my-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Hasil Watermark
            </h2>
            <p className="leading-relaxed"><span className="font-semibold">Diekstrak dalam:</span> {data.extracted_in} seconds</p>
            <p className="leading-relaxed"><span className="font-semibold">Hash Hak Cipta:</span> {data.copyright_hash}</p>
            <p className="leading-relaxed"><span className="font-semibold">Pesan Pembuat:</span> {data.creator_message}</p>
          </div>
          <Divider />
        </main>
      )}

      {receipt && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-center">
            <Image
              src={API_BASE_URL + receipt.image_url}
              alt={receipt.artwork_title}
              width={600}
              height={400}
              className="rounded-lg object-contain max-h-[500px] w-full"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-gray-700 text-base mb-4">
                Terima kasih telah membeli karya <i>{receipt.artwork_title}</i>!
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Detail Pembelian:
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Tanggal Beli:</strong>{" "}
                  {new Date(receipt.purchase_date).toLocaleDateString("id-ID")}
                </li>
                <li>
                  <strong>Harga:</strong> Rp{" "}
                  {receipt.price.toLocaleString("id-ID")}
                </li>
                <li>
                  <strong>Kode Rahasia:</strong>{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    {receipt.buyer_secret_code}
                  </code>
                </li>
              </ul>
            </div>

            <p className="text-xs text-gray-400 mt-6">
              Simpan informasi ini sebagai bukti resmi pembelian karya digital.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiptDetailPage;

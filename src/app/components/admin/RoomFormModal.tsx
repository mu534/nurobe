import { useState } from "react";
import type { Room } from "../../../types/types";

import {
  Upload,
  Trash2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  RefreshCw,
} from "lucide-react";

type RoomPayload = Omit<Room, "id" | "image"> & {
  imageFile?: File | null;
  imageUrl?: string;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: RoomPayload,
    onProgress: (progress: number) => void,
  ) => Promise<void>;
  initialData?: Room;
}

export function RoomFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [formData, setFormData] = useState({
    name: initialData?.name ?? "",
    type: initialData?.type ?? "",
    price: initialData?.price ?? 0,
    available: initialData?.available ?? true,
    maxGuests: initialData?.maxGuests ?? 1,
    size: initialData?.size ?? "",
    bedType: initialData?.bedType ?? "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(initialData?.image ?? "");
  const [preview, setPreview] = useState(initialData?.image ?? "");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "maxGuests" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImageUrl("");
    setPreview(URL.createObjectURL(file));
    setZoom(1);
    setRotation(0);
  };

  const applyTransformations = async () => {
    if (!preview) return;

    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = preview;
      });

      const canvas = document.createElement("canvas");

      // Calculate bounding box INCLUDING zoom
      const rad = (rotation * Math.PI) / 180;
      const sin = Math.abs(Math.sin(rad));
      const cos = Math.abs(Math.cos(rad));

      const scaledWidth = img.width * zoom;
      const scaledHeight = img.height * zoom;

      canvas.width = scaledWidth * cos + scaledHeight * sin;
      canvas.height = scaledWidth * sin + scaledHeight * cos;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Cannot get canvas context");

      // Center and apply transformations
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rad);
      ctx.scale(zoom, zoom);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      // Export as JPEG (good balance of quality/size)
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", 0.92),
      );

      if (!blob) throw new Error("Canvas toBlob failed");

      const newFile = new File([blob], `room-${Date.now()}.jpg`, {
        type: "image/jpeg",
      });

      // Update state
      setImageFile(newFile);
      setImageUrl(""); // no longer using URL
      setPreview(URL.createObjectURL(newFile));

      // Reset controls since changes are now baked in
      setZoom(1);
      setRotation(0);

      alert("Image edits applied successfully!");
    } catch (err) {
      console.error("Failed to apply image edits:", err);
      alert("Could not apply image changes. Please try again.");
    }
  };

  const handleSubmit = async () => {
    try {
      setUploading(true);
      setUploadProgress(0);

      await onSubmit(
        {
          ...formData,
          imageFile,
          imageUrl,
        },
        (progress) => setUploadProgress(progress),
      );

      setUploading(false);
      onClose();
    } catch (err) {
      console.error(err);
      setUploading(false);
      alert("Upload failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 space-y-6 my-10">
        <h3 className="text-xl font-semibold">
          {initialData ? "Edit Room" : "Add Room"}
        </h3>

        <input
          name="name"
          placeholder="Room Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="type"
          placeholder="Room Type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="maxGuests"
          type="number"
          placeholder="Capacity"
          value={formData.maxGuests}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="size"
          placeholder="Size"
          value={formData.size}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="bedType"
          placeholder="Bed Type"
          value={formData.bedType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
            setImageFile(null);
            setPreview(e.target.value);
            setZoom(1);
            setRotation(0);
          }}
          className="w-full border p-2 rounded"
        />

        <div className="text-center text-sm text-gray-500">OR</div>

        <label className="flex items-center gap-2 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-fit">
          <Upload size={16} />
          Choose Image
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
        </label>

        {preview && (
          <div className="border rounded-lg p-4 bg-gray-50 space-y-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setZoom((z) => Math.min(z + 0.2, 3))}
                className="flex items-center gap-1 px-3 py-1 bg-white border rounded hover:bg-gray-100"
                disabled={uploading}
              >
                <ZoomIn size={16} /> Zoom In
              </button>

              <button
                onClick={() => setZoom((z) => Math.max(z - 0.2, 0.5))}
                className="flex items-center gap-1 px-3 py-1 bg-white border rounded hover:bg-gray-100"
                disabled={uploading}
              >
                <ZoomOut size={16} /> Zoom Out
              </button>

              <button
                onClick={() => setRotation((r) => r + 90)}
                className="flex items-center gap-1 px-3 py-1 bg-white border rounded hover:bg-gray-100"
                disabled={uploading}
              >
                <RotateCw size={16} /> Rotate Right
              </button>

              <button
                onClick={() => setRotation((r) => r - 90)}
                className="flex items-center gap-1 px-3 py-1 bg-white border rounded hover:bg-gray-100"
                disabled={uploading}
              >
                <RotateCcw size={16} /> Rotate Left
              </button>

              <button
                onClick={applyTransformations}
                className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                disabled={uploading || !preview}
              >
                <RefreshCw size={16} /> Apply Edits
              </button>

              <button
                onClick={() => {
                  setPreview("");
                  setImageFile(null);
                  setImageUrl("");
                  setZoom(1);
                  setRotation(0);
                }}
                className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                disabled={uploading}
              >
                <Trash2 size={16} /> Remove
              </button>

              <button
                onClick={() => {
                  setZoom(1);
                  setRotation(0);
                }}
                className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                disabled={uploading}
              >
                <RefreshCw size={16} /> Reset View
              </button>
            </div>

            <div className="w-full h-[400px] overflow-auto bg-black rounded flex items-center justify-center">
              <img
                src={preview}
                alt="Preview"
                className="transition-transform duration-200 ease-out"
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        )}

        {uploading && (
          <div className="w-full bg-gray-200 rounded h-3">
            <div
              className="bg-blue-600 h-3 rounded transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button
            disabled={uploading}
            onClick={handleSubmit}
            className="flex-1 bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50 font-medium"
          >
            {uploading ? `Uploading ${uploadProgress}%` : "Save Room"}
          </button>

          <button
            onClick={onClose}
            disabled={uploading}
            className="flex-1 bg-gray-300 py-3 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

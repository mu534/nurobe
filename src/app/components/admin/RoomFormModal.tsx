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

// ================== Strict typing for form fields ==================
type FormFields = "name" | "type" | "maxGuests" | "price" | "size" | "bedType";
const fields: FormFields[] = [
  "name",
  "type",
  "maxGuests",
  "price",
  "size",
  "bedType",
];

type EditableImage = {
  file: File;
  preview: string;
  zoom: number;
  rotation: number;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: FormData,
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

  const [images, setImages] = useState<EditableImage[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  // ================== Handlers ==================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "maxGuests" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files);
    if (selectedFiles.length + images.length > 2) {
      alert("You must upload exactly 2 images.");
      return;
    }

    const newImages: EditableImage[] = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      zoom: 1,
      rotation: 0,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const updateImage = (index: number, updates: Partial<EditableImage>) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, ...updates } : img)),
    );
  };

  const removeImage = (index: number) =>
    setImages((prev) => prev.filter((_, i) => i !== index));

  const applyTransformations = async (index: number) => {
    const imageData = images[index];
    if (!imageData) return;

    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = imageData.preview;
    });

    const canvas = document.createElement("canvas");
    const rad = (imageData.rotation * Math.PI) / 180;
    const sin = Math.abs(Math.sin(rad));
    const cos = Math.abs(Math.cos(rad));
    const scaledWidth = img.width * imageData.zoom;
    const scaledHeight = img.height * imageData.zoom;

    canvas.width = scaledWidth * cos + scaledHeight * sin;
    canvas.height = scaledWidth * sin + scaledHeight * cos;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rad);
    ctx.scale(imageData.zoom, imageData.zoom);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.92),
    );
    if (!blob) return;

    const newFile = new File([blob], `room-${Date.now()}.jpg`, {
      type: "image/jpeg",
    });
    updateImage(index, {
      file: newFile,
      preview: URL.createObjectURL(newFile),
      zoom: 1,
      rotation: 0,
    });
  };

  const handleSubmit = async () => {
    if (images.length !== 2) {
      alert("You must upload exactly 2 images.");
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("price", formData.price.toString());
      formDataToSend.append("maxGuests", formData.maxGuests.toString());
      formDataToSend.append("size", formData.size);
      formDataToSend.append("bedType", formData.bedType);
      formDataToSend.append("available", String(formData.available));
      images.forEach((img) => formDataToSend.append("images", img.file));

      await onSubmit(formDataToSend, (progress) => setUploadProgress(progress));

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

        {/* ================== Form Fields ================== */}
        {fields.map((field) => (
          <input
            key={field}
            name={field}
            type={
              field === "price" || field === "maxGuests" ? "number" : "text"
            }
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        ))}

        {/* ================== Image Upload ================== */}
        <label
          className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded w-fit text-white ${
            images.length >= 2
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <Upload size={16} />
          Choose Images (2 required)
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            disabled={images.length >= 2}
            onChange={handleFileChange}
          />
        </label>

        <p className="text-sm text-gray-500">
          {images.length}/2 images uploaded
        </p>

        {/* ================== Preview + Editor ================== */}
        {images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((img, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 bg-gray-50 space-y-4"
              >
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      updateImage(index, { zoom: Math.min(img.zoom + 0.2, 3) })
                    }
                    className="px-3 py-1 bg-white border rounded hover:bg-gray-100"
                  >
                    <ZoomIn size={16} />
                  </button>
                  <button
                    onClick={() =>
                      updateImage(index, {
                        zoom: Math.max(img.zoom - 0.2, 0.5),
                      })
                    }
                    className="px-3 py-1 bg-white border rounded hover:bg-gray-100"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <button
                    onClick={() =>
                      updateImage(index, { rotation: img.rotation + 90 })
                    }
                    className="px-3 py-1 bg-white border rounded hover:bg-gray-100"
                  >
                    <RotateCw size={16} />
                  </button>
                  <button
                    onClick={() =>
                      updateImage(index, { rotation: img.rotation - 90 })
                    }
                    className="px-3 py-1 bg-white border rounded hover:bg-gray-100"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button
                    onClick={() => applyTransformations(index)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    <RefreshCw size={16} />
                  </button>
                  <button
                    onClick={() => removeImage(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="w-full h-64 overflow-auto bg-black rounded flex items-center justify-center">
                  <img
                    src={img.preview}
                    alt=""
                    className="transition-transform duration-200 ease-out"
                    style={{
                      transform: `scale(${img.zoom}) rotate(${img.rotation}deg)`,
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================== Progress & Buttons ================== */}
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
            disabled={uploading}
            onClick={onClose}
            className="flex-1 bg-gray-300 py-3 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

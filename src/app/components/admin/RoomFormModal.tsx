import { useState } from "react";
import type { Room } from "../../../types/types";

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
        (progress) => {
          setUploadProgress(progress);
        },
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
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

        {/* Image URL */}
        <input
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
            setImageFile(null);
            setPreview(e.target.value);
          }}
          className="w-full border p-2 rounded"
        />

        <div className="text-center text-sm text-gray-500">OR</div>

        <input type="file" accept="image/*" onChange={handleFileChange} />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover rounded"
          />
        )}

        {/* Upload Progress Bar */}
        {uploading && (
          <div className="w-full bg-gray-200 rounded h-3 mt-2">
            <div
              className="bg-blue-600 h-3 rounded transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <button
            disabled={uploading}
            onClick={handleSubmit}
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {uploading ? `Uploading ${uploadProgress}%` : "Save"}
          </button>

          <button onClick={onClose} className="flex-1 bg-gray-300 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

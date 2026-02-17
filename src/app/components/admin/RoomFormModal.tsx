import { useState } from "react";
import type { Room } from "../../../types/types";

type RoomFormData = Omit<Room, "id">;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RoomFormData) => Promise<void>;
  initialData?: Room;
}

export function RoomFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const emptyRoom: RoomFormData = {
    name: "",
    type: "",
    price: 0,
    image: "",
    available: true,
    maxGuests: 1,
    size: "",
    bedType: "",
  };

  const initialFormState: RoomFormData = initialData
    ? {
        name: initialData.name,
        type: initialData.type,
        price: initialData.price,
        image: initialData.image,
        available: initialData.available,
        maxGuests: initialData.maxGuests,
        size: initialData.size,
        bedType: initialData.bedType,
      }
    : emptyRoom;

  // ✅ Hooks are always called unconditionally
  const [formData, setFormData] = useState<RoomFormData>(initialFormState);
  const [imagePreview, setImagePreview] = useState<string>(
    initialData?.image ?? "",
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "maxGuests" ? Number(value) : value,
    }));
    if (name === "image") setImagePreview(value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setFormData((prev) => ({ ...prev, image: base64 }));
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    await onSubmit(formData);
    onClose();
  };

  // ✅ Early return for rendering, hooks already called above
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
        <h3 className="text-xl font-semibold">
          {initialData ? "Edit Room" : "Add New Room"}
        </h3>

        {/* Form Inputs */}
        <input
          name="name"
          type="text"
          placeholder="Room Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="type"
          type="text"
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
          type="text"
          placeholder="Size"
          value={formData.size}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="bedType"
          type="text"
          placeholder="Bed Type"
          value={formData.bedType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="image"
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className="text-center text-sm text-gray-500">OR</div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full"
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-40 object-cover rounded"
          />
        )}

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {initialData ? "Update Room" : "Add Room"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-900 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import type { Room } from "../../../types/types";
import { getRoomAmenities } from "../../../types/types";
import {
  Upload,
  Trash2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  X,
  Wifi,
  Tv,
  Wind,
  Bath,
  ConciergeBell,
  UtensilsCrossed,
  Coffee,
  Armchair,
  Check,
} from "lucide-react";

type FormFields = "name" | "type" | "maxGuests" | "price" | "size" | "bedType";

const fieldConfig: {
  name: FormFields;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  {
    name: "name",
    label: "Room Name",
    type: "text",
    placeholder: "e.g. Deluxe King Room",
  },
  {
    name: "type",
    label: "Room Type",
    type: "text",
    placeholder: "e.g. standard, deluxe, suite",
  },
  {
    name: "price",
    label: "Price per Night ($)",
    type: "number",
    placeholder: "e.g. 120",
  },
  {
    name: "maxGuests",
    label: "Max Guests",
    type: "number",
    placeholder: "e.g. 2",
  },
  { name: "size", label: "Room Size", type: "text", placeholder: "e.g. 35 m²" },
  {
    name: "bedType",
    label: "Bed Type",
    type: "text",
    placeholder: "e.g. King Bed",
  },
];

const AMENITY_OPTIONS = [
  { label: "WiFi", icon: Wifi },
  { label: "TV", icon: Tv },
  { label: "Air Conditioning", icon: Wind },
  { label: "Private Bathroom", icon: Bath },
  { label: "Room Service", icon: ConciergeBell },
  { label: "Breakfast Included", icon: UtensilsCrossed },
  { label: "Coffee Maker", icon: Coffee },
  { label: "Balcony", icon: Armchair },
];

const DEFAULT_AMENITIES = [
  "WiFi",
  "TV",
  "Air Conditioning",
  "Private Bathroom",
  "Room Service",
];

type EditableImage = {
  file: File | null;
  preview: string;
  zoom: number;
  rotation: number;
  isExisting?: boolean;
};

type FormErrors = Partial<Record<FormFields | "images", string>>;

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
  const existingImages: EditableImage[] = initialData?.image
    ? initialData.image
        .split(",")
        .filter(Boolean)
        .map((url) => ({
          file: null,
          preview: url,
          zoom: 1,
          rotation: 0,
          isExisting: true,
        }))
    : [];

  // Load existing amenities if editing, otherwise use defaults
  const initialAmenities = initialData
    ? getRoomAmenities(initialData)
    : DEFAULT_AMENITIES;

  const [formData, setFormData] = useState({
    name: initialData?.name ?? "",
    type: initialData?.type ?? "",
    price: initialData?.price ?? 0,
    available: initialData?.available ?? true,
    maxGuests: initialData?.maxGuests ?? 1,
    size: initialData?.size ?? "",
    bedType: initialData?.bedType ?? "",
  });

  const [amenities, setAmenities] = useState<string[]>(initialAmenities);
  const [images, setImages] = useState<EditableImage[]>(existingImages);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Room name is required";
    if (!formData.type.trim()) newErrors.type = "Room type is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!formData.maxGuests || formData.maxGuests < 1)
      newErrors.maxGuests = "At least 1 guest required";
    if (!formData.size.trim()) newErrors.size = "Room size is required";
    if (!formData.bedType.trim()) newErrors.bedType = "Bed type is required";
    if (images.length !== 2) newErrors.images = "Exactly 2 images are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "maxGuests" ? Number(value) : value,
    }));
    if (errors[name as FormFields]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const toggleAmenity = (label: string) => {
    setAmenities((prev) =>
      prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label],
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const selectedFiles = Array.from(files);
    if (selectedFiles.length + images.length > 2) {
      setErrors((prev) => ({
        ...prev,
        images: "You can upload exactly 2 images total.",
      }));
      return;
    }
    const newImages: EditableImage[] = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      zoom: 1,
      rotation: 0,
      isExisting: false,
    }));
    setImages((prev) => [...prev, ...newImages]);
    setErrors((prev) => ({ ...prev, images: undefined }));
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
      image.crossOrigin = "anonymous";
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
      isExisting: false,
    });
  };

  const handleSubmit = async () => {
    if (!validate()) return;
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
      formDataToSend.append("amenities", JSON.stringify(amenities));

      images.forEach((img) => {
        if (!img.isExisting && img.file) {
          formDataToSend.append("images", img.file);
        } else if (img.isExisting) {
          formDataToSend.append("images", img.preview);
        }
      });

      await onSubmit(formDataToSend, (progress) => setUploadProgress(progress));
      setUploading(false);
      onClose();
    } catch (err) {
      console.error(err);
      setUploading(false);
      alert("Upload failed");
    }
  };

  const canAddMore = images.length < 2;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-4xl my-10 overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-5 flex items-center justify-between">
          <h3 className="text-xl text-white">
            {initialData ? "Edit Room" : "Add New Room"}
          </h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fieldConfig.map((field) => (
              <div key={field.name}>
                <label className="block text-sm text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors[field.name]
                      ? "border-red-400 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                {errors[field.name] && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">Availability</span>
            <button
              onClick={() =>
                setFormData((prev) => ({ ...prev, available: !prev.available }))
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.available ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  formData.available ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${formData.available ? "text-green-600" : "text-gray-500"}`}
            >
              {formData.available ? "Available" : "Not Available"}
            </span>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm text-gray-700 mb-3">
              Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {AMENITY_OPTIONS.map(({ label, icon: Icon }) => {
                const checked = amenities.includes(label);
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleAmenity(label)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition ${
                      checked
                        ? "bg-blue-50 border-blue-500 text-blue-700"
                        : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 ${checked ? "text-blue-600" : "text-gray-400"}`}
                    />
                    <span className="truncate text-xs">{label}</span>
                    <span
                      className={`ml-auto w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                        checked
                          ? "bg-blue-600 border-blue-600"
                          : "border-gray-300"
                      }`}
                    >
                      {checked && (
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm text-gray-700">
                Room Images{" "}
                <span className="text-gray-400">(exactly 2 required)</span>
              </label>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  images.length === 2
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {images.length}/2 uploaded
              </span>
            </div>

            <label
              className={`flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed rounded-lg transition ${
                !canAddMore
                  ? "border-gray-200 bg-gray-50 cursor-not-allowed text-gray-400"
                  : "border-blue-300 hover:border-blue-500 hover:bg-blue-50 text-blue-600 cursor-pointer"
              }`}
            >
              <Upload size={18} />
              <span className="text-sm">
                {!canAddMore ? "2 images uploaded" : "Click to upload images"}
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                disabled={!canAddMore}
                onChange={handleFileChange}
              />
            </label>

            {errors.images && (
              <p className="text-xs text-red-500 mt-1">{errors.images}</p>
            )}
          </div>

          {/* Image Previews */}
          {images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50"
                >
                  <div className="flex items-center gap-1 p-3 border-b border-gray-200 bg-white flex-wrap">
                    <span className="text-xs text-gray-500 mr-2">
                      Image {index + 1}
                      {img.isExisting && (
                        <span className="ml-1 text-blue-500">(existing)</span>
                      )}
                    </span>
                    <button
                      onClick={() =>
                        updateImage(index, {
                          zoom: Math.min(img.zoom + 0.2, 3),
                        })
                      }
                      className="p-1.5 bg-gray-100 rounded hover:bg-gray-200 transition"
                      title="Zoom in"
                    >
                      <ZoomIn size={14} />
                    </button>
                    <button
                      onClick={() =>
                        updateImage(index, {
                          zoom: Math.max(img.zoom - 0.2, 0.5),
                        })
                      }
                      className="p-1.5 bg-gray-100 rounded hover:bg-gray-200 transition"
                      title="Zoom out"
                    >
                      <ZoomOut size={14} />
                    </button>
                    <button
                      onClick={() =>
                        updateImage(index, { rotation: img.rotation + 90 })
                      }
                      className="p-1.5 bg-gray-100 rounded hover:bg-gray-200 transition"
                      title="Rotate right"
                    >
                      <RotateCw size={14} />
                    </button>
                    <button
                      onClick={() =>
                        updateImage(index, { rotation: img.rotation - 90 })
                      }
                      className="p-1.5 bg-gray-100 rounded hover:bg-gray-200 transition"
                      title="Rotate left"
                    >
                      <RotateCcw size={14} />
                    </button>
                    <button
                      onClick={() => applyTransformations(index)}
                      className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      title="Apply"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={() => removeImage(index)}
                      className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition ml-auto"
                      title="Remove"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div
                    className="w-full bg-black flex items-center justify-center"
                    style={{ aspectRatio: "16/16" }}
                  >
                    <img
                      src={img.preview}
                      alt={`Preview ${index + 1}`}
                      className="transition-transform duration-200 ease-out max-w-full max-h-full object-contain"
                      style={{
                        transform: `scale(${img.zoom}) rotate(${img.rotation}deg)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upload Progress */}
          {uploading && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              disabled={uploading}
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition text-sm font-medium"
            >
              {uploading
                ? `Uploading ${uploadProgress}%`
                : initialData
                  ? "Save Changes"
                  : "Add Room"}
            </button>
            <button
              disabled={uploading}
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Check, Pencil, X } from "lucide-react";

export const TextEdit = ({
  defaultValue,
  handleSubmit,
  canEdit = true,
}: {
  defaultValue: string;
  canEdit?: boolean;
  handleSubmit: (value: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState<string>(defaultValue || "Name");
  const toggleIsEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const onSaveEditedValue = () => {
    handleSubmit(editedValue);
    setEditedValue("");
    toggleIsEditing();
  };
  const onCancelNameEdit = () => {
    toggleIsEditing();
    setEditedValue("");
  };
  return (
    <div className="gap-2 flex items-center w-full">
      <h3 className={`font-semibold text-xl ${isEditing ? "hidden" : ""}`}>{defaultValue || "Name"}</h3>
      <input
        type="text"
        id="name"
        className={`text-xl ${!isEditing ? "hidden" : ""} p-0 font-semibold border-1 border-gray-500`}
        onChange={(e) => setEditedValue(e.target.value)}
        value={!!editedValue ? editedValue : defaultValue || "Name"}
      />
      {!isEditing && canEdit && (
        <button onClick={toggleIsEditing}>
          <Pencil size={20} />
        </button>
      )}
      {isEditing && (
        <div className="flex gap-2">
          <button onClick={onSaveEditedValue}>
            <Check size={20} />
          </button>
          <button onClick={onCancelNameEdit}>
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

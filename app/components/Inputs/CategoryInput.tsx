"use client";
import { FieldValues, useForm } from "react-hook-form";
import { IconType } from "react-icons";

interface CategoryInputProps {
  selected: boolean;
  icon: IconType;
  label: string;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = function ({
  selected,
  icon: Icon,
  label,
  onClick,
}) {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex items-center gap-3 hover:border-black transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-200"
      }`}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;

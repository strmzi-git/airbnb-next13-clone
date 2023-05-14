"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = function ({
  title,
  subtitle,
  value,
  onChange,
}) {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const takeOne = useCallback(() => {
    if (value > 1) {
      onChange(value - 1);
    }
  }, [onChange, value]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <p className="font-medium">{title}</p>
        <p className="font-light text-gray-600">{subtitle}</p>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          className="h-10 w-10 flex items-center justify-center rounded-full border-[1px] border-neutral-400 cursor-pointer hover:opacity-80 text-neutral-600"
          onClick={takeOne}
        >
          <AiOutlineMinus />
        </div>
        <div>{value}</div>
        <div
          className="h-10 w-10 flex items-center justify-center rounded-full border-[1px] border-neutral-400 cursor-pointer hover:opacity-80 text-neutral-600"
          onClick={onAdd}
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;

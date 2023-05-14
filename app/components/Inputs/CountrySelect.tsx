"use client";
import Select from "react-select";
import { useCountries } from "../../hooks/useCountries";

export type CountrySelectValue = {
  flag: string;
  label: string;
  value: string;
  region: string;
  latlng: number[];
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = function ({
  value,
  onChange,
}) {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        options={getAll()}
        isClearable={true}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex gap-2">
            {option.flag}
            <div className="flex items-center">
              {option.label},
              <span className="text-neutral-500 ml-1"> {option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
            primary50: "#ffd4d9",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;

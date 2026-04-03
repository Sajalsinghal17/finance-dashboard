import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const CustomSelect = ({ value, setValue, options }) => {
  return (
    <div className="relative w-36">
      <Listbox value={value} onChange={setValue}>
        
        <Listbox.Button className="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border shadow-sm flex justify-between items-center hover:shadow-md transition">
          {value}
          <ChevronDown size={16} />
        </Listbox.Button>

        <Listbox.Options className="absolute mt-2 w-full bg-white dark:bg-gray-800 border rounded-xl shadow-lg z-50 overflow-hidden">
          {options.map((opt) => (
            <Listbox.Option
              key={opt}
              value={opt}
              className="px-3 py-2 cursor-pointer hover:bg-indigo-500 hover:text-white transition"
            >
              {opt}
            </Listbox.Option>
          ))}
        </Listbox.Options>

      </Listbox>
    </div>
  );
};

export default CustomSelect;
"use client";

export const TextInput = ({
  placeholder,
  onChange,
  label,
}: {
  placeholder: string;
  onChange: (value: string) => void;
  label: string;
}) => {
  return (
    <div className="pt-2">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50">
        {label}
      </label>
      <input
        onChange={(e) => onChange(e.target.value)}
        type="text"
        id="first_name"
        className="bg-gray-50 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 text-gray-900 dark:text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
      />
    </div>
  );
};

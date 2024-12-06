import {Eye, EyeOff} from "lucide-react";
import {useState} from "react";

const InputField = ({ label, type = "text", value, onChange, options, error, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        {type !== "select" ? (
          <input
            type={inputType}
            value={value}
            onChange={onChange}
            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm
              ${error ? 'border-red-300' : 'border-gray-300'}`}
            {...props}
          />
        ) : (
          <select className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                  ${error ? 'border-red-300' : 'border-gray-300'}`}
                  onChange={onChange}
                  {...props}
                  >
            <option value="select">선택</option>
            {options.map((option) => (
              <option key={option} value={option} selected={value === option}>{option}</option>
            ))}
          </select>
        )
        }
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default InputField;
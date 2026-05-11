// components/ui/FormField.jsx

export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  isTextArea = false,
  className = "",
}) {
  return (
    <div className={`relative mt-3 ${className}`}>
      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder=" "
          rows={4}
          className={`peer w-full px-4 py-3 text-[15px] rounded-xl bg-[#f9f9f9] text-[#011632]
            outline-none resize-none transition-all duration-200 border
            focus:bg-white focus:shadow-sm
            ${error
              ? "border-red-400 focus:border-red-500"
              : "border-gray-200 focus:border-[#E68736]"
            }`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder=" "
          className={`peer w-full px-4 py-3 text-[15px] rounded-xl bg-[#f9f9f9] text-[#011632]
            outline-none transition-all duration-200 border
            focus:bg-white focus:shadow-sm
            ${error
              ? "border-red-400 focus:border-red-500"
              : "border-gray-200 focus:border-[#E68736]"
            }`}
        />
      )}

      {/* Floating Label */}
      <label
        htmlFor={name}
        className={`
          absolute left-3 px-1 bg-transparent pointer-events-none
          transition-all duration-200 ease-in-out
          ${isTextArea
            ? `top-[14px] text-[15px] text-gray-400
               peer-focus:-top-2.5 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:tracking-wide peer-focus:bg-white
               peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-[11px]
               peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:tracking-wide
               peer-[:not(:placeholder-shown)]:bg-white`
            : `top-1/2 -translate-y-1/2 text-[15px] text-gray-400
               peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:tracking-wide peer-focus:bg-white
               peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2
               peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-semibold
               peer-[:not(:placeholder-shown)]:tracking-wide peer-[:not(:placeholder-shown)]:bg-white`
          }
          ${error
            ? "peer-focus:text-red-500 peer-[:not(:placeholder-shown)]:text-red-500"
            : "peer-focus:text-[#E68736] peer-[:not(:placeholder-shown)]:text-[#E68736]"
          }
        `}
      >
        {label}
      </label>

      {error && (
        <span className="flex items-center gap-1 mt-1 text-[12px] text-red-500">
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}
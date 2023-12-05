import React, { ChangeEvent, KeyboardEvent } from 'react';

interface TextAreaProps {
  id: string;
  label?: string;
  name?: string;
  value: string;
  placeholder?: string;
  className?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyUp: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  cols?: number;
  autoFocus?: boolean;
}

const TextAreaInput: React.FC<TextAreaProps> = ({
  id,
  label,
  name,
  value,
  className,
  placeholder,
  onChange,
  onKeyUp,
  rows = 1,
  cols = 1,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event);
    const textarea = document.querySelector('textarea');
    // Set the height of the textarea to its scrollHeight
    textarea?.style.setProperty('height', 'auto'); // Reset the height to auto to prevent scrollHeight limitation
    textarea?.style.setProperty('height', `${textarea?.scrollHeight}px`);
  };

  return (
    <>
      <div className="text-container">
        <label htmlFor={id}>{label}</label>
        <textarea
          id={id}
          className={className}
          name={name}
          value={value}
          onChange={handleInputChange}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
          rows={rows}
          cols={cols}
          style={{
            minHeight: `${rows * 1.5}em`,
            maxHeight: `${rows * 20}em`,
            borderRadius: '10px',
            margin: '1rem',
            padding: '1rem',
          }}
        />
      </div>
    </>
  );
};

export default TextAreaInput;

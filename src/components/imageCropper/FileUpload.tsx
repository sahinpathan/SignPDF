import React, { useRef, ChangeEvent } from 'react';

interface FileUploadProps {
  onSelectFile: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onSelectFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      onSelectFile(file);
    }
  };

  return (
    <>
      <div
        style={{
          width: 200,
          height: 200,
          border: '2px dashed #ccc',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          position: 'relative',
        }}
        onClick={handleClick}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <span
          style={{
            position: 'absolute',
            fontSize: 40,
          }}
        >
          +
        </span>
      </div>
    </>
  );
};

export default FileUpload;

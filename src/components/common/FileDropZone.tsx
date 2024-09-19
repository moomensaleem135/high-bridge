'use client';

import React, { MouseEvent, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { cn } from '@/lib/cn';
import { formatFileSize } from '@/lib/helpers';

interface FileDropzoneProps {
  onFileUpload: (file: File) => void;
  error?: string | null; // Accept error prop
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileUpload, error }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null); // State to hold the uploaded file

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        // Validation: Check if the file is not empty
        if (file.size === 0) {
          return; // Early return on invalid file
        }

        // Validation: Check if the file type is supported
        const validFileTypes = [
          'image/svg+xml',
          'image/png',
          'image/jpeg',
          'image/gif',
        ];
        if (!validFileTypes.includes(file.type)) {
          return; // Early return on invalid file type
        }

        setUploadedFile(file);
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadedFile(null); // Clear the uploaded file
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/svg+xml': [],
      'image/png': [],
      'image/jpeg': [],
      'image/gif': [],
    },
    maxFiles: 1,
    maxSize: 1024 * 1024, // Max size in bytes
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'bg-accent rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer w-full',
        { 'border-2 border-dashed border-blue-500': isDragActive }
      )}
    >
      <input {...getInputProps()} data-cy="event-image" />
      {uploadedFile ? (
        <div className="relative">
          <img
            src={URL.createObjectURL(uploadedFile)}
            alt="Uploaded file preview"
            className="rounded-lg"
            width={100}
            height={100}
          />
          <button
            onClick={handleDelete}
            className="absolute flex items-center justify-center w-6 h-6 -top-2 -right-2 bg-red-600 text-background rounded-full"
            aria-label="Delete uploaded file"
          >
            &times;
          </button>
          <p className="text-sm text-right pt-2 text-accent">
            size: {formatFileSize(uploadedFile.size)}
          </p>
        </div>
      ) : (
        <>
          <p className="text-center text-sm text-subheadingColor">
            <span className="font-extrabold cursor-pointer underline">
              Click to upload
            </span>{' '}
            or drag and drop
          </p>
          <p className="text-center text-xs text-subheadingColor mt-1">
            SVG, PNG, JPG or GIF (recommended size 1024 x 1024px)
          </p>
        </>
      )}
      {error && (
        <p className="text-red-600 text-center mt-2">{error}</p> // Display error from form
      )}
    </div>
  );
};

export default FileDropzone;

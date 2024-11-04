import React, { useState } from 'react';
import { Modal } from './Modal';


interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string, text?: string) => void;
  initialText?: string;
}

export const LinkModal: React.FC<LinkModalProps> = ({ isOpen, onClose, onSubmit, initialText }) => {
  const [url, setUrl] = useState('');
  const [text, setText] = useState(initialText || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(url, text);
    setUrl('');
    setText('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Link">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="https://example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700">
            Text
          </label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Link text"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Add Link
          </button>
        </div>
      </form>
    </Modal>
  );
};
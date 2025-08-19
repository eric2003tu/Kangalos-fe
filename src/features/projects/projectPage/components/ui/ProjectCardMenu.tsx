"use client";

import { useEffect, useRef } from "react";
import { Edit3, Trash2, X } from "lucide-react";
import Link from "next/link";

interface ProjectCardMenuProps {
  onUpdate: () => void;
  onDelete: () => void;
  onClose: () => void;
  className?: string;
  projectid?: number;
}

export function ProjectCardMenu({
  onUpdate,
  onDelete,
  onClose,
  className = "",
  projectid
}: ProjectCardMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    
    // Focus trap for accessibility
    const firstFocusableElement = menuRef.current?.querySelector('button');
    firstFocusableElement?.focus();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className="fixed inset-0 z-20 bg-black/20 opacity-0 animate-in fade-in duration-200 sm:hidden"
        onClick={onClose}
      />
      
      {/* Menu Container */}
      <div
        ref={menuRef}
        role="menu"
        aria-label="Project options"
        className={`
          absolute right-6 top-10 z-30 w-56 bg-white rounded-lg shadow-xl 
          border border-gray-200/80 py-2 backdrop-blur-sm
          animate-in slide-in-from-top-2 fade-in duration-200 ease-out
          ${className}
        `}
        style={{
          boxShadow: '0 10px 38px -10px rgba(22, 23, 24, 0.35), 0 10px 20px -15px rgba(22, 23, 24, 0.2)',
        }}
      >
        {/* Close button for mobile accessibility */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100 sm:hidden">
          <span className="text-sm font-medium text-gray-900">Options</span>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="py-1">
          <Link href={`/dashboard/projectPage/${projectid}/edit-project`}>
          <button
            role="menuitem"
            onClick={(e) => {
              e.stopPropagation();
              onUpdate();
            }}
            className="
              group flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 
              hover:bg-blue-100 hover:text-blue-700 transition-all duration-150 ease-out
              focus:outline-none focus:bg-blue-50 focus:text-blue-700
              active:bg-blue-100 cursor-pointer
            "
          >
            <Edit3 className="h-4 w-4 text-gray-700 group-hover:text-blue-600 group-focus:text-blue-600 transition-colors" />
            <span className="font-medium">Update Project</span>
          </button>
          </Link>
          
          {/* Divider */}
          <div className="my-1 border-t border-gray-100" />
          
          <button
            role="menuitem"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="
              group flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 
              hover:bg-red-100 hover:text-red-700 transition-all duration-150 ease-out
              focus:outline-none focus:bg-red-50 focus:text-red-700
              active:bg-red-100 cursor-pointer
            "
          >
            <Trash2 className="h-4 w-4 text-gray-400 group-hover:text-red-600 group-focus:text-red-600 transition-colors" />
            <span className="font-medium">Delete Project</span>
          </button>
        </div>

        {/* Visual enhancement: subtle gradient overlay */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
      </div>
    </>
  );
}
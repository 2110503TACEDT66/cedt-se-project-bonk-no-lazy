'use client'

import { useCallback } from "react";

interface DeleteButtonProps {
    onClick?:()=>void;
    onAction?: (id:string ) => void;
    actionId:string,
    label?:string,
    action?:string,
  }

const OptionButton:React.FC<DeleteButtonProps>=({
    onAction,
    actionId,
    label,
    action,
    onClick
}) =>{
    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
          
            onAction?.(actionId)

      }, [ onAction, actionId]);
    return (
        <button onClick={onAction ? handleCancel : onClick}
        className={"inline-flex items-center m-1 px-2 py-1 bg-white transition ease-in-out delay-20 text-sm font-medium " +
        (action === "update"
          ? "hover:bg-green-100 text-green-600 ring-green-600 ring-inset-1 ring-2 rounded-md"
          : "hover:bg-rose-100 text-red-600 ring-red-600 ring-inset-1 rounded-md ring-2")
      }
      
>
  <svg
    stroke="currentColor"
    viewBox="0 0 24 24"
    fill="none"
    className="h-5 w-5 mr-2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      stroke-width="2"
      stroke-linejoin="round"
      stroke-linecap="round"
    ></path>
  </svg>
  {label}
</button>

    )
};

export default OptionButton;
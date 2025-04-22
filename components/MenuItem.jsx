import React from "react";

export default function MenuItem({
  Icon,
  Title,
  onClickFunction,
  ExtraStyles,
}) {
  return (
    <div
      className={`flex mb-2 w-80 place-items-center ${ExtraStyles} mr-2 bg-gray-800 flex-wrap p-2 rounded-lg shadow-lg hover:cursor-pointer`}
      onClick={onClickFunction}
    >
      <Icon className="text-slate-100 h-7 w-7 focus:h-5" />
      <h3 className="text-slate-100 pl-2">{Title}</h3>
    </div>
  );
}

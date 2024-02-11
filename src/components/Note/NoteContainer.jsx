import React from "react";

const NoteContainer = ({ color, note, date, title, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{ backgroundColor: color ? color : "#EFD080" }}
            className="w-[15em] h-[15em] rounded-[1.25em] relative p-[1.25em] hover:shadow-lg hover:scale-105 duration-200">
            <p className="font-semibold text-[1.25em]">{title}</p>
            <p className="leading-[120%] max-h-[9.5em] line-clamp-5 mt-[1.25em]">
                {note}
            </p>
            <p className="text-[0.875em] absolute bottom-[1.25em] left-[1.25em] opacity-35">
                {date ? date : "27 May, 2021"}
            </p>
        </div>
    );
};

export default NoteContainer;

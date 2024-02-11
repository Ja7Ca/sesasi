import React, { useState } from "react";
import { usePostNoteMutation } from "../../store/features/note/noteSlice";
import Swal from "sweetalert2";

const colors = ["#EFD080", "#F5A375", "#D2AEF5", "#9CEBF0", "#B9F18D"];

const NoteForm = () => {
    const [kirim] = usePostNoteMutation();

    const [hover, setHover] = useState(false);
    const [colorActive, setColorActive] = useState("");
    const [formNote, setFormNote] = useState({
        title: "",
        description: "",
    });

    const onChange = (e) => {
        e.preventDefault();
        setFormNote({ ...formNote, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (formNote.title && formNote.description) {
            kirim({ title: formNote.title, note: formNote.description })
                .unwrap()
                .then(() => {
                    window.location.reload();
                    Swal.fire({
                        icon: "success",
                        title: "Tambah Notes Berhasil",
                        text: "",
                    });
                })
                .catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Gagal Menambahkan Note",
                        text: "Somthing is wrong",
                    });
                });
        } else {
            Swal.fire({
                icon: "warning",
                title: "Tambah Notes Gagal",
                text: "data tidak boleh kosong",
            });
        }
    };

    return (
        <form>
            <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="w-[15em] h-[15em] rounded-[1.25em] relative p-[1.25em] hover:shadow-lg hover:scale-105 duration-200 border"
                style={{
                    backgroundColor: colorActive ? colorActive : "white",
                    borderColor: colorActive
                        ? colorActive
                        : "rgb(229, 231, 235)",
                }}>
                <input
                    name="title"
                    value={formNote.title}
                    onChange={onChange}
                    className="font-semibold text-[1.25em] w-full max-w-[200px] bg-transparent"
                    placeholder="Title"
                />
                <textarea
                    name="description"
                    value={formNote.description}
                    onChange={onChange}
                    className="mt-[1.25em] max-h-[6.25em] p-0 w-full max-w-[200px] border-0 bg-transparent"
                    placeholder="Description...."></textarea>
                <div className="absolute bottom-[1.25em] l-[1.25em] w-full flex gap-[.5em]">
                    {colors.map((color) => (
                        <div
                            onClick={() => setColorActive(color)}
                            key={color}
                            className="w-[1.25em] h-[1.25em] rounded-full cursor-pointer hover:scale-110 duration-200 shadow-md"
                            style={{ backgroundColor: color }}></div>
                    ))}
                </div>
                <div
                    onClick={onSubmit}
                    className={`absolute bottom-[1.25em] right-[1.25em] w-[2em] h-[2em] rounded-full bg-black flex justify-center items-center hover:rotate-90 duration-200 hover:scale-105 cursor-pointer ${
                        hover ? "opacity-100" : "opacity-0"
                    }`}>
                    <div className="w-[1em] h-[2px] rounded-[1em] bg-white"></div>
                    <div className="w-[1em] h-[2px] rounded-[1em] bg-white absolute rotate-90"></div>
                </div>
            </div>
        </form>
    );
};

export default NoteForm;

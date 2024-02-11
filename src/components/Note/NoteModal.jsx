import React, { useEffect, useState } from "react";
import { Modal, Button } from "flowbite-react";
import pen from "./pen.png";
import {
    usePutNoteMutation,
    useDeleteNoteMutation,
} from "../../store/features/note/noteSlice";
import Swal from "sweetalert2";

const NoteModal = ({ modal, onClose, data }) => {
    const [editNote] = usePutNoteMutation();
    const [deleteNote] = useDeleteNoteMutation();

    const [mode, setMode] = useState("readonly");
    const [error, setError] = useState("");
    const [dataOpen, setDataOpen] = useState({
        id: "",
        title: "",
        note: "",
    });

    const onChange = (e) => {
        e.preventDefault();
        if (mode === "edit") {
            setError("");
            setDataOpen({
                ...dataOpen,
                [e.target.name]: e.target.value,
            });
        } else {
            setError("You must be mode edit, click button pen");
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (dataOpen.id && dataOpen.title && dataOpen.note) {
            editNote({
                id: dataOpen.id,
                title: dataOpen.title,
                note: dataOpen.note,
            })
                .unwrap()
                .then((result) => {
                    window.location.reload();
                    Swal.fire({
                        icon: "success",
                        title: "Update Notes Berhasil",
                        text: "",
                    });
                })
                .catch((result) => {
                    Swal.fire({
                        icon: "error",
                        title: "Gagal Mengubah Note",
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

    const onDelete = () => {
        deleteNote({
            id: dataOpen.id,
        })
            .unwrap()
            .then((result) => {
                window.location.reload();
                Swal.fire({
                    icon: "success",
                    title: "Delete Notes Berhasil",
                    text: "",
                });
            })
            .catch((result) => {
                Swal.fire({
                    icon: "error",
                    title: "Gagal Delete Note",
                    text: "Somthing is wrong",
                });
            });
    };

    useEffect(() => {
        setDataOpen({
            id: data?.note_id,
            title: data?.title,
            note: data?.note,
        });
    }, [data]);

    return (
        <Modal
            show={modal}
            onClose={() => {
                setMode("readonly");
                onClose();
            }}>
            <Modal.Header
                style={{
                    backgroundColor: data?.color ? data.color : "#EFD080",
                }}>
                <input
                    value={dataOpen.title}
                    name="title"
                    onChange={onChange}
                    className={`border-0 bg-transparent w-full`}
                />
            </Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <textarea
                        className="text-base leading-relaxed text-gray-500 dark:text-gray-400 w-full border-0 p-0"
                        name="note"
                        onChange={onChange}
                        value={dataOpen?.note}></textarea>
                </div>
                <div className="flex justify-between items-center">
                    <p style={{ color: "red" }}>{error ? error : ""}</p>
                    <div
                        onClick={() => {
                            setError("");
                            setMode("edit");
                        }}
                        className={`bg-black w-[2em] h-[2em] rounded-full left-auto cursor-pointer duration-200 hover:scale-105 flex items-center justify-center
                } ${mode === "edit" ? "hidden" : ""}`}>
                        <img src={pen} alt="Pen" />
                    </div>
                    <div
                        className={`flex gap-[1em] ${
                            mode === "edit" ? "" : "hidden"
                        }`}>
                        <Button color="blue" onClick={onSubmit}>
                            Edit
                        </Button>
                        <Button
                            color="failure"
                            onClick={() => {
                                Swal.fire({
                                    icon: "warning",
                                    title: `Yakin untuk note ${dataOpen?.title}`,
                                    showCancelButton: true,
                                    confirmButtonText: "Delete",
                                    confirmButtonColor: "red",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        onDelete();
                                    }
                                });
                            }}>
                            Hapus
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default NoteModal;

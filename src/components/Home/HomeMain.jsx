import React, { useEffect, useState } from "react";
import NoteContainer from "../Note/NoteContainer";
import NoteModal from "../Note/NoteModal";
import NoteForm from "../Note/NoteForm";
import { useGetAllNoteQuery } from "../../store/features/note/noteSlice";

const HomeMain = () => {
    const [modal, setModal] = useState(false);
    const [dataNote, setDataNote] = useState([]);

    const [dataModal, setDataModal] = useState({
        color: "",
        title: "",
        note: "",
        date: "",
    });

    const closeModal = () => {
        setModal(false);
    };

    const openModal = (note) => {
        setDataModal(note);
        setModal(true);
    };

    const { data: notes, isSuccess } = useGetAllNoteQuery(
        {},
        { refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        if (notes?.notes) {
            setDataNote(notes.notes);
        }
    }, [notes]);

    return (
        <div className="py-[5em] w-full text-left">
            <div className="container">
                <h1 className="text-[2em] font-semibold">Notes</h1>
                <div className="grid grid-cols-4 gap-[1.25em] mt-[2.5em]">
                    <NoteForm />
                    {dataNote?.map((note, index) => {
                        return (
                            <NoteContainer
                                key={index}
                                onClick={() => {
                                    openModal(note);
                                }}
                                modal={modal}
                                closeModal={closeModal}
                                color={note.color}
                                title={note.title}
                                note={note.note}
                                date={note.date}
                            />
                        );
                    })}
                </div>
                <NoteModal
                    modal={modal}
                    onClose={closeModal}
                    data={dataModal}
                />
            </div>
        </div>
    );
};

export default HomeMain;

import React, { useEffect, useState } from "react";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import { usePutUserMutation } from "../../store/features/user/userSlice";
import Swal from "sweetalert2";

const UserModal = ({ openModal, onClose, data }) => {
    const [editUser] = usePutUserMutation();

    const [dataOpen, setDataOpen] = useState({
        id: "",
        name: "",
        user: "",
        pass: "",
    });

    const onChange = (e) => {
        e.preventDefault();
        setDataOpen({
            ...dataOpen,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (dataOpen.name && dataOpen.user && dataOpen.pass) {
            editUser(dataOpen)
                .unwrap()
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Success Updata User",
                    });
                    window.location.reload();
                })
                .catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Gagal Updata User",
                        text: "Something went wrong",
                    });
                });
        } else {
            Swal.fire({
                icon: "error",
                title: "Gagal Delete Note",
                text: "Somthing is wrong",
            });
        }
    };

    useEffect(() => {
        setDataOpen({
            id: data?.id,
            name: data?.name,
            user: data?.name,
        });
    }, [data, openModal]);

    return (
        <Modal show={openModal} onClose={onClose}>
            <Modal.Header>Info Account</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Account name" />
                        </div>
                        <TextInput
                            id="name"
                            name="name"
                            value={dataOpen.name}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="user" value="Account user" />
                        </div>
                        <TextInput
                            id="user"
                            name="user"
                            value={dataOpen.user}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="pass" value="Account pass" />
                        </div>
                        <TextInput
                            id="pass"
                            name="pass"
                            type="password"
                            value={dataOpen.pass}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className={`flex justify-end`}>
                        <Button color="blue" onClick={onSubmit}>
                            Edit
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default UserModal;

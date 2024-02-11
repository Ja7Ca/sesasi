import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    Button,
} from "flowbite-react";
import { useGetAllUserQuery } from "../../store/features/user/userSlice";
import UserModal from "./UserModal";
import Swal from "sweetalert2";
import { useDeleteUserMutation } from "../../store/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/Auth";

const UserMain = () => {
    const navigate = useNavigate();
    const [singleUser, setSingleUser] = useState(true);
    const [allUser, setAllUser] = useState([]);
    const [deleteuser] = useDeleteUserMutation();
    const { data: users } = useGetAllUserQuery(
        {},
        { refetchOnMountOrArgChange: true }
    );

    const [openModal, setOpenModal] = useState(false);
    const [dataModal, setDataModal] = useState({});

    const onClose = () => {
        setOpenModal(false);
    };

    const onDelete = (id, user) => {
        Swal.fire({
            icon: "warning",
            title: `Yakin untuk user ${user}`,
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: "red",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteuser({ id })
                    .unwrap()
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Success Delete User",
                        });
                        if (singleUser) {
                            Auth.signOut();
                            navigate("/login");
                        } else {
                            window.location.reload();
                        }
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: "error",
                            title: "Gagal Delete User",
                            text: "Something went wrong",
                        });
                    });
            }
        });
    };

    useEffect(() => {
        if (users?.user) {
            return setAllUser([users.user]);
        } else if (users?.users) {
            setSingleUser(false);
            return setAllUser(users.users);
        }
    }, [users]);

    return (
        <div className="py-[5em] w-full text-left">
            <div className="container">
                <h1 className="text-[2em] font-semibold">User</h1>
                <div className="overflow-x-auto mt-[5em]">
                    <Table>
                        <TableHead>
                            <TableHeadCell>Username</TableHeadCell>
                            <TableHeadCell>Name</TableHeadCell>
                            <TableHeadCell>
                                <span className="sr-only">Edit</span>
                            </TableHeadCell>
                        </TableHead>
                        <TableBody className="divide-y">
                            {allUser?.map((user) => (
                                <TableRow key={user}>
                                    <TableCell>{user.user}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>
                                        <div
                                            className={`flex items-center gap-[1em] justify-end ${
                                                user?.id == 1 ? "hidden" : ""
                                            }`}>
                                            <Button
                                                color="blue"
                                                onClick={() => {
                                                    setDataModal(user);
                                                    setOpenModal(true);
                                                }}>
                                                Edit
                                            </Button>
                                            <Button
                                                color="failure"
                                                onClick={() => {
                                                    onDelete(
                                                        user.id,
                                                        user.name
                                                    );
                                                }}>
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <UserModal
                        openModal={openModal}
                        onClose={onClose}
                        data={dataModal}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserMain;

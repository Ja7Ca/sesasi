import React, { useState } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

import { useRegisterMutation } from "../../store/features/auth/authSlice";
import Swal from "sweetalert2";

const RegisterMain = () => {
    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        username: "",
        password: "",
    });

    const onChange = (e) => {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (form.username && form.password && form.name) {
            await register(form)
                .unwrap()
                .then((res) => {
                    navigate("/login");
                    Swal.fire({
                        icon: "success",
                        title: "Register Berhasil",
                        text: "Silahkan Login",
                    });
                    return res;
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Register Gagal",
                        text: "User sudah digunakan",
                    });
                    return err;
                });
        } else {
            Swal.fire({
                icon: "warning",
                title: "Register Login",
                text: "User atau password tidak boleh kosong",
            });
        }
    };

    return (
        <section className="flex justify-center items-center h-[900px] max-h-[100vh]">
            <div className="container">
                <Card className="max-w-sm mx-auto">
                    <form className="flex flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Your Name" />
                            </div>
                            <TextInput
                                name="name"
                                type="name"
                                value={form.name}
                                onChange={onChange}
                                placeholder="name"
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="username" value="Your user" />
                            </div>
                            <TextInput
                                name="username"
                                type="username"
                                value={form.username}
                                onChange={onChange}
                                placeholder="username"
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="password1"
                                    value="Your password"
                                />
                            </div>
                            <TextInput
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <Link to="/login">Have Account?</Link>
                        <Button type="submit" onClick={onSubmit}>
                            Register
                        </Button>
                    </form>
                </Card>
            </div>
        </section>
    );
};

export default RegisterMain;

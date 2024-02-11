import React, { useState } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../store/features/auth/authSlice";
import Swal from "sweetalert2";

const LoginMain = () => {
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const onChange = (e) => {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (form.username && form.password) {
            await login(form)
                .unwrap()
                .then((res) => {
                    navigate("/dashboard");
                    Swal.fire({
                        icon: "success",
                        title: "Login Berhasil",
                        text: "Selamat Datang",
                    });
                    return res;
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Login Gagal",
                        text: "User dan Pass Salah",
                    });
                    return err;
                });
        } else {
            Swal.fire({
                icon: "warning",
                title: "Gagal Login",
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
                                <Label htmlFor="email1" value="Your email" />
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
                        <Link to="/register">Don't Have Account?</Link>
                        <Button type="submit" onClick={onSubmit}>
                            Login
                        </Button>
                    </form>
                </Card>
            </div>
        </section>
    );
};

export default LoginMain;

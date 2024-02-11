import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { useLogoutMutation } from "../../store/features/auth/authSlice";

const colors = ["#EFD080", "#F5A375", "#D2AEF5", "#9CEBF0", "#B9F18D"];

const Sidebar = () => {
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    const onLogout = () => {
        logout()
            .unwrap()
            .then(() => {
                navigate("/login");
            });
    };
    return (
        <div className="flex h-full">
            <div className="px-[1em] py-[5em] flex flex-col items-center h-full sticky top-0">
                <Link
                    to="/"
                    className="w-[2.5em] h-[2.5em] rounded-full bg-black relative flex justify-center items-center hover:rotate-90 duration-200 hover:scale-105 cursor-pointer">
                    <div className="w-[1.25em] h-[2px] rounded-[1em] bg-white"></div>
                    <div className="w-[1.25em] h-[2px] rounded-[1em] bg-white absolute rotate-90"></div>
                </Link>
                <div className="flex flex-col items-center gap-[2.5em]">
                    <div className="mt-[2.5em] flex flex-col gap-[1.25em]">
                        {colors.map((color) => (
                            <div
                                key={color}
                                style={{ backgroundColor: color }}
                                className={`w-[1.25em] h-[1.25em] rounded-full duration-200 hover:scale-105 cursor-pointer`}></div>
                        ))}
                    </div>
                    <Dropdown label="Account" dismissOnClick={false}>
                        <Dropdown.Item>
                            <Link to={"/user"}>User</Link>
                        </Dropdown.Item>
                        <Dropdown.Item
                            className="text-red-600"
                            onClick={onLogout}>
                            Log Out
                        </Dropdown.Item>
                    </Dropdown>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Sidebar;

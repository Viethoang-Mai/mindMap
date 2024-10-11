"use client";
import Link from "next/link";
import style from "./header.module.css";
import { useState } from "react";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
export default function Header() {
    const { user, error, isLoading } = useUser();
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const active = (path) => {
        return pathname === path
            ? style["nav-link-active"]
            : "hover:bg-[#d1d9e96a]";
    };
    const handleClick = () => {
        setOpen(!open);
    };
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <header className="header py-5">
            <div className="w-full px-10 max-lg:px-5 max-md:px-20 h-20 mx-auto flex justify-between items-center">
                <h1 className="font-semibold text-[#4f46e5] text-2xl">
                    <Link href="/">Mindmap Flow</Link>
                </h1>
                <span
                    className={clsx(
                        "overlay bg-[#d1d9e95a]  fixed top-0 left-0 w-full h-screen z-10",
                        open ? "max-md:block" : "hidden"
                    )}
                    onClick={handleClick}
                ></span>
                <button
                    className="max-md:block hidden border border-[#4f46e5] px-2 py-1 rounded active:bg-[#4f46e5] focus:outline-none focus:ring"
                    onClick={handleClick}
                >
                    <i className="fa-solid fa-bars"></i>
                </button>
                <nav
                    className={clsx(
                        "nav gap-4 items-center flex max-md:flex-col max-md:border border-[#4f46e5fa] max-md:bg-[#e0e7fff0] max-md:bg-[#e0e7fff0] max-md:rounded-md max-md:fixed max-md:top-0 max-md:left-0 max-md:z-20 max-md:h-screen max-md:w-1/2 max-md:px-5 max-md:py-10 ",
                        open
                            ? "max-md:translate-x-0"
                            : "max-md:-translate-x-[101%]",
                        "transition-transform duration-300 ease-in-out"
                    )}
                >
                    <Link
                        href="/"
                        className={clsx(style["nav-link"], active("/"))}
                    >
                        Trang chủ
                    </Link>
                    <Link
                        href="/about "
                        className={clsx(style["nav-link"], active("/about"))}
                    >
                        Giới thiệu
                    </Link>
                    <Link
                        href="/features"
                        className={clsx(style["nav-link"], active("/features"))}
                    >
                        Tính năng
                    </Link>
                    <Link
                        href="/price "
                        className={clsx(style["nav-link"], active("/price"))}
                    >
                        Bảng giá
                    </Link>
                    <Link
                        href="/contact"
                        className={clsx(style["nav-link"], active("/contact"))}
                    >
                        Liên hệ
                    </Link>
                    {user && (
                        <p className="text-primary">
                            Hi, {user.name || user.nickname}
                        </p>
                    )}

                    <a
                        href={user ? "/my-Mindmap" : "/api/auth/login"}
                        className={clsx(
                            style["nav-action"],
                            "hover:bg-[#c3c1f579]"
                        )}
                    >
                        {user ? " Mind Map" : "Đăng nhập"}
                    </a>

                    <a
                        href={user ? "/api/auth/logout" : "/api/auth/login"}
                        className={clsx(
                            style["nav-action"],
                            style["sign-up"],
                            "hover:bg-[#c3c1f579]"
                        )}
                    >
                        {user ? "Đăng xuất" : "Đăng ký"}
                    </a>
                </nav>
            </div>
        </header>
    );
}

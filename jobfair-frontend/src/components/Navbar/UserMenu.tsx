'use client'

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar"
import MenuItem from "../navbar/MenuItem"
import { useState, useCallback, useRef } from "react"
import LoginModal from "../modals/LoginModal"
import useLoginModal from "@/hooks/useLoginModal"
import useRegisterModal from "@/hooks/useRegisterModal"
import useOnClickOutside from "@/hooks/useOnClickOutside"

interface UserMenuProps {
    currentUser?: UserJSON | null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])

    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);

    const ref = useRef<HTMLDivElement>(null);
    const toggleButtonRef = useRef<HTMLDivElement>(null)

    useOnClickOutside(ref, (event) => {
        // Check if the click occurred outside of the modal and not on the toggle button
        if (!toggleButtonRef.current || !toggleButtonRef.current.contains(event.target as Node)) {
            closeMenu();
        }
    });

    
    return(
        <div
            className="
                relative
            "
        >
            <div
                className="
                    flex
                    flex-row
                    items-center
                    gap-3
                "
            >
                <div
                    onClick={() => {}}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                    "
                >
                    Book an interview
                </div>
                <div
                    onClick={toggleOpen}
                    className="
                        p-46
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    "

                    ref={toggleButtonRef}
                >
                    <AiOutlineMenu/>
                    <div
                        className="
                            hidden
                            md:block
                        "
                    >
                        <Avatar/>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="
                        absolute
                        rounded-xl
                        shadow-md
                        w-[40vw]
                        md:w-3/4
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                    "

                    ref={ref}
                >
                    <div
                        className="
                            flex
                            flex-col
                            cursor-pointer
                        "
                    >
                        {currentUser ? (
                            <>
                                <MenuItem
                                    onClick={() => {}}
                                    label="My interviews"
                                />
                                <MenuItem
                                    onClick={() => {}}
                                    label="My favourites"
                                />
                                <MenuItem
                                    onClick={() => {}}
                                    label="Book an interview"
                                />
                                <hr />
                                <MenuItem
                                    onClick={() => {}}
                                    label="Sign out"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label="Login"
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label="Sign Up"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu
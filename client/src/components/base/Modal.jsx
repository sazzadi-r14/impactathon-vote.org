import { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "react-spring";

export const Modal = ({ show, onClose, children }) => {
    const [isClosing, setIsClosing] = useState(false);
    const modalRef = useRef();

    const closeBackgroundAnimation = useSpring({
        opacity: isClosing ? 0 : 0.3,
        config: { duration: 300 },
    });

    const closeModalAnimation = useSpring({
        opacity: isClosing ? 0 : 1,
        config: { duration: 300 },
    });

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const closeModal = async () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 300); // Duration should match animation duration
    };

    if (!show) return null;

    return (
        <>
            <animated.div
                style={closeBackgroundAnimation}
                className="fixed top-0 left-0 w-full h-full bg-black backdrop-blur-lg"
            />
            <div className="fixed inset-0 z-10 backdrop-blur-sm" />
            <animated.div
                style={closeModalAnimation}
                className="fixed inset-0 flex items-center justify-center z-20 overflow-y-auto shadow-3xl shadow-zinc-800/50"
            >
                <div
                    className="text-white absolute top-0 right-0 text-xl hover:cursor-pointer"
                    onClick={closeModal}
                >
                    <img src="./icons/cross.png" className="h-8" />
                </div>

                <div className="shadow-3xl shadow-zinc-800/50 border border-zinc-800 rounded-2xl" ref={modalRef}>
                    <div className="shadow-lg shadow-black rounded-2xl">
                        {children}
                    </div>
                </div>
            </animated.div>
        </>
    );
};

import { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import { AuthPopup } from "../../stores/user.store";
import AuthModal from "../auth/AuthModal.jsx";

export default function AuthPopupModal({
  description = "$1 free bet on signup!",
  redirectPath = "/",
}) {
  const [showModal, setShowModal] = useState(AuthPopup.get() == "true");
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    AuthPopup.subscribe(() => {
      const authPopupOn = AuthPopup.get() == "true";
      if (authPopupOn) {
        setShowModal(true);
        setIsClosing(false);
      }
    });
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        console.log("clicked outside");
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const closeBackgroundAnimation = useSpring({
    opacity: isClosing ? 0 : 0.3,
    config: { duration: 300 },
  });

  const closeModalAnimation = useSpring({
    opacity: isClosing ? 0 : 1,
    config: { duration: 300 },
  });

  const closeModal = async () => {
    setIsClosing(true);
    AuthPopup.set("false");
    setTimeout(() => setShowModal(false), 300); // Duration should match animation duration
  };

  if (!showModal) return null;

  return (
    <>
      <animated.div
        style={closeBackgroundAnimation}
        className="fixed top-0 left-0 w-full h-full bg-black backdrop-blur-lg z-20"
        id="background1"
      />
      <div className="fixed inset-0 z-20 backdrop-blur-sm" />
      <animated.div
        style={closeModalAnimation}
        className="fixed inset-0 flex items-center justify-center z-30"
      >
        <div
          className="text-white absolute top-0 right-0 text-xl hover:cursor-pointer"
          onClick={closeModal}
        >
          <img src="./icons/cross.png" className="h-8" />
        </div>
        <div
          className="shadow-3xl shadow-zinc-800/50 border border-zinc-800 rounded-2xl"
          ref={modalRef}
        >
          <div className="shadow-lg shadow-black rounded-2xl">
            <AuthModal
              redirectPath={redirectPath}
              joinButtonText="Sign In"
              googleButtonText="Sign In with Google"
              description={description}
              subDescription={undefined}
              confirmation={undefined}
            />
          </div>
        </div>
      </animated.div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTopBtn = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    setShowButton(window.pageYOffset > 250);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    scroll.scrollToTop();
  };

  return (
    <div
      id="scrollBtn"
      className={showButton ? "visible" : "novisible"}
      onClick={handleClick}
    >
      <KeyboardArrowUpIcon />
    </div>
  );
};

export default ScrollToTopBtn;

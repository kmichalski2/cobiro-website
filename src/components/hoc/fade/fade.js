import React, { useEffect, useState } from "react";

import Classes from "./fade.module.scss"

const Fade = ({ show, children }) => {
  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    shouldRender ? (
      <div
        className={[Classes.fadeWrapper, Classes.fade, show ? Classes.fadeIn : Classes.fadeOut].join(' ')}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    ) : null
  );
};

export default Fade;
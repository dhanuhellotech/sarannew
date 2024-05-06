import React, { useEffect } from "react";

export const useCss = (src) => {
  useEffect(() => {
    const tag = document.createElement("link");
    tag.async = true;
    tag.href = src;
    document.body.appendChild(tag);

    return () => {
      document.body.removeChild(tag);
    };
  }, [src]);
};
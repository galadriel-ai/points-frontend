"use client";

import React from "react";

import Cookies from "js-cookie";

type AuthButtonProps = {
  link: string;
  children: React.ReactNode;
  className: string;
};

const AuthButton: React.FC<AuthButtonProps> = ({
  link,
  children,
  className,
}) => {
  const handleButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const token = Cookies.get("authToken");

    if (token) {
      try {
        const response = await fetch(link, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const redirectUrl = data.redirect_url;
          window.open(redirectUrl, "_blank");
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    } else {
      console.error("Auth token not found");
    }
  };

  return (
    <button onClick={handleButtonClick} className={className}>
      {children}
    </button>
  );
};

export default AuthButton;

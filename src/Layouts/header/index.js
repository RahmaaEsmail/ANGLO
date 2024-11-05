import React, { useState } from "react";
import "./style.css";
import { logOut } from "../../utils/logout";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="header">
      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>
      <div className="profile-container">
        <div className="profile-info" onClick={toggleDropdown}>
          <img
            src={"https://res.cloudinary.com/dbz6ebekj/image/upload/v1730707073/logo_ixkwff.png"}
            style={{ width: "40px" }}
            alt="Profile"
            className="profile-image"
          />
          <span className="profile-name">ANGLO</span>
          {/* <i className="arrow-down"></i> */}
        </div>
        {/* {dropdownOpen && (
          <ul className="dropdown-menu">
           
            <li onClick={()=>logOut()}>Logout</li>
          </ul>
        )} */}
      </div>
    </header>
  );
}

export default Header;

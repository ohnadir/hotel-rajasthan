import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgCloseR, CgMenu } from "react-icons/cg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import auth from "../../firebase.init";
import Loading from "../Share/Loading";
import "./Navbar.css";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [user] = useAuthState(auth);

  
  const logout = () => {
    signOut(auth);
    return <Loading />;
  };
  // navbar style componens
  const Nav = styled.nav`
    .navbar-list {
      display: flex;
      li {
        list-style: none;
        .navbar-link {
          &:link,
          &:visited {
            display: inline-block;
            text-decoration: none;
            font-size: 20px;
            font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
            font-weight: bold;
            color: #ffff;
            transition: color 0.3s linear;
            padding: 16px;
          }
          &:hover,
          &:active {
            color: #F0FFFF;
          }
        }
      }
    }

    .mobile-navbar-btn {
      display: none;

      .close-outline {
        display: none;
      }
    }
    .mobile-navbar-btn[name="close-outline"] {
      display: none;
    }

    @media only screen and (max-width: 765px) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 999;
        border: #ff0000;
        .mobile-nav-icon {
          font-size: 30px;
          color: #ffff;
        }
      }
      .navbar-list {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #4158D0;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
        text-align: center;
        visibility: hidden;
        opacity: 0;
        li {
          .navbar-link {
            &:link,
            &:visited {
              font-size: 20px;
            }
            &:hover,
            &:active {
              color: #ff0000;
            }
          }
        }
      }

      .active .mobile-nav-icon {
        display: none;
        font-size: 30px;
        position: absolute;
        top: 20px;
        right: 10px;
        color: #ffff;
        z-index: 9999;
      }
      .active .close-outline {
        display: inline-block;
      }
      .active .navbar-list {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
        z-index: 999;
      }
    }
  `;
  
  return (
    <Nav>
      <div className={openMenu ? "menuIcon active" : "menuIcon"}>
        <ul className="navbar-list">
          { user && (
            <li>
              <Link
                className="navbar-link"
                onClick={() => setOpenMenu(false)}
                to="/"
              >
                New Booking
              </Link>
            </li>
          )}

          { user && (
            <li>
              <Link
                className="navbar-link"
                onClick={() => setOpenMenu(false)}
                to="/unpaid"
              >
               TotalDue
              </Link>
            </li>
          )}

          { user && (
            <li>
              <Link
                className="navbar-link"
                onClick={() => setOpenMenu(false)}
                to="/todayBooking"
              >
                Today Booking
              </Link>
            </li>
          )}
          { user && (
            <li>
              <Link
                className="navbar-link"
                onClick={() => setOpenMenu(false)}
                to="/kichenOrder"
              >
               Total Booking
              </Link>
            </li>
          )}
          { user && (
            <li>
              <Link
                className="navbar-link"
                onClick={() => setOpenMenu(false)}
                to="/bookingDashboard"
              >
                Dashboard
              </Link>
            </li>
          )}
          <li>
            {user ? (
              <button
                className="btnn navbar-link"
                onClick={logout}
              >
                LogOut
              </button>
            ) : (
              <Link
                className="navbar-link"
                onClick={() => setOpenMenu(false)}
                to="/login"
              >
               Login
              </Link>
            )}
          </li>
        </ul>
        {/* //nav icon */}
        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setOpenMenu(true)}
          />
          <CgCloseR
            name="close-outline"
            className="close-outline mobile-nav-icon"
            onClick={() => setOpenMenu(false)}
          />
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;

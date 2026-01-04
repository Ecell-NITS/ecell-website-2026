/* eslint-disable */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./Footer.css";

import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import { MdLocationOn, MdSend } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FiMail } from "react-icons/fi";

import axios from "axios";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [disableSend, setDisableSend] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const createUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please fill all the required fields");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Please enter a correct email");
      return;
    }
    try {
      setDisableSend(true);
      setCheckingEmail(true);
      const check = await axios.post(
        `${process.env.NEXT_PUBLIC_APIMAIN}/check-email`,
        { email },
      );
      if (!check.data.unique) {
        toast.warn("You have already subscribed to our newsletter");
        return;
      }
      await axios.post(`${process.env.NEXT_PUBLIC_APIMAIN}/createUser`, {
        email,
      });
      toast.success("Subscribed to Our Newsletter 🥳");
      setEmail("");
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setDisableSend(false);
      setCheckingEmail(false);
    }
  };

  return (
    <footer className="footer-section">
      <div className="fcontainer">
        {/* LOGO */}
        <div className="container1">
          <Link href="/" className="!no-underline">
            <Image
              src="https://res.cloudinary.com/dp92qug2f/image/upload/v1678341670/Ecell%20website/E-Cell-Logo-White_qhkb0q.webp"
              alt="E-Cell Logo"
              width={140}
              height={140}
              className="img-foot-centr transition-opacity hover:opacity-90"
            />
          </Link>
        </div>

        {/* ORG */}
        <div className="container2">
          <h2 className="h2">Organisation</h2>
          <ul className="no-bullets">
            <li>
              <BiUserCircle className="f_icon" />
              <span className="i-text">StartUp Center</span>
            </li>
            <li>
              <MdLocationOn className="f_icon" />
              <a
                className="i-text"
                href="https://goo.gl/maps/YOUR_MAP_LINK_HERE"
                target="_blank"
                rel="noreferrer"
              >
                NIT Silchar, Assam - 788010
              </a>
            </li>
            <li>
              <FiMail className="f_icon" />
              <a className="i-text" href="mailto:ecell@nits.ac.in">
                ecell@nits.ac.in
              </a>
            </li>
            <li>
              <BsFillTelephoneFill className="f_icon" />
              <a className="i-text" href="tel:+916388689290">
                +91 6388689290
              </a>
            </li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div className="container3">
          <h2 className="h2">Social</h2>
          <a
            href="https://www.facebook.com/ecell.nit.silchar"
            target="_blank"
            rel="noreferrer"
            className="footer_social_Logo"
          >
            <FaFacebook /> <span className="i-text">Facebook</span>
          </a>
          <a
            href="https://www.linkedin.com/company/ecell-nit-silchar/"
            target="_blank"
            rel="noreferrer"
            className="footer_social_Logo"
          >
            <FaLinkedin /> <span className="i-text">LinkedIn</span>
          </a>
          <a
            href="https://instagram.com/ecell.nitsilchar"
            target="_blank"
            rel="noreferrer"
            className="footer_social_Logo"
          >
            <FaInstagram /> <span className="i-text">Instagram</span>
          </a>
        </div>

        {/* SUBSCRIBE */}
        <div className="container4">
          <h2 className="h2">Subscribe</h2>
          <p className="p1">
            Keep yourself updated. Subscribe to our newsletter.
          </p>
          <form
            className="newsletterform00"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="fill">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={disableSend}
              />
              <button
                onClick={createUser}
                disabled={disableSend}
                className="btnnewsformletter"
                aria-label="Subscribe"
              >
                <MdSend />
              </button>
            </div>
          </form>
          {checkingEmail && (
            <p
              className="p1"
              style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}
            >
              Verifying...
            </p>
          )}
        </div>

        {/* COPYRIGHT */}
        <div className="container5">
          <p className="p2">All Rights Reserved © E-Cell, NIT Silchar</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

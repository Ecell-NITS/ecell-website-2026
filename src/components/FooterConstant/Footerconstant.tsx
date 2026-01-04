"use client";

import "./FooterConstant.css";

export default function FooterConstant() {
  return (
    <div className="footer-c">
      {/* Instagram */}
      <a
        href="https://www.instagram.com/ecell.nitsilchar/"
        target="_blank"
        rel="noreferrer"
      >
        <button className="ig-btn">
          <svg
            className="insta-ft-const-svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6.99805 0C3.13905 0 0 3.14195 0 7.00195V17.002C0 20.861 3.14195 24 7.00195 24H17.002C20.861 24 24 20.858 24 16.998V6.99805C24 3.13905 20.858 0 16.998 0H6.99805ZM19 4C19.552 4 20 4.448 20 5C20 5.552 19.552 6 19 6C18.448 6 18 5.552 18 5C18 4.448 18.448 4 19 4ZM12 6C15.309 6 18 8.691 18 12C18 15.309 15.309 18 12 18C8.691 18 6 15.309 6 12C6 8.691 8.691 6 12 6ZM12 8C10.9391 8 9.92172 8.42143 9.17157 9.17157C8.42143 9.92172 8 10.9391 8 12C8 13.0609 8.42143 14.0783 9.17157 14.8284C9.92172 15.5786 10.9391 16 12 16C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17157C14.0783 8.42143 13.0609 8 12 8Z"
              fill="#224259"
            />
          </svg>
        </button>
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/company/ecell-nit-silchar/"
        target="_blank"
        rel="noreferrer"
      >
        <button className="li-btn">
          <svg
            className="insta-ft-const-svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM7.496 5.403C8.338 5.403 8.899 5.964 8.899 6.712C8.899 7.46 8.338 8.021 7.403 8.021C6.561 8.022 6 7.46 6 6.712C6 5.964 6.561 5.403 7.496 5.403ZM9 17H6V9H9V17ZM19 17H16.176V12.628C16.176 11.419 15.423 11.14 15.141 11.14C14.859 11.14 13.917 11.326 13.917 12.628C13.917 12.814 13.917 17 13.917 17H11V9H13.918V10.116C14.294 9.465 15.047 9 16.459 9C17.871 9 19 10.116 19 12.628V17Z"
              fill="#224259"
            />
          </svg>
        </button>
      </a>

      {/* Facebook */}
      <a
        href="https://www.facebook.com/ecell.nit.silchar/"
        target="_blank"
        rel="noreferrer"
      >
        <button className="fa-btn">
          <svg
            className="insta-ft-const-svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 0C5.37273 0 0 5.40034 0 12.0617C0 18.109 4.43182 23.102 10.2065 23.9742V15.2586H7.23764V12.088H10.2065V9.9783C10.2065 6.48535 11.8996 4.95187 14.7878 4.95187C16.1711 4.95187 16.9025 5.05494 17.2489 5.10209V7.8697H15.2787C14.0525 7.8697 13.6244 9.03803 13.6244 10.355V12.088H17.2178L16.7302 15.2586H13.6244V24C19.4815 23.2012 24 18.1676 24 12.0617C24 5.40034 18.6273 0 12 0Z"
              fill="#224259"
            />
          </svg>
        </button>
      </a>
    </div>
  );
}

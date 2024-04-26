import { BsGithub, BsLinkedin, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return (
    <>
      <footer className="relative left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-20">
        <section className="text-lg">
          copyright {year} | All rights reserved
        </section>

        {/* Icons */}
        <section className="flex items-center justify-center gap-5 text-2xl textwhite">
          <Link
            to="https://github.com/cschavhan/"
            target="_blank"
            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
          >
            <BsGithub />
          </Link>
          <Link
            to="https://www.linkedin.com/in/chandrakant-chavhan-1232542b4/"
            target="_blank"
            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
          >
            <BsLinkedin />
          </Link>
          <Link
            to="https://www.instagram.com/chandu_chavhan_patil/"
            target="_blank"
            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
          >
            <BsInstagram />
          </Link>
          <Link className="hover:text-yellow-500 transition-all ease-in-out duration-300">
            <BsTwitter />
          </Link>
        </section>
      </footer>
    </>
  );
}

export default Footer;

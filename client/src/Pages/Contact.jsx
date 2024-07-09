import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayouts";
import toast from "react-hot-toast";
import { isEmail } from "../Helpers/regexMatcher";
import axiosInstance from "../Helpers/axiosInstance";

function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!userInput.name || !userInput.email || !userInput.message) {
      toast.error("All fields are required");
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error("Invalid email id");
      return;
    }

    try {
      const responce = axiosInstance.post("/contact", userInput);
      toast.promise(responce, {
        loading: "Submitting your message",
        success: "Form submitted succussfully",
        error: "Failed to submit the form",
      });

      const contactResponce = await responce;

      if (contactResponce?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("Operation Failed...");
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        <form
          noValidate
          onSubmit={onSubmitForm}
          className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]"
        >
          <h1 className="text-3xl font-semibold">Contact Form</h1>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <input
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="name"
              type="text"
              placeholder="Enter your name"
              name="name"
              onChange={handleUserInput}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" className="text-xl font-semibold">
              Email
            </label>
            <input
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleUserInput}
              value={userInput.email}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="message" className="text-xl font-semibold">
              Message
            </label>
            <textarea
              className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
              id="message"
              name="message"
              placeholder="Enter your message"
              onChange={handleUserInput}
              value={userInput.message}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500  hover:text-black transition-all ease-in-out duration-300 rounded-sm py-2 font-bold text-lg cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Contact;

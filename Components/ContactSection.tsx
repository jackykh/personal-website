import { FormEventHandler, forwardRef, useEffect, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import LoadingSpinner from "./uiComponents/LoadingSpinner";
import { toast } from "react-toastify";

const ContactSection = forwardRef<HTMLElement>((_props, ref) => {
  const CREATE_MESSAGE = gql`
    mutation createMessage($name: String!, $email: String!, $message: String!) {
      createMessage(data: { name: $name, email: $email, message: $message }) {
        data {
          id
        }
      }
    }
  `;
  const [createMessage, { loading: creating, error }] =
    useMutation(CREATE_MESSAGE);

  const formRef = useRef<HTMLFormElement>(null);
  const onSubmitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      const name = (
        event.currentTarget.elements.namedItem("name") as HTMLInputElement
      ).value;
      const email = (
        event.currentTarget.elements.namedItem("email") as HTMLInputElement
      ).value;
      const message = (
        event.currentTarget.elements.namedItem("message") as HTMLInputElement
      ).value;
      if (
        name.trim().length === 0 ||
        email.trim().length === 0 ||
        message.trim().length === 0
      ) {
        return toast.error("Please fill up all fields.", {
          position: "top-center",
        });
      }
      await createMessage({ variables: { name, email, message } });
      formRef.current!.reset();
      if (umami) {
        umami.track("Send Message");
      }
      toast.success("Sent Sucessfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Unknown Error");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <section
        ref={ref}
        className="bg-purple-50 w-full min-h-screen flex flex-col items-center justify-center "
      >
        <div className="w-[60rem] max-w-full px-10 flex flex-col justify-center items-center text-center my-24">
          <h2 className="text-4xl font-bold mb-4">Send me a message!</h2>
          <p className="text-xl">Want to say hello? Go ahead.</p>
        </div>
        <form
          onSubmit={onSubmitHandler}
          className="w-[60rem] max-w-[90%]"
          name="messageForm"
          ref={formRef}
        >
          <div className="flex flex-col sm:flex-row">
            <div className="form_group" onTouchEnd={(e) => e.stopPropagation()}>
              <input
                type="text"
                className="input rounded"
                placeholder="name"
                name="name"
                required
              />
              <label htmlFor="name" className="label">
                name
              </label>
            </div>
            <div className="form_group" onTouchEnd={(e) => e.stopPropagation()}>
              <input
                type="email"
                className="input rounded"
                placeholder="email"
                name="email"
                required
              />
              <label htmlFor="email" className="label">
                email
              </label>
            </div>
          </div>
          <div className="form_group" onTouchEnd={(e) => e.stopPropagation()}>
            <label htmlFor="message" className="text-base p-2">
              Message
            </label>
            <textarea
              className="input rounded"
              placeholder="Hello, I want to build a website for my products!"
              rows={3}
              name="message"
              required
            />
          </div>
          {!creating && (
            <div className="w-full text-center mt-6 mb-12">
              <button type="submit" className="btn ">
                Submit
              </button>
            </div>
          )}
          {creating && (
            <div className="w-full flex justify-center my-6">
              <LoadingSpinner />
            </div>
          )}
        </form>
      </section>
    </>
  );
});

ContactSection.displayName = "ContactSection";

export default ContactSection;

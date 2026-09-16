import { FormEventHandler, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import Link from "next/link";
import LoadingSpinner from "./uiComponents/LoadingSpinner";
import { toast } from "sonner";

const ContactSection = () => {
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
        return toast.error("Please fill up all fields.");
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
    <section className="w-full border-b border-line bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-28 sm:py-36 grid lg:grid-cols-2 gap-14 lg:gap-24">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted mb-8">
            03 — Contact
          </p>
          <h2 className="font-display font-medium uppercase leading-[0.95] tracking-[-0.02em] text-[clamp(2.6rem,6.5vw,5.5rem)] text-ink">
            Let&apos;s{" "}
            <span className="font-serif italic font-normal normal-case">
              talk
            </span>
          </h2>
          <p className="mt-8 max-w-md text-soft text-lg leading-relaxed">
            Want to say hello? Go ahead.
          </p>
          <Link
            href="mailto:hello@jackycheung.dev"
            className="mt-10 inline-block font-mono text-sm tracking-[0.1em] text-ink underline decoration-line underline-offset-8 hover:decoration-ink transition-colors break-all"
          >
            hello@jackycheung.dev
          </Link>
        </div>
        <form
          onSubmit={onSubmitHandler}
          className="w-full"
          name="messageForm"
          ref={formRef}
        >
          <div className="flex flex-col sm:flex-row">
            <div className="form_group" onTouchEnd={(e) => e.stopPropagation()}>
              <input
                type="text"
                className="input"
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
                className="input"
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
            <label
              htmlFor="message"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted pb-2"
            >
              Message
            </label>
            <textarea
              className="input"
              placeholder="Hello, I want to build a website for my products!"
              rows={3}
              name="message"
              required
            />
          </div>
          {!creating && (
            <div className="w-full mt-8">
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          )}
          {creating && (
            <div className="w-full flex justify-start my-6">
              <LoadingSpinner />
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;

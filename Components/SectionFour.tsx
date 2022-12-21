import { FormEventHandler, forwardRef } from "react";

const SectionFour = forwardRef<HTMLElement>((_props, ref) => {
  const onSubmitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
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
      return alert("Please enter all field.");
    }
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });
    const result = await response.json();
    alert(result.message);
  };
  return (
    <section
      ref={ref}
      className="bg-purple-50 w-full min-h-screen py-[10rem]  flex flex-col items-center "
    >
      <div className="w-[60rem] max-w-full px-10 flex flex-col justify-center items-center text-center mb-24">
        <h1 className="text-4xl font-bold mb-4">Send me a message!</h1>
        <p className="text-xl">Want to say hello? Go ahead.</p>
      </div>
      <form
        onSubmit={onSubmitHandler}
        className="w-[60rem] max-w-[90%]"
        name="messageForm"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="form_group">
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
          <div className="form_group">
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
        <div className="form_group">
          <label htmlFor="email" className="text-base p-2">
            Message
          </label>
          <textarea
            className="input"
            placeholder="Hello, I want to build a website for my products!
            "
            rows={3}
            name="message"
            required
          />
        </div>
        <div className="w-full text-center mt-6">
          <button type="submit" className="btn ">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
});

SectionFour.displayName = "SectionFour";

export default SectionFour;

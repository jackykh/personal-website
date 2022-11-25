import Link from "next/link";

const Resume = () => {
  return (
    <main className="lg:p-16">
      <div className="bg-purple-100 h-[60rem] w-full flex">
        <div className="h-full w-[20rem] border border-solid border-black p-8">
          <div className="h-[10rem] w-full flex flex-col">
            <Link href="../">jackycheung.dev</Link>
            <Link href="mailto:jackycheungtester@gmail.com">
              jackycheungtester@gmail.com
            </Link>
            <span>Hong Kong</span>
          </div>
        </div>
        <div className="flex-1 h-full border border-solid border-black"></div>
      </div>
    </main>
  );
};

export default Resume;

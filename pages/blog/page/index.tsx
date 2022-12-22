import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/blog/page/1");
  }, [router]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <span>Redirect to Page 1...</span>
    </div>
  );
};

export default Index;

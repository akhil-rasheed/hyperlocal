import Image from "next/image";
import { AuthForm } from "./components/AuthForm";
export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-200">
      <div className=" sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="hyperlocal"
          width="600"
          height="600"
          src="/images/logo.png"
          className="mx-auto w-auto"
        />
      </div>
      <AuthForm />
    </div>
  );
}

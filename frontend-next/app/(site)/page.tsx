import Image from "next/image";
import { AuthForm } from "./components/AuthForm";
export default function Home() {
  return (
    <div className=" flex flex-col  lg:flex-row-reverse h-screen min-h-full items-center  lg:justify-between  w-full bg-gradient-to-b lg:bg-gradient-to-l from-black to-transparent py-8 lg:py-0">
      <div className="fixed -z-10 w-full h-full ">
        <Image
          src="/images/background4.jpg"
          alt=""
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className=" w-full h-full flex flex-col lg:justify-center lg:items-center  sm:w-full sm:max-w-md px-8 lg:px-0 ">
        <Image
          alt="hyperlocal"
          width="200"
          height="200"
          src="/images/logo3.png"
          className=" mb-4  w-auto"
        />
        <AuthForm />
      </div>
      <div className="w-full lg:w-2/3 text-2xl lg:text-4xl px-10 flex flex-col justify-center h-full text-gray-300 z-20 gap-8 lg:bg-gradient-to-r from-black/75 to-transparent  ">
        <p>
          Connect with things happening
          <span className=" text-mint-green font-bold text-3xl lg:text-6xl px-2">
            right now.
          </span>
        </p>
        <p>
          Explore
          <span className=" text-mint-green font-bold text-3xl lg:text-6xl px-2">
            local.
          </span>
        </p>
        <p>
          Find your
          <span className=" text-mint-green font-bold text-3xl lg:text-6xl px-2">
            community.
          </span>
        </p>
      </div>
    </div>
  );
}

import { Vortex } from "@/components/ui/vortex";
import { Button } from "@/components/ui/moving-border";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <h1 className="text-white text-2xl md:text-6xl font-bold text-center">
          Image Uploader
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <Link href={'/login'}>

          <Button borderRadius="1.75rem" className="bg-white text-xl dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800">
            Login
          </Button>
          </Link>
          <Button borderRadius="1.75rem" className="bg-white text-xl dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800">
            Sign Up
          </Button>
        </div>
      </Vortex>
    </div>
  );
}

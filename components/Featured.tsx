import Image from "next/image";

const Featured = () => {
  return (
    <div className="mt-[30px]">
      <h1 className="text-8xl font-light max-lg:text-7xl max-md:text-6xl">
        <strong className="font-semibold text-[var(--textColor)]">
          Hey, I&apos;m here!
        </strong>{" "}
        Discover my stories and creative ideas.
      </h1>
      <div className="mt-[60px] flex items-center gap-[50px] max-lg:flex-col max-lg:items-center">
        <div className="relative h-[500px] flex-1 max-md:hidden">
          <Image src="/p1.jpeg" alt="hero" fill className="object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-5">
          <h1 className="text-4xl max-md:text-3xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </h1>
          <p className="text-xl font-light text-[var(--softTextColor)] max-md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, quos.
          </p>
          <button className="w-max cursor-pointer rounded-[5px] border-none bg-[var(--textColor)] px-5 py-4 text-[var(--bg)]">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;

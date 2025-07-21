import Image from "next/image";

const About = () => {
  return (
    <section className="w-full relative flex flex-col justify-center gap-8">
      <div className="flex justify-center flex-col px-4 gap-4">
        <h1 className="heading text-center">
          About Me
        </h1>

        <div className="text-sm text-left leading-loose tracking-wide flex flex-col gap-3 text-gray-300">
          <p>
              I am Epiphanus Onyeso (Patron). I specialize in building full-stack applications with modern frameworks like Next.js. I don&apos;t joke with user experience and developer experience, so I take extra care in writing clean, maintainable code.
          </p>

          <p>
            I am driven to build, detail-oriented, constantly experimenting new ideas and ready to learn. I stay current with modern tech to create smart, scalable, and user-focused solutions that help businesses grow.
          </p>
        </div>
      </div>

      <div className="flex-center">
         <Image src="/images/profile-animated.png" alt="me" width={400} height={400} className="rounded-full" />
      </div>
    </section>
  );
};

export default About;

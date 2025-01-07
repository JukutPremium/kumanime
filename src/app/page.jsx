// pages/index.js
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-Kblack text-white px-4">
        <h1 className="text-5xl font-bold sm:text-6xl md:text-7xl lg:text-8xl">
          Kum<span className="text-Kgreen">anime</span>
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          U n d e r D e v e l o p m e n t
          askdjas
        </p>
      </div>

    </>
  );
}

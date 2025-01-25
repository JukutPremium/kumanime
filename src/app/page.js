// pages/index.js
import Navbar from './components/Navbar';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Navbar />
      {/* <div className="flex flex-col items-center justify-center h-screen bg-Kblack text-white px-4">
        <h1 className="text-5xl font-bold sm:text-6xl md:text-7xl lg:text-8xl">
          Kum<span className="text-Kgreen">anime</span>
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Under Development
        </p>
      </div> */}

      <section className="h-screen w-screen">
        <div className="relative h-screen w-screen">
          <div className="absolute inset-0 bg-[url(../../public/banner.jpg)] bg-no-repeat bg-cover brightness-50" />
          <div className="relative z-10 h-screen w-[900px] flex items-end justify-center">
            <div className='p-24'>
              <div className='border-l-4 border-[#05C149]'>
                <h1 className="text-white text-6xl font-bold pl-1">DAN DAN DAN DAN</h1>
                <p className="text-white pl-2 text-lg">Momo&apos;s childhood friend and first love, Jiji (Enjoji Jin), comes to Seiko for help because he is disturbed by strange events in his new house. Okarun, who just found out that Jiji is Momo&apos;s first love, can&apos;t hide her anxiety and tries to get away from Momo. At that moment, a human body model appears and runs with all her might in front of Okarun.</p>
              </div>
              <div className='pt-8 flex gap-4'>
                <button className="bg-[#05C149] px-10 py-3 rounded-full flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className='font-bold'>Watch Now</span>
                </button>
                <button className="border-4 border-[#05C149] px-10 py-3 rounded-full flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#05C149]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className='text-[#05C149] font-bold'>Add To Watch List</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
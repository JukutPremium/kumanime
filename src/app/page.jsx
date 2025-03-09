// pages/index.js
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSlider from './components/Slider';
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

      {/* <section className="relative h-[calc(100vh-80px)] w-full">
        <div className="absolute inset-0 bg-[url(../../public/banner.jpg)] bg-no-repeat bg-cover brightness-50" />
        <div className="relative z-10 h-full w-full md:w-[900px] flex items-end justify-center">
          <div className='p-4 sm:p-12 md:p-24 w-full'>
            <div className='border-l-4 border-[#2FFF51] py-2'>
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold pl-3 sm:pl-5">DAN DAN DAN DAN</h1>
              <p className="text-white pl-4 sm:pl-6 text-sm sm:text-base lg:text-lg">Momo&apos;s childhood friend and first love, Jiji (Enjoji Jin), comes to Seiko for help because he is disturbed by strange events in his new house. Okarun, who just found out that Jiji is Momo&apos;s first love, can&apos;t hide her anxiety and tries to get away from Momo. At that moment, a human body model appears and runs with all her might in front of Okarun.</p>
            </div>
            <div className='pt-4 sm:pt-8 flex flex-col sm:flex-row gap-4'>
              <button className="bg-[#2FFF51] px-6 sm:px-10 py-2 sm:py-3 rounded-full flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className='font-bold text-sm sm:text-base'>Watch Now</span>
              </button>
              <button className="border-4 border-[#2FFF51] px-6 sm:px-10 py-2 sm:py-3 rounded-full flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6 text-[#2FFF51]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className='text-[#2FFF51] font-bold text-sm sm:text-base'>Add To Watch List</span>
              </button>
            </div>
          </div>
        </div>
      </section> */}

      <HeroSlider />

      {/* New Update */}
      <section className='h-full w-full'>
        <div className='pt-12 sm:pt-24 px-4 sm:px-24 bg-black'>
          <div className='flex flex-col sm:flex-row justify-between items-center px-2 sm:px-5 border-l-4 border-[#2FFF51]'>
            <h2 className='text-white font-bold text-xl sm:text-2xl mb-4 sm:mb-0'>New Update</h2>
            <button className='text-black font-bold text-base sm:text-xl bg-[#2FFF51] py-1 sm:py-2 px-3 sm:px-4 rounded-full'>See All</button>
          </div>
          <div className='w-full overflow-x-auto'>
            <div className='py-5 flex gap-4 min-w-[1000px] sm:min-w-full'>

              <div className='flex-shrink-0 w-48 sm:w-64'>
                <Image src='/banner.jpg' width={800} height={800} alt='image' className='rounded-3xl'></Image>
                <div className='py-3'>
                  <p className='pt-2 font-semibold'>
                    <span className='py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs'>ongoing</span>
                    <span className='py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2'>new</span>
                  </p>
                  <p className='pt-2 text-white text-xl sm:text-2xl font-semibold'>DAN DAN DAN DAN</p>
                  <p className='text-gray-400 text-sm'>Uploaded : Dec 13, 06:27</p>
                </div>
              </div>
              <div className='flex-shrink-0 w-48 sm:w-64'>
                <Image src='/banner.jpg' width={800} height={800} alt='image' className='rounded-3xl'></Image>
                <div className='py-3'>
                  <p className='pt-2 font-semibold'>
                    <span className='py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs'>ongoing</span>
                    <span className='py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2'>new</span>
                  </p>
                  <p className='pt-2 text-white text-xl sm:text-2xl font-semibold'>DAN DAN DAN DAN</p>
                  <p className='text-gray-400 text-sm'>Uploaded : Dec 13, 06:27</p>
                </div>
              </div>
              <div className='flex-shrink-0 w-48 sm:w-64'>
                <Image src='/banner.jpg' width={800} height={800} alt='image' className='rounded-3xl'></Image>
                <div className='py-3'>
                  <p className='pt-2 font-semibold'>
                    <span className='py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs'>ongoing</span>
                    <span className='py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2'>new</span>
                  </p>
                  <p className='pt-2 text-white text-xl sm:text-2xl font-semibold'>DAN DAN DAN DAN</p>
                  <p className='text-gray-400 text-sm'>Uploaded : Dec 13, 06:27</p>
                </div>
              </div>
              <div className='flex-shrink-0 w-48 sm:w-64'>
                <Image src='/banner.jpg' width={800} height={800} alt='image' className='rounded-3xl'></Image>
                <div className='py-3'>
                  <p className='pt-2 font-semibold'>
                    <span className='py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs'>ongoing</span>
                    <span className='py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2'>new</span>
                  </p>
                  <p className='pt-2 text-white text-xl sm:text-2xl font-semibold'>DAN DAN DAN DAN</p>
                  <p className='text-gray-400 text-sm'>Uploaded : Dec 13, 06:27</p>
                </div>
              </div>
              <div className='flex-shrink-0 w-48 sm:w-64'>
                <Image src='/banner.jpg' width={800} height={800} alt='image' className='rounded-3xl'></Image>
                <div className='py-3'>
                  <p className='pt-2 font-semibold'>
                    <span className='py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs'>ongoing</span>
                    <span className='py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2'>new</span>
                  </p>
                  <p className='pt-2 text-white text-xl sm:text-2xl font-semibold'>DAN DAN DAN DAN</p>
                  <p className='text-gray-400 text-sm'>Uploaded : Dec 13, 06:27</p>
                </div>
              </div>
              <div className='flex-shrink-0 w-48 sm:w-64'>
                <Image src='/banner.jpg' width={800} height={800} alt='image' className='rounded-3xl'></Image>
                <div className='py-3'>
                  <p className='pt-2 font-semibold'>
                    <span className='py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs'>ongoing</span>
                    <span className='py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2'>new</span>
                  </p>
                  <p className='pt-2 text-white text-xl sm:text-2xl font-semibold'>DAN DAN DAN DAN</p>
                  <p className='text-gray-400 text-sm'>Uploaded : Dec 13, 06:27</p>
                </div>
              </div>
              <div className='flex-shrink-0 w-48 sm:w-64'>
                <Image src='/banner.jpg' width={800} height={800} alt='image' className='rounded-3xl'></Image>
                <div className='py-3'>
                  <p className='pt-2 font-semibold'>
                    <span className='py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs'>ongoing</span>
                    <span className='py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2'>new</span>
                  </p>
                  <p className='pt-2 text-white text-xl sm:text-2xl font-semibold'>DAN DAN DAN DAN</p>
                  <p className='text-gray-400 text-sm'>Uploaded : Dec 13, 06:27</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Completed */}
      <section className='h-full w-full'>
        <div className='py-12 sm:py-24 px-4 sm:px-24 bg-black'>
          <div className='flex flex-col sm:flex-row justify-between items-center px-2 sm:px-5 border-l-4 border-[#2FFF51]'>
            <h2 className='text-white font-bold text-xl sm:text-2xl mb-4 sm:mb-0'>Latest Completed</h2>
            <button className='text-black font-bold text-base sm:text-xl bg-[#2FFF51] py-1 sm:py-2 px-3 sm:px-4 rounded-full'>See All</button>
          </div>
          <div className='w-full overflow-x-auto'>
            <div className='py-5 flex gap-4 min-w-[1000px] sm:min-w-full'>

              <div className='flex-shrink-0 w-48 sm:w-64'>
                <Image src='/banner.jpg' width={800} height={800} alt='image' className='rounded-3xl'></Image>
                <div className='py-3'>
                  <p className='pt-2 font-semibold'>
                    <span className='py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs'>ongoing</span>
                    <span className='py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2'>new</span>
                  </p>
                  <p className='pt-2 text-white text-xl sm:text-2xl font-semibold'>DAN DAN DAN DAN</p>
                  <p className='text-gray-400 text-sm'>Uploaded : Dec 13, 06:27</p>
                </div>
              </div>
              <div className='flex-shrink-0 w-48 sm:w-64'>
                <Image src='/banner.jpg' width={800} height={800} alt='image' className='rounded-3xl'></Image>
                <div className='py-3'>
                  <p className='pt-2 font-semibold'>
                    <span className='py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs'>ongoing</span>
                    <span className='py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2'>new</span>
                  </p>
                  <p className='pt-2 text-white text-xl sm:text-2xl font-semibold'>DAN DAN DAN DAN</p>
                  <p className='text-gray-400 text-sm'>Uploaded : Dec 13, 06:27</p>
                </div>
              </div>
              <div className='flex-shrink-0 w-48 sm:w-64'>
                <Image src='/banner.jpg' width={800} height={800} alt='image' className='rounded-3xl'></Image>
                <div className='py-3'>
                  <p className='pt-2 font-semibold'>
                    <span className='py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs'>ongoing</span>
                    <span className='py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2'>new</span>
                  </p>
                  <p className='pt-2 text-white text-xl sm:text-2xl font-semibold'>DAN DAN DAN DAN</p>
                  <p className='text-gray-400 text-sm'>Uploaded : Dec 13, 06:27</p>
                </div>
              </div>
              <div className='flex-shrink-0 w-48 sm:w-64'>
                <Image src='/banner.jpg' width={800} height={800} alt='image' className='rounded-3xl'></Image>
                <div className='py-3'>
                  <p className='pt-2 font-semibold'>
                    <span className='py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs'>ongoing</span>
                    <span className='py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2'>new</span>
                  </p>
                  <p className='pt-2 text-white text-xl sm:text-2xl font-semibold'>DAN DAN DAN DAN</p>
                  <p className='text-gray-400 text-sm'>Uploaded : Dec 13, 06:27</p>
                </div>
              </div>
              <div className='flex-shrink-0 w-48 sm:w-64'>
                <Image src='/banner.jpg' width={800} height={800} alt='image' className='rounded-3xl'></Image>
                <div className='py-3'>
                  <p className='pt-2 font-semibold'>
                    <span className='py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs'>ongoing</span>
                    <span className='py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2'>new</span>
                  </p>
                  <p className='pt-2 text-white text-xl sm:text-2xl font-semibold'>DAN DAN DAN DAN</p>
                  <p className='text-gray-400 text-sm'>Uploaded : Dec 13, 06:27</p>
                </div>
              </div>
              <div className='flex-shrink-0 w-48 sm:w-64'>
                <Image src='/banner.jpg' width={800} height={800} alt='image' className='rounded-3xl'></Image>
                <div className='py-3'>
                  <p className='pt-2 font-semibold'>
                    <span className='py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs'>ongoing</span>
                    <span className='py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2'>new</span>
                  </p>
                  <p className='pt-2 text-white text-xl sm:text-2xl font-semibold'>DAN DAN DAN DAN</p>
                  <p className='text-gray-400 text-sm'>Uploaded : Dec 13, 06:27</p>
                </div>
              </div>
              <div className='flex-shrink-0 w-48 sm:w-64'>
                <Image src='/banner.jpg' width={800} height={800} alt='image' className='rounded-3xl'></Image>
                <div className='py-3'>
                  <p className='pt-2 font-semibold'>
                    <span className='py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs'>ongoing</span>
                    <span className='py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2'>new</span>
                  </p>
                  <p className='pt-2 text-white text-xl sm:text-2xl font-semibold'>DAN DAN DAN DAN</p>
                  <p className='text-gray-400 text-sm'>Uploaded : Dec 13, 06:27</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
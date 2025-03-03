import Image from "next/image";

export default function AnimeInfoPage () {
    const anime = {
        title: 'DAN DAN DAN DAN DAN',
        bannerImage: '/banner1.png',
        posterImage: '/banner1.png',
        status: 'ONGOING',
        type: 'TV SERIES',
        currentEpisode: 12,
        studio: 'Science SARU',
        season: 'FALL 2024',
        isCensored: false,
        description: "Momo's childhood friend and first love, Jiji (Enjoji Jin), comes to Seiko for help because he is disturbed by strange events in his new house. Okurun, who just found out that Jiji is Momo's first love, can't hide her anxiety and tries to get away from Momo. At that moment, a human body model appears and runs with all it er might in front of Okurun.",
        genres: ['Action', 'Comedy', 'Supernatural', 'Shounen'],
        episodes: [
          { number: 1, releasedAt: '7 Days Ago' },
          { number: 2, releasedAt: '14 Days Ago' },
          { number: 3, releasedAt: '21 Days Ago' },
          { number: 4, releasedAt: '28 Days Ago' },
          { number: 5, releasedAt: '1 Month Ago' },
          { number: 6, releasedAt: '1 Month Ago' },
          { number: 7, releasedAt: '1 Month Ago' },
        ]
      };
    return (
        <>
        <div className="absolute top-0 left-0 w-screen h-[700px]" 
           style={{
             backgroundImage: `url(${anime.bannerImage})`, 
             backgroundSize: 'cover', 
             backgroundRepeat: 'no-repeat'
           }}>
        <div className="absolute top-0 left-0 bottom-0 right-0 w-screen h-[700px] bg-gradient-to-t from-black to-transparent"></div>
      </div>
      
      <section className="pt-16 relative">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8 mt-16 mb-16">
          {/* Anime Poster */}
          <div className="w-full md:w-1/3 lg:w-5/12 flex justify-center md:justify-start">
            <div className="relative w-full">
              <Image src={anime.posterImage} alt={`${anime.title} Poster`} className="rounded-[20px] w-full aspect-[3/4] relative z-10" />
            </div>
          </div>
          
          {/* Anime Info */}
          <div className="w-full md:w-2/3 lg:w-3/4 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">{anime.title}</h1>
            
            {/* Tags */}
            <div className="flex flex-wrap justify-between md:justify-between gap-2 mb-4 w-80">
              <span className="bg-Kgreen text-black px-4 py-1 rounded-full text-sm">{anime.status}</span>
              <span className="bg-Kblue text-white px-4 py-1 rounded-full text-sm">{anime.type}</span>
              <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm">EPISODE {anime.currentEpisode}</span>
            </div>
            
            <div className="flex flex-wrap justify-between md:justify-between gap-2 mb-4 w-80">
              <span className="border border-Kblue text-white px-10 py-1 rounded-full text-sm">{anime.studio}</span>
              <span className="border border-Kblue text-white px-10 py-1 rounded-full text-sm">{anime.season}</span>
            </div>
            
            {anime.isCensored === false && (
              <div className="flex justify-center md:justify-start mb-8">
                <span className="border border-green-500 text-white px-4 py-1 rounded-full text-sm w-80 text-center">UNCENSORED</span>
              </div>
            )}
            
            {/* Description */}
            <div className="mb-8">
              <p className="text-gray-300">{anime.description}</p>
            </div>
            
            {/* Genre Tags */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {anime.genres.map((genre, index) => (
                <span key={index} className="bg-green-500 text-black px-4 py-1 rounded-full text-sm">{genre}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 my-8">
        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
            <span className="text-gray-700">Video Player Placeholder</span>
        </div>
    </section>

      <section className="max-w-6xl mx-auto px-6 my-12">
      <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-500 pl-3 text-white">List Episode {anime.title}</h2>
      
      <div className="space-y-4">
        {anime.episodes.map((episode) => (
          <div key={episode.number} className="flex items-center bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition cursor-pointer">
            <div className="bg-green-500 w-16 h-16 flex items-center justify-center text-2xl font-bold text-white">
              {episode.number}
            </div>
            <div className="flex-1 px-4 py-3 flex justify-between items-center text-white">
              <span>{anime.title} Episode {episode.number}</span>
              <span className="text-gray-400">{episode.releasedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
      </>
    )
} 
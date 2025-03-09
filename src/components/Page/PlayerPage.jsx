import Image from "next/image";

export default function AnimeInfoPage() {
    const anime = {
        title: "DAN DAN DAN DAN DAN",
        bannerImage: "/banner1.png",
        posterImage: "/banner1.png",
        status: "ONGOING",
        type: "TV SERIES",
        currentEpisode: 12,
        studio: "Science SARU",
        season: "FALL 2024",
        isCensored: false,
        description:
            "Momo's childhood friend and first love, Jiji (Enjoji Jin), comes to Seiko for help because he is disturbed by strange events in his new house. Okurun, who just found out that Jiji is Momo's first love, can't hide her anxiety and tries to get away from Momo. At that moment, a human body model appears and runs with all it er might in front of Okurun.",
        genres: ["Action", "Comedy", "Supernatural", "Shounen"],
        episodes: [
            { number: 1, releasedAt: "7 Days Ago" },
            { number: 2, releasedAt: "14 Days Ago" },
            { number: 3, releasedAt: "21 Days Ago" },
            { number: 4, releasedAt: "28 Days Ago" },
            { number: 5, releasedAt: "1 Month Ago" },
            { number: 6, releasedAt: "1 Month Ago" },
            { number: 7, releasedAt: "1 Month Ago" },
        ],
    };
    return (
        <>
            <section className="max-w-6xl mx-auto px-6 my-16">
                <div className="bg-gray-200 h-48 md:h-96 rounded-lg aspect-video w-full flex items-center justify-center">
                    <span className="text-gray-700">Video Player Placeholder</span>
                </div>
                <div className="bg-gray-200 h-12 md:h-14 px-10 rounded-lg flex items-center justify-center mt-3 md:hidden">
                        <select className="bg-transparent text-gray-700 text-center w-full outline-none cursor-pointer font-semibold">
                            <option className="bg-white text-gray-700 p-2" value="server1">Instink Server</option>
                            <option className="bg-white text-gray-700 p-2" value="server2">Abyss Server</option>
                        </select>
                    </div>

                <div className="flex gap-2 w-full md:justify-between pt-3 md:pt-5">
                    
                    <div className="bg-gray-200 w-1/2 h-8 md:h-10 md:w-28 rounded-lg flex items-center justify-center">
                        <span className="text-gray-700 font-semibold">Prev</span>
                    </div>
                    
                    <div className="bg-gray-200 md:h-10 md:w-full rounded-lg hidden items-center justify-center md:flex">
                        <select className="appearance-none bg-transparent text-gray-700 text-center w-full outline-none cursor-pointer font-semibold">
                            <option className="bg-white text-gray-700 p-2" value="server1">Instink Server</option>
                            <option className="bg-white text-gray-700 p-2" value="server2">Abyss Server</option>
                        </select>
                    </div>

                    <div className="bg-gray-200 w-1/2 h-8 md:h-10 md:w-28 rounded-lg flex items-center justify-center">
                        <span className="text-gray-700 font-semibold">Next</span>
                    </div>

                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 my-12">
                <h2 className="text-2xl font-semibold mb-6 border-l-4 border-Kgreen pl-3 text-white">
                    List Episode {anime.title}
                </h2>

                <div className="space-y-4">
                    {anime.episodes.map((episode) => (
                        <div
                            key={episode.number}
                            className="flex items-center bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition cursor-pointer"
                        >
                            <div className="bg-Kgreen w-16 h-16 flex items-center justify-center text-2xl font-semibold text-black">
                                {episode.number}
                            </div>
                            <div className="flex-1 px-4 py-3 flex justify-between items-center font-semibold text-white">
                                <span className="line-clamp-1">
                                    {anime.title} Episode {episode.number}
                                </span>
                                <span className="text-gray-400 line-clamp-1">{episode.releasedAt}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

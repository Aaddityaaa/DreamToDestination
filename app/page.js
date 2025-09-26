"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { Playwrite_HU } from "next/font/google";
import { useRouter } from "next/navigation";

const playwrite = Playwrite_HU({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"], // choose what you need
});


// Import Poppins from Google
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // add weights you need
});
const coverImages = [
  "/cover-img1.jpg",
  "/cover-img2.jpg",
  "/cover-img4.jpg",
  "/cover-img5.jpg",
  "/cover-img6.avif",
  "/cover-img7.avif",
  "/cover-img8.avif",
  "/cover-img9.avif",
  "/cover-img10.avif",
  "/cover-img11.avif",
  "/cover-img12.avif",
]

const images = {
  "/section2/amritsar.avif": "Amritsar",
  "/section2/chandrashila.avif": "Chandrashila",
  "/section2/darjeeling.avif": "Darjeeling",
  "/section2/delhi.avif": "Delhi",
  "/section2/goa.avif": "Goa",
  "/section2/haridwar.avif": "Haridwar",
  "/section2/jaipur.avif": "Jaipur",
  "/section2/kerala.avif": "Kerala",
  "/section2/udaipur.avif": "Udaipur",
  "/section2/varanasi.avif": "Varanasi",
}

export default function Home() {

  const router = useRouter();

  const handleClick = () => {
    router.push("/explore");
  }
  const [currentIndex, setCurrentIndex] = useState(0)
  const [index, setIndex] = useState(0)
  const [idx, setIdx] = useState(0)

  //Changer => Change image every 2 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % coverImages.length);
    }, 2000)
    return () => clearInterval(interval); //cleanup
  }, [coverImages.length])


  //convert object key/value into array for indexing
  const imageKeys = Object.keys(images)

  const handlePreview = () => {
    setIndex((prev) => prev === 0 ? imageKeys.length - 1 : prev - 1)
  }
  const handleNext = () => {
    setIndex((prev) => prev === imageKeys.length - 1 ? 0 : prev + 1)
  }

  // Section 3
  const cards = [
    { img: "/section3/hawa-mahal.avif", title: "Hawa Mahal" },
    { img: "/section3/chandratal.avif", title: "Chandratal Lake" },
    { img: "/section3/vt-bhu.avif", title: "Vt BHU" },
    { img: "/section3/spiti-valley.avif", title: "Spiti Valley" },
    { img: "/section3/devprayag.avif", title: "Devprayag" },
    { img: "/section3/darjeeling.avif", title: "Darjeeling" },
    { img: "/section3/sarnath.avif", title: "Sarnath" },
    { img: "/section3/dal-lake.avif", title: "Dal Lake" },
    { img: "/section3/rajasthan.avif", title: "Rajasthan" },
    { img: "/section3/taj-mahal.avif", title: "Taj Mahal" },
    { img: "/section3/vaishno-devi.avif", title: "Katra" },
    { img: "/section3/vrindavan.avif", title: "Vrindavan" },
    { img: "/section3/gateway-of-india.avif", title: "The Gateway of India" },
    { img: "/section3/rameshwaram.avif", title: "Rameshwaram temple" },
    
  ];
  const cardWidth = 270; // 250px + margins/paddings

  const handleNxt = () => {
      setIdx(prev => (prev + 1) % cards.length);

  };

  const handlePre = () => {
      setIdx(prev => (prev - 1) % cards.length);
  };

  return (
    <>
      <section className="h-[86vh] relative">
        <Image
          src={coverImages[currentIndex]}
          fill
          alt="cover image"
          className="object-cover relative transition-opacity duration-700 opacity-80"
        />
        <div
          className={`${poppins.className} absolute w-full h-full flex flex-col items-center justify-center`}
        >
          <h1 className="text-white text-8xl font-medium  tracking-wider text-outline drop-shadow-[2px_2px_0_black] malvides">
            Dream to Destination
          </h1>
          <p className="text-black font-bold
           text-4xl tracking-wide drop-shadow-[2px_2px_0_pink] malvides">
            Where every trip start with a smile and
          </p>
          <p className="inline-block border-2 border-[#3bb3e3] rounded-full px-3 py-1 bg-black/50 ">
            <span className="text-yellow-200 font-medium text-3xl drop-shadow-[1px_1px_0_red] malvides">
              ends with a story.
            </span>
          </p>
          <ul className="my-10 flex ">
            <li className="flex items-center gap-1"><span><img src="/clock.png" width={22} alt="" /></span><span className="text-sm text-white drop-shadow-[2px_2px_0_black]">24&times;7 support</span><span className="text-white px-2">|</span></li>
            <li className="flex items-center gap-1"><span><img src="/profile.png" width={22} alt="" /></span><span className="text-sm text-white drop-shadow-[2px_2px_0_black]">24&times;7 support</span><span className="text-white px-2">|</span></li>
            <li className="flex items-center gap-1"><span><img src="/star.png" width={22} alt="" /></span><span className="text-sm text-white drop-shadow-[2px_2px_0_black]">24&times;7 support</span></li>
          </ul>
        </div>
      </section>

      {/****************************************************/}
      <section className=" h-[100vh] bg-[#f3f3f1]">
        <div className="rounded-xl h-[100vh] relative">
          <Image src={imageKeys[index]} fill alt="img" className="object-cover opacity-80" />
          <div className="absolute left-1/2 -translate-x-1/2 top-14 text-white">
            <h2 className={`${poppins.className} font-extrabold text-7xl tracking-wide text-yellow-300`}>DESTINATIONS</h2>
            <p className={`${poppins.className} text-center font-medium text-lg tracking-widest`}>for every bucket list</p>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-40 flex items-center gap-5 text-white">
            <button onClick={handlePreview} className="cursor-pointer"><img src="/section2/leftarrow.png" alt="" /></button>
            <p className={`${poppins.className} font-extrabold text-2xl text-center text-yellow-300`}>{images[imageKeys[index]]}</p>
            <button onClick={handleNext} className="cursor-pointer"><img src="/section2/rightarrow.png" alt="" /></button>
          </div>
          <button onClick={handleClick} className={`${poppins.className} absolute left-1/2 -translate-x-1/2 bottom-25 bg-red-600 px-6 py-2.5 rounded-full  text-white font-semibold cursor-pointer text-sm`}>Discover more</button>
        </div>
      </section>
      {/***************************************************/}
      
      <section className="relative h-[110vh]">
        {/* Background image */}
        <Image
          src="/section3/hampi.avif"
          fill
          alt="img"
          className="object-cover opacity-40"
        />

        <div className="absolute left-1/2 -translate-x-1/2 top-10 text-white">
          <h2 className={`${poppins.className} font-extrabold text-7xl tracking-wide text-[#3bb3e3]`}>ATTRACTIONS</h2>
          <p className={`${poppins.className} text-center font-medium text-lg tracking-widest text-[#3bb3e3]`}
          >&lt; worth a thousand stories &gt;</p>
        </div>

        {/* Carousel wrapper */}
        <div className="absolute bottom-35 left-1/2 -translate-x-1/2 w-[95vw] overflow-hidden">
          {/* Cards container */}
          <div className="flex transition-transform duration-500 ease-in-out items-center"
            style={{ transform: `translateX(-${idx * cardWidth}px)` }}>
              {cards.map((card, index) => (
              <div key={index} className="relative h-[350px] w-[250px] p-2 m-2 flex-shrink-0 transform transition-transform duration-300 hover:-translate-y-3 group ">
                <Image
                  src={card.img}
                  fill
                  alt={card.title}
                  className="rounded-2xl object-cover"
                />
                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl"></div>
                <p className={`absolute  left-1/2 -translate-x-1/2 bottom-10 text-white text-[22px]  group-hover:bottom-18 arthur-hill tracking-wider`}>
                  {card.title}
                </p>
                <button onClick={handleClick} className={`${poppins.className} absolute left-1/2 -translate-x-1/2 bottom-8 bg-red-600 px-6 py-2 rounded-full  text-white font-semibold cursor-pointer text-[10px] hidden group-hover:block
                `}>Explore</button>
              </div>
            ))}
          </div>
        </div>
        {/* Navigation buttons */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-20 flex items-center gap-8 text-white">
          <button onClick={handlePre} className="cursor-pointer">
            <img src="/section3/arrow-left.png" alt="Previous" />
          </button>
          <button onClick={handleNxt} className="cursor-pointer">
            <img src="/section3/arrow-right.png" alt="Next" />
          </button>
        </div>
        <button onClick={handleClick} className={`${poppins.className} absolute left-1/2 -translate-x-1/2 bottom-5 bg-red-600 px-6 py-2.5 rounded-full  text-white font-semibold cursor-pointer text-sm`}>Discover more</button>
      </section>

    </>
  );
}


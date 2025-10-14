"use client"
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Poppins } from "next/font/google";
import { Playwrite_HU } from "next/font/google";
import { useRouter } from "next/navigation";
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";


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

  const mainTitleRef = useRef(null)

  //Changer => Change image every 2 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % coverImages.length);
    }, 2000)
    return () => clearInterval(interval); //cleanup
  }, [coverImages.length])


  useEffect(() => {

    gsap.registerPlugin(ScrollTrigger);

    const word = document.querySelector('#head')
    function breakText() {

      const text = word.textContent
      console.log(text)
      const splittedText = text.split("")
      // console.log(splittedText)
      let clutter = ""

      splittedText.forEach((e) => {
        clutter += `<span>${e}</span>`
      })

      word.innerHTML = clutter
    }
    breakText()
    const tl = gsap.timeline()

    gsap.from("#head span", {
      y: 100,
      opacity: 0,
      duration: 0.5,
      delay: 2,
      stagger: 0.1,
    })

    gsap.from('.page2tags', {
      x: -20,
      duration: 2,
      opacity: 0,
      stagger: 0.3,
      scrollTrigger: {
        trigger: '.page2tags',
        scroller: 'body',
        // markers: true,
        start: 'top 50%',
        end: "top 10%",
        scrub: 2,
      }

      // scale: 2,
    })
  }, [])



  const mainRef = useRef(null)
  const cursorRef = useRef(null)

  useEffect(() => {
    const main = mainRef.current;
    const cursor = cursorRef.current;
    if (!cursor) return
    // console.log(mainRef.current.getBoundingClientRect().top)
    const moveCursor = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // Get container's position relative to viewport
      const containerRect = main.getBoundingClientRect();
      const containerX = containerRect.left;  // Usually 0, but accounts for any horizontal offset
      const containerY = containerRect.top;   // This is key: e.g., 0 or 20px offset

      // Robust size reading
      const rect = cursor.getBoundingClientRect();
      const cursorWidth = rect.width;
      const cursorHeight = rect.height;
      // Target relative to CONTAINER (subtract container offset from mouse)
      const targetX = (mouseX - containerX) - cursorWidth / 2;
      const targetY = (mouseY - containerY) - cursorHeight / 2;

      gsap.to(cursor, {
        x: targetX,
        y: targetY,
        duration: 0.1,
        ease: 'expoScale(0.5, 7, none)'
      });

    };
    main.addEventListener("mousemove", moveCursor);
    return () => {
      main.removeEventListener("mousemove", moveCursor);
    };
  }, [])

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
      <section ref={mainRef} className="h-[86vh] relative">
        <Image
          src={coverImages[currentIndex]}
          fill
          alt="cover image"
          className="object-cover relative transition-opacity duration-700 opacity-80"
        />
        <div ref={cursorRef} className=" w-[20px] h-[20px] absolute top-0 left-0 rounded-full m-0 p-0 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
            <path d="M10 9.50003L5.27531 4.47565C4.85705 4.0245 4.92403 3.69496 5.41729 3.40965C6.34454 2.8733 7.06689 2.85873 8.04428 3.39511L12.949 6.08675C13.2982 6.27836 13.6406 6.47259 14 6.57855" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M12.5 13.6632L14.6103 20.4697C14.7826 21.0255 15.086 21.1263 15.556 20.8568C16.4396 20.3501 16.7958 19.765 16.8197 18.7107L16.9395 13.4198C16.9555 12.7131 16.9526 12.0215 17.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M8.32846 10.9843L10.2154 9.60557L14.6377 6.38136L14.6416 6.37851L14.6491 6.37301C14.7535 6.29661 16.3094 5.16238 17.1919 4.77581C18.2765 4.30067 19.2869 4.52156 20.3739 4.82515C20.9362 4.98218 21.2173 5.06069 21.4202 5.20717C21.742 5.43958 21.9513 5.79728 21.9943 6.18852C22.0215 6.4351 21.9498 6.71459 21.8065 7.27356L21.8065 7.27358C21.5294 8.35431 21.2181 9.32819 20.2588 10.0175C19.4782 10.5784 17.7045 11.341 17.5856 11.3919L17.5771 11.3955L17.5726 11.3974L12.5317 13.5645L10.3782 14.4876L10.3782 14.4876C9.5974 14.8223 9.207 14.9896 8.94139 15.3002C8.31933 16.0275 8.23148 17.3438 7.99931 18.2494C7.87101 18.7498 7.16748 19.6171 6.54058 19.4869C6.15355 19.4065 6.14613 18.922 6.09796 18.6131L5.6342 15.6389C5.5233 14.9276 5.51479 14.9131 4.94599 14.4627L2.56757 12.5793C2.32053 12.3836 1.89903 12.135 2.022 11.7641C2.22119 11.1633 3.33408 10.9957 3.83747 11.1363C4.74834 11.3907 5.94747 11.9738 6.89684 11.8058C7.3022 11.7341 7.64428 11.4842 8.32844 10.9843L8.32846 10.9843Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
        <div
          className={`${poppins.className} absolute w-full h-full flex flex-col items-center justify-center`}
        >
          <h1 ref={mainTitleRef} id="head" className="text-white text-8xl font-medium  tracking-wider text-outline drop-shadow-[2px_2px_0_black] malvides">
            Dream to Destination
          </h1>
          <style jsx>{`#head span {display: inline-block;}`}</style>

          <p className="text-black font-bold text-4xl tracking-wide drop-shadow-[2px_2px_0_pink] malvides tagline">
            Where every trip start with a smile and
          </p>
          <p className=" w-[250px] h-[50px] bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center tagline">
            <span className="text-yellow-200 font-medium text-3xl drop-shadow-[1px_1px_0_red] malvides">
              ends with a story
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
            <h2 className={`${poppins.className} font-extrabold text-7xl tracking-wide text-yellow-300 page2tags`}>DESTINATIONS</h2>
            <p className={`${poppins.className} text-center font-medium text-lg tracking-widest page2tags`}>for every bucket list</p>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-40 flex items-center gap-5 text-white page2tags">
            <button onClick={handlePreview} className="cursor-pointer"><img src="/section2/leftarrow.png" alt="" /></button>
            <p className={`${poppins.className} font-extrabold text-2xl text-center text-yellow-300`}>{images[imageKeys[index]]}</p>
            <button onClick={handleNext} className="cursor-pointer"><img src="/section2/rightarrow.png" alt="" /></button>
          </div>
          <button onClick={handleClick} className={`${poppins.className} absolute left-1/2 -translate-x-1/2 bottom-25 bg-red-600 px-6 py-2.5 rounded-full  text-white font-semibold cursor-pointer text-sm page2tags`}>Discover more</button>
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


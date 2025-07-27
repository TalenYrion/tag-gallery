import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";

const categories = [
  "recent",
  "school_harem",
  "boobs",
  "ass",
  "thighs",
  "cowgirl",
  "bondage",
  "maid",
  "anal",
  "glasses",
  "bikini",
  "nude",
  "cum",
  "threesome",
  "ahegao",
  "double_penetration",
  "fingering",
  "insemination",
  "internal_cumshot",
];

function App() {
  const [category, setCategory] = useState("recent");
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    import(`./data/${category}.json`)
      .then((mod) => {
        setImages(mod.default || mod);
        setIndex(0);
      })
      .catch(() => setImages([]));
  }, [category]);

  const nextImage = () => setIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  const downloadImage = async () => {
    const url = images[index].file_url;
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = url.split("/").pop();
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(objectUrl);
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div
      className="min-h-screen bg-black text-white flex flex-col items-center pt-4 pb-20"
      {...handlers}
    >
      <h1 className="text-3xl font-bold mb-4 text-center">
        NSFW Anime Slideshow
      </h1>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1 rounded text-sm ${
              category === cat ? "bg-pink-600" : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {cat.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      {/* Image */}
      {images.length > 0 ? (
        <>
          <img
            src={images[index].file_url}
            alt="anime"
            className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-lg mb-4 transition-all duration-300"
          />

          <p className="mt-2 text-sm text-gray-400 text-center px-2">
            Tags: {images[index].tag_string}
          </p>
        </>
      ) : (
        <p className="text-red-400">No images found for "{category}"</p>
      )}

      {/* Fixed Control Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 py-3 flex justify-center gap-4 border-t border-gray-700">
        <button
          onClick={prevImage}
          className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
        >
          Prev
        </button>
        <button
          onClick={nextImage}
          className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
        >
          Next
        </button>
        <button
          onClick={downloadImage}
          className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
        >
          <FaDownload />
          Download
        </button>
      </div>
    </div>
  );
}

export default App;

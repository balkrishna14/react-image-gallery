import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {

  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(2);

  const fetchImages = async () => {
    try {
      const { data } = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=20`
      );
      setUserData(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  const handlePrevious = () => {
    if (page > 2) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold text-center mb-8">
        Image Gallery
      </h1>
      
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

        {userData.map((image) => (
          <a
            key={image.id}
            href={image.url}
            target="_blank"
            rel="noreferrer"
            className="group"
          >
            <div className="rounded-xl overflow-hidden shadow-lg bg-gray-800 hover:shadow-2xl transition duration-300">

              <img
                src={image.download_url}
                alt={image.author}
                className="h-48 w-full object-cover group-hover:scale-110 transition duration-300"
              />

              <div className="p-3 text-center">
                <p className="font-semibold text-sm truncate">
                  {image.author}
                </p>
              </div>

            </div>
          </a>
        ))}

      </div>

      <div className="flex justify-center items-center gap-6 mt-10">

        <button
          onClick={handlePrevious}
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition active:scale-95"
        >
          Previous
        </button>

        <span className="text-lg font-semibold bg-white text-black px-4 py-2 rounded-lg">
          Page {page - 1}
        </span>

        <button
          onClick={handleNext}
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition active:scale-95"
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default App;
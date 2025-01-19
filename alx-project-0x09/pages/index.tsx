// import { ImageProps } from "@/interfaces";
// import { useState } from "react";
// import ImageCard from "@/components/common/ImageCard";

// const Home: React.FC = () => {
//   const [prompt, setPrompt] = useState<string>("");  // State for the user's prompt
//   const [imageUrl, setImageUrl] = useState<string>(""); // State to store the generated image URL
//   const [generatedImages, setGeneratedImages] = useState<ImageProps[]>([]); // State to store an array of generated images (currently unused)
//   const [isLoading, setIsLoading] = useState<boolean>(false); // State to manage loading state (currently unused)

//   // Function to handle image generation (currently only logs a message)
//   const handleGenerateImage = async () => {
//     setIsLoading(true); // Set loading state to true
//     const resp = await fetch("/api/generate-image", { // Make a request to the image generation API 
//       method: "POST", // Use the POST method
//       body: JSON.stringify({ prompt }),// Send the prompt in the request body
//       headers: { // Set the headers for the request
//         "Content-Type": "application/json", // Use JSON content type
//       },
//     });

//     if (resp.ok) {
//       setIsLoading(false);
//       return;
//     }
//     const data = await resp.json(); // Parse the JSON response
//     setIsLoading(false); 
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
//       {/* Container for the input and button */}
//       <div className="flex flex-col items-center">
//         <h1 className="text-4xl font-bold mb-2">Image Generation App</h1>
//         <p className="text-lg text-gray-700 mb-4">
//           Generate stunning images based on your prompts!
//         </p>

//         <div className="w-full max-w-md">
//           <input
//             type="text"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             placeholder="Enter your prompt here..."
//             className="w-full p-3 border border-gray-300 rounded-lg mb-4"
//           />
//           <button
//             onClick={handleGenerateImage}
//             className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
//           >
//             {
//               isLoading ? "Loading..." : "Generate Image" // Display "Loading..." when loading
//             }
//           </button>
//         </div>

//         {/* Conditionally render the ImageCard if imageUrl is not empty */}
//         {imageUrl && (
//           <ImageCard
//             action={() => setImageUrl(imageUrl)} // This action doesn't do anything meaningful
//             imageUrl={imageUrl}
//             prompt={prompt}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;


import ImageCard from "@/components/common/ImageCard";
import React, { useState } from "react";

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const handleGenerateImage = async () => {
    setIsLoading(true);
    const resp = await fetch('/api/generate-image', {
      method: 'POST',
      body: JSON.stringify({
        prompt
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })


    if (!resp.ok) {
      setIsLoading(false)
      return;
    }

    const data = await resp.json()
    setImageUrl(data.message)
    setIsLoading(false)

  
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-2 text-black">Image Generation App</h1>
        <p className="text-lg text-gray-700 mb-4">
          Generate stunning images based on your prompts!
        </p>

        <div className="w-full max-w-md">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full p-3 border border-gray-300 text-black rounded-lg mb-4"
          />
          <button
            onClick={handleGenerateImage}
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {
              isLoading ? "Loading..." : "Generate Image"
            }
          </button>
        </div>

        {imageUrl && <ImageCard action={() => setImageUrl(imageUrl)} imageUrl={imageUrl} prompt={prompt} />}
      </div>
    </div>
  );
};

export default Home;
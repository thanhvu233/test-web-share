import { useEffect, useState } from "react";
import "./App.css";
import { convert } from "html-to-text";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function App() {
  const [htmlContent, setHtmlContent] = useState("");

  async function extractImages() {
    const parser = new DOMParser();
    const parsedHtmlContent = parser.parseFromString(htmlContent, "text/html");
    const images = parsedHtmlContent.querySelectorAll("img");
    const imageSources = Array.from(images).map((img) => img.src);

    const resultFile = imageSources.map(async (url, index) => {
      const blob = await fetch(url);

      const file = new File([blob], `Image ${index+1}`, { type: "image/png" });

      return file;
    });

    return await Promise.all(resultFile);
  }

  const extractText = () => {
    // Create a container element
    let parsedHtmlContent = document.createElement("div");

    // Convert the HTML string into DOM elements
    parsedHtmlContent.innerHTML = htmlContent;

    const images = parsedHtmlContent.querySelectorAll("img");

    images.forEach((element) => {
      element.replaceWith(document.createElement("br"));
    });

    return parsedHtmlContent.innerText;
  };

  const handleSharing = async () => {
    const imageArray = await extractImages();

    const content = extractText();

    console.log(imageArray);
    console.log(content);


    if (navigator.share) {
      try {
        await navigator
          .share({
            text: content,
            files: imageArray,
            title: 'NSICU'
          })
          .then(() =>
            console.log("Hooray! Your content was shared to tha world")
          );
      } catch (error) {
        console.log(`Oops! I couldn't share to the world because: ${error}`);
      }
    } else {
      // fallback code
      console.log(
        "Web share is currently not supported on this browser. Please provide a callback"
      );
    }
  };

  return (
    <>
      <div className="App">
        <ReactQuill
          value={htmlContent}
          modules={{
            toolbar: ["image"],
          }}
          theme="snow"
          onChange={(value) => {
            setHtmlContent(value);
          }}
        />

        <div className="share-btn">
          <button onClick={handleSharing}>
            <span>Share</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

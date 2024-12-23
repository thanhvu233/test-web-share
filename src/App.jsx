import { useState } from "react";
import "./App.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function App() {
  const [htmlContent, setHtmlContent] = useState("");

  const convertBase64ToFile = (base64, fileName, mimeType) => {
    // Decode the base64 string
    const byteString = atob(base64.split(",")[1]);

    // Create an array of 8-bit unsigned integers
    const arrayBuffer = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      arrayBuffer[i] = byteString.charCodeAt(i);
    }

    // Create a blob and then a file
    const blob = new Blob([arrayBuffer], { type: mimeType });
    return new File([blob], fileName, { type: mimeType });
  }

  const extractImages = () => {
    const parser = new DOMParser();
    const parsedHtmlContent = parser.parseFromString(htmlContent, "text/html");
    const images = parsedHtmlContent.querySelectorAll("img");
    const imageSources = Array.from(images).map((img) => img.src);

    const resultFile = imageSources.map((src, index) => {
      const file = convertBase64ToFile(src, `picture${index+1}.jpg`, 'image/jpeg');

      return file;
    });

    return resultFile;
  }

  const extractText = () => {
    // Create a container element
    let parsedHtmlContent = document.createElement("div");

    // Convert the HTML string into DOM elements
    parsedHtmlContent.innerHTML = htmlContent;

    const images = parsedHtmlContent.querySelectorAll("img");

    images.forEach((element) => {
      element.replaceWith('\n');
    });

    return parsedHtmlContent.innerText;
  };

  const handleSharing = async () => {
    const imageArray = extractImages();

    const content = extractText();

    if (navigator.share) {
      try {
        await navigator
          .share({
            text: content,
            files: imageArray,
            title: "NSICU",
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

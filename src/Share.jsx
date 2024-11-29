import React from "react";
function Share({ label, text, title, files }) {
  const shareDetails = { title, text, files };

  const handleSharing = async () => {
    if (navigator.share) {
      try {
        await navigator
          .share(shareDetails)
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
    <button onClick={handleSharing}>
      <span>{label}</span>
    </button>
  );
}
export default Share;
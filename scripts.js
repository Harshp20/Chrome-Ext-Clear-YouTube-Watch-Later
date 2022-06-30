chrome.runtime.onMessage.addListener((data, sender, response) => {
  if (data.message === "run") {
    const youtubeBaseUrl = "https://www.youtube.com";
    const youtubeWatchLaterUrl = `${youtubeBaseUrl}/playlist?list=WL`;
    const youtubeLikedVideosUrl = `${youtubeBaseUrl}/playlist?list=LL`;
    if (window.location.href === youtubeWatchLaterUrl) {
      if (document.querySelector("ytd-playlist-video-list-renderer")) {
        clearWatchLater();
      } else {
        alert(
          "Please log in to your YouTube account before running the extension."
        );
      }
    } else {
      window.focus();
      window.location.href = youtubeWatchLaterUrl;
      alert("Please run the extension again.");
    }
  }
});

const clearWatchLater = () => {
  // Getting videos list from local storage
  let videos = localStorage.getItem("Deleted Videos");
  // Initialising with an empty array if not present
  videos = videos ? videos.split(",") : [];
  // Checking url for YouTube Watch Later
  setInterval(() => {
    let playlistWatchLater = document.querySelector(
      "ytd-playlist-video-list-renderer"
    );

    // Getting the title of video being deleted below
    // 1. Fetched the list of videos
    let video = playlistWatchLater.querySelector('[id="contents"]');
    // 2. Grabbed the first video
    video = video.querySelector(
      '[class="style-scope ytd-playlist-video-list-renderer"]'
    );
    // 3. Grabbed video title
    const videoTitle = video.querySelector("[id=video-title]").innerText;
    // 4. Pushed video title to the videos array
    videos.push(videoTitle);
    // 5. Setting local storage with the videos list
    localStorage.setItem("Deleted Videos", videos);

    playlistWatchLater.querySelector('[id="button"]').click();

    setTimeout(() => {
      playlistWatchLater = document.getElementsByClassName(
        "style-scope yt-formatted-string"
      );
      for (let i = 0; i < playlistWatchLater.length; i++) {
        if (playlistWatchLater[i].innerText === "Remove from ") {
          console.log(playlistWatchLater[i]);
          playlistWatchLater[i].click(); // ITEM DELETED
        }
      }
    }, 1000);
  }, 1000);
};

const videoPlayer = document.getElementById("background_video");
const replayBGVideo = () => {
  console.log(videoPlayer);
  videoPlayer.load();
};

document.addEventListener("DOMContentLoaded", (event) => {
  const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 6,
    onRepeat: replayBGVideo,
  });
  tl.fromTo("header", { opacity: 1 }, { opacity: 0, delay: 8 });
  tl.to("main", { opacity: 1 });
  tl.fromTo(".descrition", { opacity: 0 }, { opacity: 1, delay: 1 });
});

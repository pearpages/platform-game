function createWatch() {
  // Create the new div element
  const watchDiv = document.createElement("div");
  watchDiv.id = "watch";
  watchDiv.textContent = "00:00:00";

  // Append the new div to the parent element
  document.getElementById("counters")!.appendChild(watchDiv);
}

const watch = {
  counter: 0,
  init() {
    createWatch();
    setInterval(this.updateCounter.bind(this), 1000);
  },
  reset() {
    this.counter = 0;
  },
  updateCounter() {
    this.counter++;

    // Calculate hours, minutes and seconds
    let hours = Math.floor(this.counter / 3600);
    let minutes = Math.floor((this.counter - hours * 3600) / 60);
    let seconds = this.counter - hours * 3600 - minutes * 60;

    // Update the text content
    document.getElementById("watch")!.textContent = `${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  },
};

export { watch };

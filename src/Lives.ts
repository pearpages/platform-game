function init(current: string) {
  // Create the new div element
  const watchDiv = document.createElement("div");
  watchDiv.id = "lives";
  watchDiv.textContent = `${current} lives`;

  // Append the new div to the parent element
  document.getElementById("counters")!.appendChild(watchDiv);
}

const lives = {
  init,
  update(current: string) {
    // Update the text content
    document.getElementById("lives")!.textContent = `${current} lives`;
  },
};

export { lives };

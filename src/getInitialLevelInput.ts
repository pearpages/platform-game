function getQueryParam(param: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function manageLevelErrors(value: number, totalLevels: number): number {
  if (isNaN(value) || value > totalLevels || value < 0) {
    alert("Level does not exist");
    return 0;
  }
  return value;
}

export { getQueryParam, manageLevelErrors };

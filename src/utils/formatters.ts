export function formatNumber(count: number, suffix = ""): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M" + (suffix ? ` ${suffix}` : "");
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K" + (suffix ? ` ${suffix}` : "");
  }
  return count.toString() + (suffix ? ` ${suffix}` : "");
}

export function formatEngagementRate(rate: number | undefined): string {
  if (rate === undefined) return "N/A";
  return (rate * 100).toFixed(2) + "%";
}

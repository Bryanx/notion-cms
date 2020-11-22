
export function toNotionImageUrl(url: string) {
  const imageUrl = new URL(
    url.startsWith("https://www.notion.so")
      ? url
      : `https://www.notion.so${url.startsWith("/image") ? url : `/image/${encodeURIComponent(url)}`}`
  );

  return `https://ssfy.io/${encodeURIComponent(imageUrl.toString())}`;
}
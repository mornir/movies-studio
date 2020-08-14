export default function resolveProductionUrl(document) {
  // First, we select a specific type of document
  if (document._type === "movie") {
    return `https://nuxt-sanity-movies.netlify.app/${document.slug.current}/?preview=true`
  }
  return undefined
}

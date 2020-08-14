export default function resolveProductionUrl(document) {
  const slug = document.slug?.current
  if (!slug) {
    return undefined
  }

  // Only show the preview option for documents for which a preview makes sense.
  if (document._type === 'movie') {
    return `https://nuxt-sanity-movies.netlify.app/${slug}/?preview=true`
  }

  return undefined
}

export default function resolveProductionUrl(document) {
  const slug = document.slug?.current
  if (!slug) {
    return undefined
  }

  if (document._type === 'movie') {
    return `https://nuxt-sanity-movies.netlify.app/${slug}/?preview=true`
  }

  return undefined
}

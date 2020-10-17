import React from 'react'
import { MdEdit, MdVisibility } from 'react-icons/md'
import S from '@sanity/desk-tool/structure-builder'

const url = 'https://nuxt-sanity-movies.netlify.app/'

const WebPreview = ({ document }) => {
  const { displayed } = document
  const slug = displayed.slug?.current

  if (!slug) {
    return <h1>Please set a slug to see a preview</h1>
  }

  const targetURL = url + slug + `/?preview=true`
  return <iframe src={targetURL} frameBorder={0} width="100%" height="100%" />
}

export const getDefaultDocumentNode = ({ schemaType }) => {
  // Only show the iframe for documents for which a preview makes sense.
  if (schemaType === 'movie') {
    return S.document().views([
      S.view.form().icon(MdEdit),
      S.view.component(WebPreview).title('Web Preview').icon(MdVisibility),
    ])
  }
}

export default S.defaults()

import React from 'react'
import { MdMenu, MdEdit, MdVisibility } from 'react-icons/md'
import S from '@sanity/desk-tool/structure-builder'
import { useValidationStatus } from '@sanity/react-hooks'

const url = 'https://nuxt-sanity-movies.netlify.app/'

const hiddenDocTypes = (listItem) => !['menu'].includes(listItem.getId())

const WebPreview = ({ document }) => {
  const { displayed, published } = document
  const slug = displayed.slug?.current

  const { markers } = useValidationStatus(published._id, published._type)

  if (markers.length !== 0) {
    return (
      <h1>
        Please fill out all required fields in order to the see the preview.
      </h1>
    )
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

export default () =>
  S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems().filter(hiddenDocTypes),
      S.divider(),
      S.listItem()
        .title('Menu')
        .icon(MdMenu)
        .child(
          S.editor()
            .id('menu')
            .schemaType('menu')
            .documentId('menu')
            .title('Menu')
        ),
    ])

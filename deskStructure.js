import React from 'react'
import { MdMenu, MdEdit, MdVisibility, MdThumbUp } from 'react-icons/md'
import S from '@sanity/desk-tool/structure-builder'
import SocialPreview from 'part:social-preview/component'
import { toPlainText } from 'part:social-preview/utils'

const url = 'https://nuxt-sanity-movies.netlify.app/'

const hiddenDocTypes = (listItem) =>
  !['menu', 'home'].includes(listItem.getId())

const WebPreview = ({ document }) => {
  const { displayed } = document
  const slug = displayed.slug?.current

  console.log(document);

  if (!slug) {
    return <h1>Please set a slug to see a preview</h1>
  }

  let targetURL = url + slug + `/?preview=true`

  if (displayed._type === 'movie') {
    targetURL = url + 'movies/' + slug + `/?preview=true`
  }

  return <iframe src={targetURL} frameBorder={0} width="100%" height="100%" />
}

export const getDefaultDocumentNode = ({ schemaType }) => {
  // Only show the iframe for documents for which a preview makes sense.
  if (schemaType === 'movie') {
    return S.document().views([
      S.view.form().icon(MdEdit),
      S.view.component(WebPreview).title('Web Preview').icon(MdVisibility),
      S.view
        .component(
          SocialPreview({
            // Overwrite prepareFunction to pick the right fields
            prepareFunction: (
              {
                title,
                overview,
                poster,
              } /* this object is the currently active document */
            ) => ({
              title,
              description: toPlainText(overview || []),
              siteUrl: 'https://movies.dev',
              ogImage: poster,
            }),
          })
        )
        .title('Social & SEO')
        .icon(MdThumbUp),
    ])
  }
}

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home')
        .icon(MdMenu)
        .child(
          S.editor()
            .id('home')
            .schemaType('home')
            .documentId('home')
            .title('Home')
            // Custom view
            .views([
              S.view.form().icon(MdEdit),
              S.view
                .component(WebPreview)
                .title('Web Preview')
                .icon(MdVisibility),
            ])
        ),
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

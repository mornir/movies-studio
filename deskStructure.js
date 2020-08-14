import React from "react"
import { MdEdit, MdVisibility } from "react-icons/lib/md"
import S from "@sanity/desk-tool/structure-builder"

const url = "https://nuxt-sanity-movies.netlify.app/"

const WebPreview = ({ document }) => {
  const { displayed } = document
  const targetURL = url + displayed.slug.current + `/?preview=true`

  return <iframe src={targetURL} frameBorder={0} width="100%" height="100%" />
}

export const getDefaultDocumentNode = ({ schemaType }) => {
  // Conditionally return a different configuration based on the schema type
  if (schemaType === "movie") {
    return S.document().views([
      S.view.form().icon(MdEdit),
      S.view.component(WebPreview).title("Web Preview").icon(MdVisibility),
    ])
  }
}

export default S.defaults()

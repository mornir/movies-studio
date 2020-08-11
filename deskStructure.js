import React from "react"
import S from "@sanity/desk-tool/structure-builder"

const isDraft = (id) => id.includes("drafts")

// Simple example of web preview
const url = "http://localhost:3000/"
const WebPreview = ({ document }) => {
  const { displayed } = document
  console.count(displayed._id)
  return (
    <iframe
      id="frame"
      src={
        url +
        displayed.slug.current +
        `/?preview&pageId=${displayed._id}${
          isDraft(displayed._id) ? "&isDraft=true" : ""
        }`
      }
      frameBorder={0}
      width="100%"
      height="100%"
    />
  )
}

export const getDefaultDocumentNode = ({ schemaType }) => {
  // Conditionally return a different configuration based on the schema type
  if (schemaType === "movie") {
    return S.document().views([
      S.view.form(),
      S.view.component(WebPreview).title("Web Preview"),
    ])
  }
}

export default S.defaults()

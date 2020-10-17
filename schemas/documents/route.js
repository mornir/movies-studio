import { MdLink } from 'react-icons/md'

export default {
  name: 'route',
  type: 'document',
  title: 'URL',
  icon: MdLink,
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'This description populates meta-tags on the webpage',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'openGraphImage',
      type: 'image',
      title: 'Open Graph Image',
      description: 'Image for sharing previews on Facebook, Twitter etc.',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      slug: 'slug.current',
      pageTitle: 'title',
    },
    prepare({ slug, pageTitle }) {
      return {
        title: pageTitle,
        subtitle: slug === '/' ? '/' : `/${slug}`,
      }
    },
  },
}

export default {
  name: 'menu',
  title: 'Menu',
  type: 'document',
  fields: [
    {
      title: 'Navigation',
      name: 'navigation',
      type: 'array',
      validation: Rule => Rule.required().min(1).unique(),
      of: [
        {
          type: 'reference',
          to: [{ type: 'route' }],
        },
      ],
    },
  ],
}

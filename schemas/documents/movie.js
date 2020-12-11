import { MdLocalMovies } from 'react-icons/md'

export default {
  name: 'movie',
  title: 'Movie',
  type: 'document',
  icon: MdLocalMovies,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 100,
      },
    },
    {
      name: 'overview',
      title: 'Overview',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'releaseDate',
      title: 'Release date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'externalId',
      title: 'External ID',
      type: 'number',
    },
    {
      name: 'popularity',
      title: 'Popularity',
      type: 'number',
    },
    {
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    },
    {
      name: 'castMembers',
      title: 'Cast Members',
      type: 'array',
      of: [{ type: 'castMember' }],
      validation: (Rule) => Rule.min(1).warning('No cast members'),
    },
    {
      name: 'crewMembers',
      title: 'Crew Members',
      type: 'array',
      of: [{ type: 'crewMember' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'releaseDate',
      media: 'poster',
      castName0: 'castMembers.0.person.name',
      castName1: 'castMembers.1.person.name',
    },
    prepare(selection) {
      const year = selection.date && selection.date.split('-')[0]
      const cast = [selection.castName0, selection.castName1]
        .filter(Boolean)
        .join(', ')

      return {
        title: `${selection.title} ${year ? `(${year})` : ''}`,
        date: selection.date,
        subtitle: cast,
        media: selection.media,
      }
    },
  },
}

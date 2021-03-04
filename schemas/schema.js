// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import objects
import blockContent from './objects/blockContent'
import crewMember from './objects/crewMember'
import castMember from './objects/castMember'
import plotSummary from './objects/plotSummary'
import plotSummaries from './objects/plotSummaries'

// We import documents
import movie from './documents/movie'
import person from './documents/person'
import screening from './documents/screening'
import route from './documents/route'

// We import singletons
import menu from './singletons/menu'
import home from './singletons/home'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    movie,
    person,
    screening,
    route,
    menu,
    home,
    blockContent,
    plotSummary,
    plotSummaries,
    castMember,
    crewMember,
  ]),
})

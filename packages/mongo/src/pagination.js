import paginate from 'mongoose-paginate-v2'
import aggPaginate from 'mongoose-aggregate-paginate-v2'

export function addPaginate(schema, agg = false) {
  if (agg) {
    schema.plugin(aggPaginate)

    return
  }

  schema.plugin(paginate)
}

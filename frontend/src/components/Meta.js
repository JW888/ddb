import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Demands Database',
  description: 'Create, Read, Update, Delete demands as required',
}

export default Meta
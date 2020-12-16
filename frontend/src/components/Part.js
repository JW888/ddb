import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Part = ({ part }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/part/${part._id}`}>
        <Card.Img src={part.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/part/${part._id}`}>
          <Card.Title as='div'>
            <strong>{part.item_name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          Part Number: {part.part_number}
        </Card.Text>

        <Card.Text as='div'>
          NIIN: {part.niin}
        </Card.Text>

      </Card.Body>
    </Card>
  )
}

export default Part

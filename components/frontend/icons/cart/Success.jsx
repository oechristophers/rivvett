import React from 'react'
import Center from '../../Center'
import Box from '../../Box'
import ColumnWrapper from './ColumnWrapper'

export default function OrderSuccess() {
  return (
    <Center>
    <ColumnWrapper>
      <Box empty>
        <h1>Thanks for your order!</h1>
        <p>We will email you when your order will be sent.</p>
      </Box>
    </ColumnWrapper>
  </Center>
  )
}

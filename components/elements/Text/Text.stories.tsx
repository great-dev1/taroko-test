import { capitalize } from 'lodash'
import React from 'react'

import Text, { TextProps } from './Text'
import docs from './Text.docs.mdx'

const types: TextProps['type'][] = ['heading-l', 'heading-m', 'heading-s', 'body-m', 'body-s', 'caption']

const variants: TextProps['variant'][] = ['accent', 'primary', 'secondary', 'success', 'danger', 'default']

export default {
  title: 'Text',
  component: Text,
  parameters: {
    docs: { page: docs },
  },
}

export function Base(args: TextProps): JSX.Element {
  return <Text {...args}>Example text</Text>
}

export function Types(args: TextProps): JSX.Element {
  return (
    <>
      {types.map((v, i) => (
        <Text {...args} key={i} type={v}>
          {capitalize(v)}
        </Text>
      ))}
    </>
  )
}

export function Variants(args: TextProps): JSX.Element {
  return (
    <>
      {variants.map((v, i) => (
        <Text {...args} key={i} variant={v}>
          {capitalize(v)}
        </Text>
      ))}
    </>
  )
}

export function Bold(args: TextProps): JSX.Element {
  return (
    <Text {...args} bold>
      Bold text
    </Text>
  )
}

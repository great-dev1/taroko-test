import cn from 'classnames'
import React, { forwardRef } from 'react'

import styles from './Text.module.scss'

export type TextVariant = 'accent' | 'primary' | 'secondary' | 'success' | 'danger' | 'light' | 'default' | 'dark'
export interface TextProps extends React.ComponentPropsWithoutRef<React.ElementType> {
  as?: React.ElementType
  bold?: boolean
  children?: React.ReactNode
  className?: string
  textAlign?: 'left' | 'center' | 'right'
  type?: 'heading-l' | 'heading-m' | 'heading-s' | 'body-m' | 'body-s' | 'body-l' | 'caption' | 'default'
  lineHeight?: 'lg' | 'md' | 'sm'
  variant?: TextVariant
  lineThrough?: boolean
  underline?: boolean
}

const Text: React.FC<React.PropsWithChildren<TextProps>> = forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Element = 'p',
      bold,
      children,
      className,
      textAlign = 'left',
      type = 'body-m',
      variant = 'default',
      lineHeight = 'md',
      lineThrough,
      underline,
      ...props
    },
    ref
  ) => (
    <Element
      ref={ref}
      className={cn(
        styles.root,
        styles[type],
        styles[variant],
        styles[textAlign],
        styles[`line-height-${lineHeight}`],
        bold && styles.bold,
        underline && styles.underline,
        lineThrough && styles.lineThrough,
        className
      )}
      {...props}
    >
      {children}
    </Element>
  )
)

Text.displayName = 'Text'

export default Text

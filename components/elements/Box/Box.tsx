import cn from 'classnames'
import React, { forwardRef } from 'react'

import styles from './Box.module.scss'

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  as?: React.ElementType
  variant?: 'light' | 'dark' | 'lightGrey'
  borderRadius?: 'xs' | 'sm' | 'md' | 'lg'
  borderless?: boolean
}

function Box(
  { as: Element = 'div', variant = 'dark', borderRadius = 'lg', borderless, className, children, ...props }: BoxProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  return (
    <Element
      ref={ref}
      className={cn(
        styles.root,
        styles[variant],
        styles[`radius-${borderRadius}`],
        borderless && styles.borderless,
        className
      )}
      {...props}
    >
      {children}
    </Element>
  )
}

export default forwardRef<HTMLElement, BoxProps>(Box)

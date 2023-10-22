import cn from 'classnames'
import { forwardRef, HTMLAttributes } from 'react'

import styles from './Row.module.scss'

export interface RowProps extends HTMLAttributes<HTMLElement> {
  gutter?: '0-5' | '0' | '1' | '1-5' | '2' | '2-5' | '3' | '3-5' | '4' | '4-5' | '5' | '6' | '7' | '8' | '9' | '10'
  gutterX?: '0-5' | '0' | '1' | '1-5' | '2' | '2-5' | '3' | '3-5' | '4' | '4-5' | '5' | '6' | '7' | '8' | '9' | '10'
  gutterY?: '0-5' | '0' | '1' | '1-5' | '2' | '2-5' | '3' | '3-5' | '4' | '4-5' | '5' | '6' | '7' | '8' | '9' | '10'
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  wrap?: boolean
  as?: React.ElementType
}

const Row = forwardRef<HTMLElement, RowProps>(
  (
    {
      as: Component = 'div',
      align = 'stretch',
      justify = 'start',
      gutter,
      gutterY,
      gutterX,
      wrap = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          styles.root,
          gutter && styles[`gutter-${gutter}`],
          gutterY && styles[`gutter-y-${gutterY}`],
          gutterX && styles[`gutter-x-${gutterX}`],
          styles[`align-${align}`],
          styles[`justify-${justify}`],
          wrap && styles.wrap,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

export default Row

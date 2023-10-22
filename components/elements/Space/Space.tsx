import cn from 'classnames'
import React, { forwardRef } from 'react'

import styles from './Space.module.scss'

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  gutter?: '0-5' | '0' | '1' | '1-5' | '2' | '2-5' | '3' | '3-5' | '4' | '4-5' | '5' | '6' | '7' | '8' | '9' | '10'
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch'
  wrap?: 'wrap' | 'nowrap'
  as?: React.ElementType
  childClassName?: string
}

function Space(
  {
    as: Component = 'div',
    direction = 'row',
    gutter = '0',
    align = 'stretch',
    justify = 'start',
    wrap = 'nowrap',
    className,
    children,
    childClassName,
    ...props
  }: React.PropsWithChildren<SpaceProps>,
  ref: React.ForwardedRef<HTMLElement>
) {
  return (
    <Component
      ref={ref}
      className={cn(
        styles.root,
        styles[`gutter-${gutter}`],
        styles[`direction-${direction}`],
        styles[`align-${align}`],
        styles[`justify-${justify}`],
        styles[`flex-${wrap}`],
        className
      )}
      {...props}
    >
      {React.Children.map(children, (ch) =>
        ch == null ? ch : <div className={cn(styles.item, childClassName)}>{ch}</div>
      )}
    </Component>
  )
}

export default forwardRef<HTMLElement, SpaceProps>(Space)

import cn from 'classnames'
import React, { forwardRef } from 'react'

import styles from './Col.module.scss'

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  alignSelf?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  justifySelf?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  flex?: 1 | 'none'
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto'
}

const Col = forwardRef<HTMLDivElement, ColProps>(
  ({ alignSelf, justifySelf, flex = 'none', width = 'auto', children, className, ...props }: ColProps) => {
    return (
      <div
        className={cn(
          styles.root,
          styles[`flex-${flex}`],
          styles[`w-${width}`],
          alignSelf && styles[`align-self-${alignSelf}`],
          justifySelf && styles[`justify-self-${justifySelf}`],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export default Col

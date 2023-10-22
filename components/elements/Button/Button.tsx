/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import cn from 'classnames'
import React, { forwardRef, useCallback } from 'react'

import { formatSizing, insertStyles } from '@/helper/styleUtils'
import styles from './Button.module.scss'

import Spinner from '@/components/elements/Spinner'

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLElement>, 'type' | 'value' | 'color'>,
    Omit<React.AnchorHTMLAttributes<HTMLElement>, 'value' | 'color'> {
  as?: React.ElementType
  disabled?: boolean
  endIcon?: React.ReactElement
  loading?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: React.ReactElement
  maxWidth?: number | string
  minWidth?: number | string
  variant?: 'accent' | 'primary' | 'secondary'
  width?: number | string 
}

const Button: React.FC<React.PropsWithChildren<ButtonProps & React.RefAttributes<HTMLElement>>> = forwardRef(
  (
    {
      as: Element = 'button',
      children,
      className,
      disabled,
      endIcon,
      icon,
      maxWidth,
      minWidth,
      size = 'md',
      style,
      type,
      variant = 'primary',
      width,
      loading,
      onClick,
      ...props
    },
    ref
  ) => {
    const handleClick = useCallback(
      (ev: any) => {
        if (loading) return
        onClick?.(ev)
      },
      [loading, onClick]
    )

    return (
      <Element
        ref={ref}
        type={Element === 'button' ? type || 'button' : undefined}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          styles.root,
          styles[variant],
          styles[size],
          disabled && styles.disabled,
          loading && styles.loading,
          className
        )}
        style={{
          ...insertStyles({
            '--button-width': formatSizing(width),
            '--button-min-width': formatSizing(minWidth),
            '--button-max-width': formatSizing(maxWidth),
          }),
          ...style,
        }}
        {...props}
      >
        {/* TODO add spinner variants */}
        {loading && <Spinner size="s" variant="surface" stroked={false} className={styles.loader} />}
        {icon && <span className={styles.icon}>{icon}</span>}

        {children && <span className={cn(styles.label, styles[size])}>{children}</span>}

        {endIcon && <span className={styles.icon}>{endIcon}</span>}
      </Element>
    )
  }
)

Button.displayName = 'Button'

export default Button

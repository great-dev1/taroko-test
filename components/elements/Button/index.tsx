import cn from 'classnames'
import { ComponentPropsWithoutRef, forwardRef, useCallback, useMemo } from 'react'

import styles from './Button.module.scss'
import { ButtonVariants, ButtonSizes, setInitialLoaderSize, setInitialLoaderVariant } from './utils'

import Spinner, { SpinnerProps } from '@/components/elements/Spinner'
import { formatSizing, insertStyles } from '@/helper/styleUtils'

export type { ButtonVariants }

type ButtonBaseProps = ComponentPropsWithoutRef<'button'>

export interface ButtonProps extends ButtonBaseProps {
  icon?: JSX.Element
  endIcon?: JSX.Element
  inline?: boolean
  size: ButtonSizes
  variant?: ButtonVariants
  loaderSize?: SpinnerProps['size']
  loaderVariant?: SpinnerProps['variant']
  radius?: 'xs' | 'sm' | 'md' | 'lg'
  loading?: boolean
  rounded?: boolean
  hovered?: boolean
  bold?: boolean
  maxWidth?: number | string
  minWidth?: number | string
  width?: number | string
  textAlign?: 'left' | 'center' | 'right'
}

export interface ButtonNoneProps extends ButtonBaseProps {
  variant?: 'none'
  inline?: never
  icon?: never
  endIcon?: never
  size: never
  loaderSize?: never
  loaderVariant?: never
  radius?: never
  loading?: never
  rounded?: never
  hovered?: never
  bold?: never
  maxWidth?: never
  minWidth?: never
  width?: never
  textAlign?: never
}

const Button = forwardRef<HTMLButtonElement, ButtonNoneProps | ButtonProps>(
  (
    {
      icon,
      inline,
      children,
      endIcon,
      variant = 'default',
      size,
      loaderSize = setInitialLoaderSize(size),
      loaderVariant = setInitialLoaderVariant(variant as ButtonVariants),
      radius = 'sm',
      loading,
      rounded,
      hovered,
      bold,
      type = 'button',
      minWidth,
      maxWidth,
      width,
      style,
      textAlign,
      className,
      onClick,
      disabled,
      'aria-disabled': ariaDisabled,
      ...props
    },
    ref
  ) => {
    const rootStyle = useMemo(
      () => ({
        ...insertStyles({
          '--button-width': formatSizing(width),
          '--button-min-width': formatSizing(minWidth),
          '--button-max-width': formatSizing(maxWidth),
          '--text-align': textAlign,
        }),
        ...style,
      }),
      [maxWidth, minWidth, style, textAlign, width]
    )

    const handleClick = useCallback(
      (ev: any) => {
        if (loading) return
        onClick?.(ev)
      },
      [loading, onClick]
    )

    if (variant === 'none') {
      return (
        <button ref={ref} style={style} type={type} className={className} onClick={handleClick} {...props}>
          {children}
        </button>
      )
    }

    const rootClassName = cn(
      styles.root,
      styles[variant],
      styles[size],
      styles[`radius-${radius}`],
      {
        [styles.inline]: inline,
        [styles.rounded]: rounded,
        [styles.hovered]: hovered,
        [styles.loading]: loading,
        [styles.bold]: bold,
        [styles.disabled]: disabled || ariaDisabled,
      },
      className
    )

    return (
      <button
        ref={ref}
        type={type}
        className={rootClassName}
        style={rootStyle}
        disabled={disabled}
        onClick={handleClick}
        aria-disabled={ariaDisabled}
        {...props}
      >
        {loading && <Spinner size={loaderSize} variant={loaderVariant} stroked={false} className={styles.loader} />}
        {icon && <span className={styles.before}>{icon}</span>}
        {children && <span className={styles.label}>{children}</span>}
        {endIcon && <span className={styles.after}>{endIcon}</span>}
      </button>
    )
  }
)

export default Button

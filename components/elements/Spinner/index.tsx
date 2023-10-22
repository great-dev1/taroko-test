import cn from 'classnames'
import { ComponentPropsWithoutRef, FC, memo } from 'react'

import styles from './Spinner.module.scss'

export interface SpinnerProps extends ComponentPropsWithoutRef<'span'> {
  size: 'm' | 's' | 'xs'
  variant?: 'highlight' | 'lavender' | 'surface'
  stroked?: boolean
  radius?: number
  cx?: number
  cy?: number
  strokeWidth?: number
}

const defaultSizes: Record<SpinnerProps['size'], number> = {
  m: 28,
  s: 24,
  xs: 16,
}

const Spinner: FC<React.PropsWithChildren<React.PropsWithChildren<SpinnerProps>>> = ({
  size = 'm',
  radius,
  cx,
  cy,
  strokeWidth,
  stroked = true,
  variant = 'highlight',
  className = '',
  ...props
}) => {
  const sizeVal = (defaultSizes[size] || size) as number
  const radiusVal = radius || (sizeVal / 100) * 40
  const cxVal = cx || sizeVal / 2
  const cyVal = cy || sizeVal / 2
  const strokeWidthVal = strokeWidth || Math.max(2, Math.floor(sizeVal / 8))
  const viewBox = `0 0 ${sizeVal} ${sizeVal}`

  return (
    <span className={cn(styles.root, styles[variant], { [styles.stroked]: stroked }, className)} {...props}>
      <svg width={sizeVal} height={sizeVal} className={styles.svg} fill="none" viewBox={viewBox}>
        <circle cx={cxVal} cy={cyVal} r={radiusVal} strokeWidth={strokeWidthVal} className={styles.circle} />
        <circle cx={cxVal} cy={cyVal} r={radiusVal} strokeWidth={strokeWidthVal} className={styles.circle} />
      </svg>
    </span>
  )
}

export default memo(Spinner)

export type ButtonVariants =
  | 'default'
  | 'highlight'
  | 'highlightOutline'
  | 'highlightText'
  | 'attention'
  | 'danger'
  | 'dashed'
  | 'invert'
  | 'plain'
  | 'plainAttention'
  | 'plainLavender'
  | 'plainLavenderInvert'
  | 'plainUnderline'
  | 'lavender'
  | 'lavenderDark'
  | 'accent'
  | 'primary'
  | 'secondary'
  | 'tab'

export type ButtonSizes = 's' | 'm' | 'xm' | 'l' | 'xl'

const withLavenderLoader = new Set<ButtonVariants>(['lavender', 'lavenderDark', 'plainLavender', 'plainLavenderInvert'])
const withSurfaceLoader = new Set<ButtonVariants>(['dashed', 'plain', 'plainUnderline'])

export const setInitialLoaderVariant = (variant: ButtonVariants) => {
  return withLavenderLoader.has(variant) ? 'lavender' : withSurfaceLoader.has(variant) ? 'surface' : 'highlight'
}

export const setInitialLoaderSize = (size: ButtonSizes) => {
  return size === 'l' ? 'm' : size === 's' ? 'xs' : 's'
}

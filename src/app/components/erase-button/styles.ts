import { tv, VariantProps } from 'tailwind-variants'

export const styles = tv({
  base: /*tw:*/ 'flex items-center gap-2 rounded-2xl px-8 py-3 text-xl font-bold text-white transition-all duration-1000 sm:p-3',
  variants: {
    status: {
      disabled: /*tw:*/ 'bg-neutral-500',
      active:
        /*tw:*/ 'cursor-pointer hover:from-blue-600 hover:to-blue-400 active:from-blue-600 active:to-blue-400',
      fail: /*tw:*/ 'bg-gradient-to-br from-red-800 to-red-600 dark:from-red-700 dark:to-red-500',
      success:
        /*tw:*/ 'bg-gradient-to-br from-emerald-800 to-emerald-600 dark:from-emerald-700 dark:to-emerald-500',
      loading: /*tw:*/ 'cursor-wait'
    }
  },
  compoundVariants: [
    {
      status: ['active', 'loading'],
      class:
        /*tw:*/ 'bg-gradient-to-br from-blue-800 to-blue-600 dark:from-blue-700 dark:to-blue-500'
    }
  ]
})

export type StylesProps = VariantProps<typeof styles>

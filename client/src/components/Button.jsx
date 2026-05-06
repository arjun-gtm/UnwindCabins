import { motion } from 'framer-motion'

const Button = ({ children, variant = 'primary', className = '', type = 'button', ...props }) => {
  const baseStyles =
    'inline-flex min-h-12 items-center justify-center rounded-md px-7 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-4'

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary/20',
    secondary: 'bg-accent text-ink hover:bg-accent-dark focus:ring-accent/30',
    ghost: 'border border-line bg-white text-ink hover:border-primary hover:text-primary focus:ring-primary/20',
    mint: 'bg-mint text-ink hover:bg-white focus:ring-primary/20',
  }

  return (
    <motion.button
      type={type}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button

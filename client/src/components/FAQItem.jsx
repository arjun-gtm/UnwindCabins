import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRightCircle } from 'lucide-react'

const FAQItem = ({ question, details }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="overflow-hidden rounded-md bg-accent shadow-panel">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-[76px] w-full items-center justify-between gap-5 px-6 py-4 text-left text-sm font-bold text-ink transition duration-200 hover:bg-accent-dark"
      >
        <span>{question}</span>
        <ArrowRightCircle className={`h-5 w-5 shrink-0 text-ink/70 transition duration-200 ${open ? 'rotate-90' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="border-t border-ink/10 bg-[#ffc777]"
          >
            <div className="space-y-2 px-6 py-5 text-sm leading-7 text-ink/70">
              {details.map((detail) => (
                <p key={detail}>• {detail}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FAQItem

import { ArrowUpRight01Icon, GithubIcon, Mail01Icon, NewTwitterIcon, WavingHand01Icon } from '@hugeicons-pro/core-stroke-rounded'
import { HugeiconsIcon } from '@hugeicons/react'
import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import boldstats from '~/assets/boldstats.mp4'
import { Intro } from '~/components/index.tsx'
import { DefaultLayout } from '~/layouts/index.tsx'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <DefaultLayout>
      <Intro />
      <main>
        <motion.h2
          className="font-medium mb-4 text-neutral-900 dark:text-neutral-100"
          initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'none' }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.5 }}
        >
          Recent projects
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
          initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'none' }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.6 }}
        >
          <a href="https://boldstats.com?ref=marvinrudolph.com" target="_blank" rel="noopener noreferrer" className="flex flex-col group">
            <div className="aspect-video w-full rounded-lg mb-3 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              <video playsInline autoPlay muted loop className="size-full object-cover transition-transform duration-300 will-change-transform group-hover:scale-105">
                <source src={boldstats} type="video/mp4" />
              </video>
            </div>
            <h3 className="font-medium text-neutral-900 mb-1 inline-flex gap-0.5 items-center dark:text-neutral-100">
              BoldStats
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                size="1rem"
                strokeWidth={2}
                className="opacity-0 -translate-x-px translate-y-px transition-all group-hover:opacity-100 group-hover:translate-x-px group-hover:translate-y-0"
              />
            </h3>
            <p className="text-neutral-500 leading-normal dark:text-neutral-400">A SaaS to boost engagement with real-time counters in TikTok live streams</p>
          </a>
        </motion.div>
        <motion.h2
          className="font-medium mb-4 text-neutral-900 dark:text-neutral-100"
          initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'none' }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.7 }}
        >
          Let's connect! :)
        </motion.h2>
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'none' }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.8 }}
        >
          <a
            href="https://github.com/m4rvr"
            className="transition-colors inline-flex items-center gap-1.5 font-medium group hover:text-neutral-900 dark:hover:text-neutral-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HugeiconsIcon
              icon={GithubIcon}
              size="1rem"
              strokeWidth={2}
              className="group-hover:animate-wiggle-fast"
            />
            GitHub
          </a>
          <a
            href="https://x.com/marvr_"
            className="transition-colors inline-flex items-center gap-1.5 font-medium group hover:text-neutral-900 dark:hover:text-neutral-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HugeiconsIcon
              icon={NewTwitterIcon}
              size="1rem"
              strokeWidth={2}
              className="group-hover:animate-wiggle-fast"
            />
            X (Twitter)
          </a>
          <a
            href="mailto:hi@marvinrudolph.com"
            className="transition-colors inline-flex items-center gap-1.5 font-medium group hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            <HugeiconsIcon
              icon={Mail01Icon}
              size="1rem"
              strokeWidth={2}
              className="group-hover:animate-wiggle-fast"
            />
            Email
          </a>
        </motion.div>
      </main>
    </DefaultLayout>
  )
}

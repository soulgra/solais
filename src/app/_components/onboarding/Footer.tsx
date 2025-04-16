import React from 'react';
import { motion } from 'framer-motion';
import {
  FaTwitter,
} from 'react-icons/fa';
import SolaLogo from '@/components/common/SolaLogo';

export default function Footer() {
  // Animation variants
  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const socialLinks = [
    {
      icon: <FaTwitter />,
      name: 'Twitter',
      href: 'https://x.com/aAranchaVAL',
    },
  ];

  const infoLinks = [
    { name: 'Uptime Monitor', href: 'https://status.sola-ai.fun' },
    { name: 'Privacy Notice', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  return (
    <footer className="border-t border-white/10 bg-gray-900">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-12"
        >
          {/* Logo and description */}
          <motion.div variants={fadeInUp} className="lg:col-span-4">
            <div className="flex items-center space-x-2">
              <a href="https://sola-ai.fun" className="-m-1.5 p-1.5 flex items-center gap-3">
                <span className="sr-only">sola-ai</span>
                <SolaLogo className="text-white h-8 w-8" />
                <span className="text-white font-semibold text-lg hidden sm:block">
                  sola-ai
                </span>
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Voice assistant for Solana - perform on-chain actions using just
              your voice or text commands.
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-3 lg:col-start-6"
          >
            <h3 className="text-sm font-semibold text-indigo-400">
              Connect with us
            </h3>
            <ul className="mt-4 space-y-4">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex items-center text-sm text-gray-400 transition hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="mr-3 text-gray-500 transition group-hover:text-indigo-400">
                      {link.icon}
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Info links */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-3 lg:col-start-10"
          >
            <h3 className="text-sm font-semibold text-indigo-400">Info</h3>
            <ul className="mt-4 space-y-4">
              {infoLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom copyright */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 border-t border-white/10 pt-8 text-center"
        >
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} sola-ai. <a href="https://sola-ai.fun" className="hover:text-indigo-400">sola-ai.fun</a>
          </p>
          <div className="mt-2 flex justify-center space-x-6">
            <motion.div
              className="h-1 w-1 rounded-full bg-indigo-500"
              animate={{
                boxShadow: [
                  '0 0 3px #6366f1',
                  '0 0 8px #6366f1',
                  '0 0 3px #6366f1',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
            <motion.div
              className="h-1 w-1 rounded-full bg-indigo-500"
              animate={{
                boxShadow: [
                  '0 0 3px #6366f1',
                  '0 0 8px #6366f1',
                  '0 0 3px #6366f1',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 0.5,
              }}
            />
            <motion.div
              className="h-1 w-1 rounded-full bg-indigo-500"
              animate={{
                boxShadow: [
                  '0 0 3px #6366f1',
                  '0 0 8px #6366f1',
                  '0 0 3px #6366f1',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 1,
              }}
            />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

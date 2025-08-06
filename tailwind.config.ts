import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Cosmic Zones
				heaven: {
					DEFAULT: 'hsl(var(--heaven))',
					glow: 'hsl(var(--heaven-glow))'
				},
				hell: {
					DEFAULT: 'hsl(var(--hell))',
					glow: 'hsl(var(--hell-glow))'
				},
				reincarnation: {
					DEFAULT: 'hsl(var(--reincarnation))',
					glow: 'hsl(var(--reincarnation-glow))'
				},
				// Coherence Levels
				coherence: {
					low: 'hsl(var(--coherence-low))',
					mid: 'hsl(var(--coherence-mid))',
					high: 'hsl(var(--coherence-high))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-soul': 'var(--gradient-soul)',
				'gradient-oversoul': 'var(--gradient-oversoul)',
				'gradient-harmonic': 'var(--gradient-harmonic)',
				'gradient-cosmic': 'var(--gradient-cosmic)'
			},
			boxShadow: {
				'resonance': 'var(--shadow-resonance)',
				'harmonic': 'var(--shadow-harmonic)',
				'ethereal': 'var(--shadow-ethereal)'
			},
			transitionProperty: {
				'soul': 'var(--transition-soul)',
				'harmonic': 'var(--transition-harmonic)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'soul-pulse': {
					'0%, 100%': { 
						transform: 'scale(1)',
						filter: 'brightness(1) saturate(1)'
					},
					'50%': { 
						transform: 'scale(1.05)',
						filter: 'brightness(1.2) saturate(1.3)'
					}
				},
				'frequency-flow': {
					'0%': { transform: 'translateX(-100%) rotate(0deg)' },
					'100%': { transform: 'translateX(100vw) rotate(360deg)' }
				},
				'resonance-ripple': {
					'0%': { 
						transform: 'scale(0.8)',
						opacity: '0.8'
					},
					'100%': { 
						transform: 'scale(2)',
						opacity: '0'
					}
				},
				'harmonic-float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-10px) rotate(120deg)' },
					'66%': { transform: 'translateY(5px) rotate(240deg)' }
				},
				'cosmic-spin': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'ethereal-glow': {
					'0%, 100%': { filter: 'brightness(1) blur(0px)' },
					'50%': { filter: 'brightness(1.4) blur(1px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'soul-pulse': 'soul-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'frequency-flow': 'frequency-flow 4s linear infinite',
				'resonance-ripple': 'resonance-ripple 2s ease-out infinite',
				'harmonic-float': 'harmonic-float 6s ease-in-out infinite',
				'cosmic-spin': 'cosmic-spin 20s linear infinite',
				'ethereal-glow': 'ethereal-glow 4s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

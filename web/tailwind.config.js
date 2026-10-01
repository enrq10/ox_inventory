/** @type {import('tailwindcss').Config} */
export default {
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
    extend: {
        colors: {
            // Main colors - fácilmente configurables desde global.css
            'main': 'var(--color-main)',
            'secondary': 'var(--color-secondary)',
            'secondary-highlight': 'var(--color-secondary-highlight)',
            'accent': 'var(--color-accent)',
            'text-primary': 'var(--color-text)',
            'border-primary': 'var(--color-border)',

            // New Inventory Colors from Figma
            'green-neon': 'var(--color-green-neon)',
            'green-neon-bg': 'var(--color-green-neon-bg)',
            'green-neon-border': 'var(--color-green-neon-border)',
            'purple-primary': 'var(--color-purple-primary)',
            'purple-light': 'var(--color-purple-light)',
            'red-primary': 'var(--color-red-primary)',
            'red-bg': 'var(--color-red-bg)',
            'blue-badge': 'var(--color-blue-badge)',
            'gray-secondary': 'var(--color-gray-secondary)',
            'gray-badge': 'var(--color-gray-badge)',
            'bg-dark': 'var(--color-bg-dark)',
            'slot-empty': 'var(--color-slot-empty)',

            // Clothing interface colors
            'clothing': {
                'active': 'var(--color-clothing-active)',
                'active-from': 'var(--color-clothing-active-from)',
                'active-to': 'var(--color-clothing-active-to)',
                'border-active': 'var(--color-clothing-border-active)',
                'inactive': 'var(--color-clothing-inactive)',
                'border-inactive': 'var(--color-clothing-border-inactive)',
            },
        },
        fontFamily: {
            'main': ['Resolve', 'sans-serif'],
            'secondary': ['Fpsdemo', 'sans-serif'],
            'readable-bold': ['Montserrat', 'sans-serif'],
        },
        backdropBlur: {
            'medium': 'var(--blur-medium)',
            'strong': 'var(--blur-strong)',
        },
        transitionProperty: {
            'smooth': 'var(--transition-smooth)',
            'quick': 'var(--transition-quick)',
        },
        boxShadow: {
            'glow': 'var(--shadow-glow)',
            'subtle': 'var(--shadow-subtle)',
        }
    },
},
plugins: [],
}


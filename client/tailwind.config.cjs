module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#ffffff',
        surface: '#f7fbfa',
        mint: '#effbf9',
        primary: '#064b35',
        'primary-dark': '#002f21',
        ink: '#242538',
        body: '#5b6466',
        muted: '#7f8b8a',
        accent: '#ffb85f',
        'accent-dark': '#eea33d',
        card: '#212a29',
        'card-soft': '#4e605d',
        line: '#e5eeee',
        input: '#f0f1f2',
        footer: '#081111',
        trust: '#00b980',
      },
      boxShadow: {
        soft: '0 20px 45px rgba(8, 17, 17, 0.12)',
        panel: '0 16px 35px rgba(8, 17, 17, 0.10)',
        search: '0 20px 35px rgba(8, 17, 17, 0.18)',
      },
      backgroundImage: {
        'hero-scrim': 'linear-gradient(90deg, rgba(0,18,9,0.92) 0%, rgba(17,24,28,0.72) 42%, rgba(17,24,28,0.18) 100%)',
        'bottom-scrim': 'linear-gradient(0deg, rgba(8,17,17,0.92) 0%, rgba(8,17,17,0.52) 52%, rgba(8,17,17,0.14) 100%)',
      },
      fontFamily: {
        display: ['Merriweather', 'Georgia', 'serif'],
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

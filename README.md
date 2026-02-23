# My Portfolio

A minimalist personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🌙 **Dark Mode by Default**: Toggle between dark and light themes using next-themes
- ✨ **Smooth Animations**: Framer Motion animations for elegant section transitions
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🎨 **Minimalist Aesthetic**: Clean, whitespace-focused layout inspired by mohitjoe.xyz
- 🔧 **Type-Safe**: Built with TypeScript in strict mode
- 📂 **Organized Structure**: Well-structured components and pages

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [react-icons](https://react-icons.github.io/react-icons/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

## Project Structure

```
my-portfolio/
├── pages/
│   ├── _app.tsx              (Next.js app wrapper with ThemeProvider)
│   ├── _document.tsx         (HTML document structure)
│   ├── index.tsx             (Home page with all sections)
│   └── projects/
│       ├── project1.tsx      (E-Commerce Platform detail)
│       └── project2.tsx      (Task Management App detail)
├── components/
│   ├── Navbar.tsx            (Sticky navigation)
│   ├── ThemeToggle.tsx       (Dark/Light mode toggle)
│   ├── Education.tsx         (Education section)
│   ├── Skills.tsx            (Skills by category)
│   ├── ProjectCard.tsx       (Reusable project card)
│   └── Projects.tsx          (Projects container)
├── styles/
│   └── globals.css           (Tailwind CSS directives)
├── public/                   (Static assets)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Navigate to the project directory:

```bash
cd my-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Customization

### Update Your Information

1. **Hero Section**: Edit the name and description in [pages/index.tsx](pages/index.tsx#L47-L55)
2. **Education**: Update education data in [components/Education.tsx](components/Education.tsx#L10-L13)
3. **Skills**: Modify skills in [components/Skills.tsx](components/Skills.tsx#L8-L26)
4. **Projects**: Update project data in [components/Projects.tsx](components/Projects.tsx#L10-L32)

### Theme Customization

Edit color scheme in [tailwind.config.js](tailwind.config.js):

```js
theme: {
  extend: {
    colors: {
      background: '#1a1a1a',  // Change background color
      text: '#ffffff',        // Change text color
    },
  },
},
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Vercel will automatically deploy on push

### Other Platforms

The project can be deployed to any platform supporting Next.js:

- Netlify
- GitHub Pages
- AWS Amplify
- Digital Ocean
- And more...

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

This project is open source and available under the MIT License.

## Contact

For questions or suggestions, feel free to reach out!

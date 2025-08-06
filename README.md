# The Architect🌟

An interactive 3D visualization representing a human soul's resonance journey as a dynamic frequency construct. Built with modern web technologies to create an immersive spiritual and metaphysical experience.

![Coherence Engine Banner](https://img.shields.io/badge/3D-Visualization-purple) ![React](https://img.shields.io/badge/React-18.3.1-61DAFB) ![Three.js](https://img.shields.io/badge/Three.js-Latest-orange) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## ✨ Features

### Core Visualization Components
- **Central Soul Waveform**: Dynamic evolving sphere with custom shaders that react to emotional and karmic inputs
- **Fractal Experience Nodes**: 8 orbiting nodes representing key life experiences, color-coded by intensity and coherence
- **Spectral Particle Field**: 2000+ reactive particles symbolizing the oversoul's harmonic field
- **Frequency Zone Corridors**: Visual representations of Heaven, Hell, and Reincarnation bands as frequency corridors

### Interactive Controls
- **Core Tone Frequency** (1-10 Hz): Adjusts the primary resonance of the soul visualization
- **Karma Load** (0-100%): Influences color shifts and particle behavior
- **Coherence Level** (0-100%): Affects transparency, brightness, and overall harmony
- **Mirror Interactions** (0-100%): Controls relationship dynamics and particle movements
- **Zone Selection**: Switch between Heaven, Hell, Reincarnation, and Neutral frequency zones
- **Post-Death Simulation**: Animate soul transition and realignment processes

### Visual Design
- **Modern Typography**: Custom Google Fonts (Inter, JetBrains Mono, Orbitron)
- **Cosmic Animations**: Shimmer effects, gentle floating, and glow pulses
- **Responsive Layout**: Optimized for desktop and tablet viewing
- **Real-time Shaders**: Custom GLSL shaders for dynamic visual effects

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm (recommended: [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/coherence-engine.git

# Navigate to project directory
cd coherence-engine

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **3D Graphics**: Three.js with React Three Fiber (@react-three/fiber)
- **3D Utilities**: React Three Drei (@react-three/drei)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui component library
- **State Management**: React Hooks (useState, useRef, useEffect)

## 🎮 How to Use

1. **Adjust Core Parameters**: Use the sliders in the left panel to modify:
   - Core tone frequency (affects waveform oscillation)
   - Karma load (influences color intensity)
   - Coherence level (controls visual harmony)
   - Mirror interactions (adjusts particle dynamics)

2. **Select Frequency Zones**: Choose between different spiritual frequency bands:
   - **Heaven**: Golden frequencies, upward energy
   - **Hell**: Red frequencies, shadow work
   - **Reincarnation**: Purple frequencies, cyclical patterns
   - **Neutral**: Balanced blue frequencies

3. **Explore Post-Death Simulation**: Toggle the soul transition feature to visualize post-death realignment

4. **Navigate the 3D Space**: 
   - Click and drag to rotate the view
   - Scroll to zoom in/out
   - The visualization auto-rotates slowly for ambient viewing

## 🎨 Design Philosophy

The Coherence Engine visualizes spiritual concepts through frequency and resonance metaphors:

- **Frequencies over Places**: Heaven and Hell are represented as frequency ranges rather than physical locations
- **Dynamic Resonance**: The soul's journey is shown as an evolving waveform responding to life experiences
- **Harmonic Relationships**: Visual connections between nodes represent karmic and relational dynamics
- **Immersive Beauty**: Focus on aesthetic experience to facilitate contemplation and insight

## 🔧 Development

### File Structure
```
src/
├── components/
│   ├── CoherenceEngine.tsx    # Main 3D visualization component
│   └── ui/                    # shadcn/ui components
├── assets/                    # Static assets
├── index.css                  # Global styles and design tokens
└── main.tsx                   # App entry point
```

### Custom Shaders
The project includes custom GLSL vertex and fragment shaders for:
- Dynamic soul waveform generation
- Real-time color transitions
- Ethereal glow effects
- Frequency-based morphing

### Adding New Features
1. Core visualization components are in `CoherenceEngine.tsx`
2. UI controls use the established design system
3. Shader modifications can be made in the `CoreWaveform` component
4. Design tokens are defined in `index.css` and `tailwind.config.ts`

## 🌐 Deployment

### Lovable Platform (Recommended)
1. Visit the [Lovable Project](https://lovable.dev/projects/7ea1ae27-2725-4688-b7b1-ebc838de2af5)
2. Click Share → Publish
3. Your app will be live with a custom URL

### Manual Deployment
```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

Deploy the `dist` folder to any static hosting service (Vercel, Netlify, GitHub Pages, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use the established design system for styling
- Test Three.js components thoroughly across devices
- Maintain 60fps performance where possible

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js Community**: For the incredible 3D graphics library
- **React Three Fiber**: For seamless React-Three.js integration
- **shadcn/ui**: For beautiful, accessible UI components
- **Lovable Platform**: For the development environment and hosting

## 📞 Support

- **Documentation**: [Lovable Docs](https://docs.lovable.dev/)
- **Community**: [Lovable Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)
- **Issues**: Please use GitHub Issues for bug reports and feature requests

---

**Experience the journey of consciousness through frequency and light.** ✨

*Built with love using Lovable* 💜

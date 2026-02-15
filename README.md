# HyperDrive EV - Futuristic Electric Car Showcase Website

A premium 3D animated single-page website showcasing a futuristic electric supercar concept. Built with cutting-edge web technologies to deliver a cinematic experience.

## 🚀 Features

- **3D Car Model**: Interactive Three.js 3D car model with realistic materials and lighting
- **Smooth Animations**: GSAP-powered animations with scroll-triggered effects
- **Locomotive Scroll**: Buttery smooth scrolling experience
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop
- **Premium UI**: Glassmorphism effects and neon-themed design
- **Interactive Elements**: Hover effects, form animations, and video controls
- **Performance Optimized**: GPU-accelerated animations and optimized assets

## 🛠️ Technology Stack

- **HTML5** - Semantic markup structure
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript (ES6+)** - Modern JavaScript features
- **Three.js** - 3D graphics and WebGL rendering
- **GSAP (GreenSock)** - Professional-grade animations
- **Locomotive Scroll** - Smooth scrolling library

## 📱 Sections

1. **Hero Section**
   - Full-screen 3D car model with slow rotation
   - Particle background effects
   - Animated typography with neon glow
   - Call-to-action button

2. **Features Section**
   - Interactive feature cards with hover effects
   - Icon animations and transitions
   - Split layout with imagery

3. **Gallery Section**
   - Horizontal scrolling image gallery
   - Parallax effects on scroll
   - High-quality car imagery

4. **Video Section**
   - Cinematic background video
   - Audio toggle functionality
   - Overlay content with glassmorphism

5. **Specifications Section**
   - Animated number counters
   - Grid layout with glowing borders
   - Scroll-triggered reveal animations

6. **Contact Section**
   - Glassmorphism contact form
   - Form validation and success states
   - Animated submit button

## 🎨 Design Guidelines

- **Color Scheme**: Premium black, neon blue (#00ffff), electric blue (#0080ff), silver
- **Typography**: Orbitron (headings), Rajdhani (body text)
- **Effects**: Glow effects, gradients, backdrop blur
- **Animations**: Smooth, cinematic, performance-optimized

## 🚀 Getting Started

### Option 1: Local Development Server (Recommended)

1. **Install a local server** (choose one):
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   
   # Using Node.js (if installed)
   npx http-server
   
   # Using PHP (if installed)
   php -S localhost:8000
   ```

2. **Navigate to the project directory**:
   ```bash
   cd "c:\Users\umerm\OneDrive\Desktop\AI\New folder"
   ```

3. **Start the server**:
   ```bash
   python -m http.server 8000
   ```

4. **Open in browser**:
   ```
   http://localhost:8000
   ```

### Option 2: Direct File Opening

Simply double-click `index.html` to open in your default browser.

**Note**: Some features may not work properly when opening directly due to CORS restrictions. A local server is recommended.

### Option 3: Live Server Extension (VS Code)

1. Install the "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

## 📱 Mobile Optimization

The website is fully responsive with:
- Mobile-first design approach
- Touch-friendly interactions
- Optimized image loading
- Fallback for devices without WebGL support
- Compressed animations for mobile performance

## 🔧 Browser Compatibility

- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **WebGL Support**: Required for 3D car model (fallback image provided)
- **ES6 Support**: Required for modern JavaScript features

## 🎯 Performance Features

- **GPU Acceleration**: Hardware-accelerated animations
- **Lazy Loading**: Images load as needed
- **Optimized Assets**: Compressed images and efficient code
- **Smooth Scrolling**: 60fps scroll animations
- **Responsive Images**: Different sizes for different screen sizes

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --neon-blue: #00ffff;
    --electric-blue: #0080ff;
    --dark-bg: #0a0a0a;
    --dark-gray: #1a1a1a;
}
```

### Content
Update text content in `index.html`:
- Hero section tagline
- Feature descriptions
- Specifications data
- Contact information

### Images
Replace image URLs in `index.html` with your own:
- Hero fallback image
- Feature section images
- Gallery images
- Background images

## 🔍 Development Notes

### 3D Car Model
The current implementation uses a procedurally generated car model. For production:
1. Create a car model in Blender
2. Export as .glb or .gltf format
3. Replace the `createSimpleCarModel()` function with GLTFLoader
4. Update the model path in `loadCarModel()`

### Video Section
Replace the sample video URL with your own:
```html
<source src="your-video-url.mp4" type="video/mp4">
```

### Analytics
Add your analytics code before the closing `</body>` tag:
```html
<!-- Google Analytics or other tracking -->
```

## 🐛 Troubleshooting

### Common Issues

1. **3D Model Not Loading**
   - Check WebGL support in browser
   - Verify Three.js library loaded correctly
   - Fallback image should display automatically

2. **Animations Not Working**
   - Ensure GSAP library loaded
   - Check browser console for errors
   - Verify ScrollTrigger plugin loaded

3. **Smooth Scroll Issues**
   - Disable browser extensions that affect scrolling
   - Check Locomotive Scroll library loaded
   - Falls back to native scroll if library fails

4. **Mobile Performance**
   - Reduce animation complexity on mobile
   - Enable hardware acceleration
   - Test on actual devices, not just browser dev tools

## 📄 File Structure

```
project/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🚀 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch (main/master)

### Netlify
1. Drag and drop project folder to Netlify
2. Or connect GitHub repository
3. Deploy automatically

### Vercel
1. Import project from GitHub
2. Deploy with zero configuration

## 🤝 Contributing

Feel free to submit issues and pull requests to improve the project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues:
- Check the troubleshooting section above
- Review browser console for error messages
- Ensure all required libraries are loading correctly

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**HyperDrive EV** - Redefining Speed. Powered by Tomorrow. ⚡🚗💫
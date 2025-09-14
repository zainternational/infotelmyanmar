# Infotel Myanmar - Hospitality Technology Website

![Infotel Myanmar Logo](assets/images/logo.svg)

A professional website for Infotel Myanmar, showcasing world-class hospitality technology solutions including Opera PMS, Simphony POS, and Micros hardware for hotels in Myanmar.

**🌐 Live Website**: [https://infotelmyanmar.com](https://infotelmyanmar.com)

## 🌟 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **SEO Optimized**: Complete meta tags, sitemap, and semantic HTML
- **Performance**: Optimized images, CSS, and JavaScript
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation
- **Interactive Elements**: Loading screen, back-to-top button, scroll animations
- **PWA Support**: Progressive Web App with service worker
- **Contact Form**: Integrated with Formspree for reliable form handling
- **Analytics**: Google Analytics integration for tracking

## 📁 Project Structure

```
infotelmm/
├── index.html                # Homepage
├── about-us.html             # About page
├── solutions.html             # Solutions page
├── services.html              # Services page
├── contact.html               # Contact page
├── sitemap.xml                # SEO sitemap
├── manifest.json              # PWA manifest
├── sw.js                      # Service worker
├── CNAME                      # Custom domain configuration
├── css/
│   ├── style.css             # Main stylesheet
│   └── responsive.css         # Responsive overrides
├── js/
│   └── main.js                # Main JavaScript functionality
├── components/                # Reusable HTML components
│   ├── header.html            # Header component
│   ├── footer.html            # Footer component
│   ├── navigation.html        # Navigation component
│   ├── loading.html           # Loading screen component
│   └── back-to-top.html       # Back to top component
├── assets/
│   └── images/                # All website images
│       ├── logo.svg           # Company logo
│       ├── favicon.svg        # Website favicon
│       ├── hero-bg.svg        # Hero background
│       ├── about-preview.svg  # About section image
│       ├── opera-pms.svg      # Opera PMS icon
│       ├── simphony-pos.svg   # Simphony POS icon
│       ├── micros-hardware.svg # Micros hardware icon
│       ├── opera-screenshot.svg # Opera screenshot
│       ├── simphony-screenshot.svg # Simphony screenshot
│       └── micros-workstation.png # Hardware image
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions deployment
└── Documentation files
```

## 📚 Documentation

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide
- **[cloudflare-config.md](cloudflare-config.md)** - Detailed Cloudflare configuration
- **[.github/pages-config.md](.github/pages-config.md)** - GitHub Pages configuration

## 🚀 Quick Start

### Production Website
- **Live Site**: [https://infotelmyanmar.com](https://infotelmyanmar.com)
- **Hosting**: GitHub Pages with custom domain
- **CDN**: Cloudflare for global performance
- **SSL**: Automatic HTTPS with GitHub Pages

### Local Development

1. **Clone or download the project**
2. **Start local server:**
   ```bash
   python -m http.server 8000
   ```
3. **Access website:**
   - Local: http://localhost:8000
   - Mobile (same network): http://192.168.154.1:8000

### Internet Testing

1. **Download ngrok:** https://ngrok.com/download
2. **Setup tunnel:**
   ```bash
   ngrok http 8000
   ```
3. **Share public URL** for external testing

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript ES6+**: Interactive functionality and animations
- **Font Awesome**: Icons and UI elements
- **Google Fonts**: Poppins font family
- **Responsive Design**: Mobile-first approach

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Design System

### Color Palette
- **Primary**: #1D3557 (Navy Blue)
- **Secondary**: #2A9D8F (Teal)
- **Accent**: #E9C46A (Gold)
- **Text**: #333 (Dark Gray)
- **Light Text**: #fff (White)

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## 📄 Pages

### Homepage (index.html)
- Hero section with company introduction
- Highlights of key solutions
- About us preview
- Solutions overview
- Services overview
- Contact information

### About Us (about-us.html)
- Company mission and vision
- Team information
- Company values
- Why choose us

### Solutions (solutions.html)
- Opera PMS details
- Simphony POS information
- Micros hardware specifications
- Implementation process

### Services (services.html)
- Implementation services
- Training programs
- Support and maintenance
- Consultation services

### Contact (contact.html)
- Contact form
- Company information
- Location details
- Social media links

## 🔧 Development

### File Naming Conventions
- **HTML files**: kebab-case (about-us.html)
- **CSS files**: kebab-case (style.css)
- **JS files**: camelCase (main.js)
- **Images**: kebab-case, descriptive (micros-workstation.png)
- **CSS Classes**: kebab-case (hero-section)
- **JS Functions**: camelCase (showBookingForm)
- **JS Constants**: UPPER_SNAKE_CASE (MAX_ANIMATION_DELAY)

### Code Standards
- Semantic HTML5 elements
- CSS Grid and Flexbox for layouts
- ES6+ JavaScript features
- Responsive design principles
- Accessibility best practices
- SEO optimization

## 🚀 Deployment

### Production Checklist
- [ ] Optimize images (WebP format)
- [ ] Minify CSS and JavaScript
- [ ] Enable HTTPS
- [ ] Configure caching headers
- [ ] Test on multiple devices
- [ ] Validate HTML/CSS
- [ ] Check accessibility
- [ ] Test performance

### Hosting Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **Traditional Hosting**: Shared hosting, VPS
- **CDN**: Cloudflare for global distribution

## 📊 Performance

### Current Optimizations
- Optimized images
- Minified CSS/JS
- Efficient animations
- Lazy loading
- Responsive images

### Performance Metrics
- **Lighthouse Score**: 90+ (target)
- **First Contentful Paint**: <2s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

## 🔍 SEO Features

- Meta descriptions for all pages
- Open Graph tags for social sharing
- Structured data markup
- XML sitemap
- Semantic HTML structure
- Alt text for all images
- Clean URL structure

## ♿ Accessibility

- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences
- Semantic HTML structure

## 📞 Support

For technical support or questions about this website:
- **Email**: info@infotelmyanmar.com
- **Phone**: +95 9 44534 6060
- **Location**: Yangon, Myanmar
- **Website**: [https://infotelmyanmar.com](https://infotelmyanmar.com)

## 📝 License

© 2025 Infotel Myanmar. All rights reserved.

## 🔄 Version History

- **v1.0.0** - Initial release with all core features
- **v1.1.0** - Added responsive design and animations
- **v1.2.0** - Enhanced SEO and accessibility features
- **v1.3.0** - Added carousel functionality and improved performance
- **v1.4.0** - Production deployment with GitHub Pages and custom domain

---

**Built with ❤️ for Infotel Myanmar**

**🌐 Visit**: [https://infotelmyanmar.com](https://infotelmyanmar.com)

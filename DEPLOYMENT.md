# Infotel Myanmar Website - Deployment Guide

## 🌐 Production Website
**Live Site**: [https://infotelmyanmar.com](https://infotelmyanmar.com)

## 📋 Prerequisites
- GitHub account
- Domain: infotelmyanmar.com
- Cloudflare account
- Formspree account
- Google Analytics account

## 🚀 Quick Deployment Steps

### 1. Setup Services

#### **Formspree Setup**
1. Go to [https://formspree.io](https://formspree.io)
2. Create account and new form
3. Copy form endpoint URL
4. ✅ **COMPLETED**: Form configured with endpoint `https://formspree.io/f/xrbavpqv`

#### **Google Analytics Setup**
1. Create Google Analytics account
2. Get tracking ID (GA_MEASUREMENT_ID)
3. Replace `GA_MEASUREMENT_ID` in all HTML files

#### **Cloudflare Setup**
1. Add `infotelmyanmar.com` to Cloudflare
2. Update nameservers at domain registrar
3. Configure DNS records (see DNS Configuration below)

### 2. GitHub Deployment

```bash
# 1. Create repository and push code
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/infotel-myanmar.git
git push -u origin main

# 2. Enable GitHub Pages
# Go to repository Settings > Pages
# Source: Deploy from a branch
# Branch: gh-pages
# Folder: / (root)
# Custom domain: infotelmyanmar.com
# Enable "Enforce HTTPS"
```

### 3. DNS Configuration (Cloudflare)

#### **A Records (IPv4)**
```
Type: A, Name: @, Content: 185.199.108.153, Proxy: ✅
Type: A, Name: @, Content: 185.199.109.153, Proxy: ✅
Type: A, Name: @, Content: 185.199.110.153, Proxy: ✅
Type: A, Name: @, Content: 185.199.111.153, Proxy: ✅
```

#### **AAAA Records (IPv6)**
```
Type: AAAA, Name: @, Content: 2606:50c0:8000::153, Proxy: ✅
Type: AAAA, Name: @, Content: 2606:50c0:8001::153, Proxy: ✅
Type: AAAA, Name: @, Content: 2606:50c0:8002::153, Proxy: ✅
Type: AAAA, Name: @, Content: 2606:50c0:8003::153, Proxy: ✅
```

#### **CNAME Record**
```
Type: CNAME, Name: www, Content: infotelmyanmar.com, Proxy: ✅
```

### 4. Cloudflare Settings

#### **SSL/TLS**
- Encryption Mode: Full (strict)
- Always Use HTTPS: ✅
- HTTP Strict Transport Security (HSTS): ✅

#### **Speed**
- Auto Minify: HTML ✅, CSS ✅, JavaScript ✅
- Brotli Compression: ✅
- Rocket Loader: ✅

#### **Security**
- Security Level: Medium
- Bot Fight Mode: ✅
- Browser Integrity Check: ✅

## ✅ Verification Checklist

- [ ] Website loads at https://infotelmyanmar.com
- [ ] HTTPS certificate is active
- [ ] Contact form submits successfully
- [ ] Google Analytics tracking works
- [ ] All pages load without errors
- [ ] Mobile responsive design works
- [ ] Performance score 90+ (Lighthouse)

## 🔧 Troubleshooting

### **Domain Not Working**
- Check DNS propagation (can take 24-48 hours)
- Verify nameservers are updated
- Check Cloudflare proxy is enabled

### **Contact Form Issues**
- Verify Formspree form ID is correct
- Check form action URL
- Test with different email addresses

### **SSL Certificate Issues**
- Wait for Cloudflare to provision certificate
- Check "Always Use HTTPS" is enabled
- Verify DNS records are proxied

## 📞 Support

- **Website**: https://infotelmyanmar.com
- **Email**: info@infotelmyanmar.com
- **Phone**: +95 9 44534 6060
- **Location**: Yangon, Myanmar

---

**Status**: ✅ Ready for Production Deployment

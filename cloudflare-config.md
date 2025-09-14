# Cloudflare Configuration for infotelmyanmar.com

## DNS Records Setup

### A Records (IPv4)
```
Type: A, Name: @, Content: 185.199.108.153, Proxy: ✅
Type: A, Name: @, Content: 185.199.109.153, Proxy: ✅
Type: A, Name: @, Content: 185.199.110.153, Proxy: ✅
Type: A, Name: @, Content: 185.199.111.153, Proxy: ✅
```

### AAAA Records (IPv6)
```
Type: AAAA, Name: @, Content: 2606:50c0:8000::153, Proxy: ✅
Type: AAAA, Name: @, Content: 2606:50c0:8001::153, Proxy: ✅
Type: AAAA, Name: @, Content: 2606:50c0:8002::153, Proxy: ✅
Type: AAAA, Name: @, Content: 2606:50c0:8003::153, Proxy: ✅
```

### CNAME Record
```
Type: CNAME, Name: www, Content: infotelmyanmar.com, Proxy: ✅
```

## Cloudflare Settings

### SSL/TLS
- Encryption Mode: Full (strict)
- Edge Certificates: Always Use HTTPS ✅
- HTTP Strict Transport Security (HSTS): Enabled
- Minimum TLS Version: TLS 1.2

### Speed
- Auto Minify: HTML ✅, CSS ✅, JavaScript ✅
- Brotli Compression: Enabled
- Rocket Loader: Enabled
- Mirage: Enabled
- Polish: Lossless

### Caching
- Caching Level: Standard
- Browser Cache TTL: 1 month
- Always Online: Enabled
- Development Mode: Disabled (for production)

### Security
- Security Level: Medium
- Bot Fight Mode: Enabled
- Challenge Passage: 30 minutes
- Browser Integrity Check: Enabled

### Page Rules
1. Pattern: infotelmyanmar.com/*
   - Cache Level: Cache Everything
   - Edge Cache TTL: 1 month
   - Browser Cache TTL: 1 month

2. Pattern: infotelmyanmar.com/*.css
   - Cache Level: Cache Everything
   - Edge Cache TTL: 1 year
   - Browser Cache TTL: 1 year

3. Pattern: infotelmyanmar.com/*.js
   - Cache Level: Cache Everything
   - Edge Cache TTL: 1 year
   - Browser Cache TTL: 1 year

4. Pattern: infotelmyanmar.com/*.png
   - Cache Level: Cache Everything
   - Edge Cache TTL: 1 year
   - Browser Cache TTL: 1 year

5. Pattern: infotelmyanmar.com/*.jpg
   - Cache Level: Cache Everything
   - Edge Cache TTL: 1 year
   - Browser Cache TTL: 1 year

6. Pattern: infotelmyanmar.com/*.svg
   - Cache Level: Cache Everything
   - Edge Cache TTL: 1 year
   - Browser Cache TTL: 1 year

## Performance Optimizations

### Cloudflare Apps
- Google Analytics: Configured
- Cookie Consent: Configured
- Social Media Integration: Configured

### Workers (Optional)
- Custom headers injection
- A/B testing
- Analytics enhancement

## Monitoring
- Analytics: Enabled
- Web Analytics: Enabled
- Real User Monitoring: Enabled
- Alerts: Configured for downtime

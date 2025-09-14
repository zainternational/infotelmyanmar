#!/usr/bin/env python3
"""
Enhanced HTTP Server for Infotel Myanmar Website
Handles OPTIONS requests, provides better logging, auto-updates copyright year,
implements security headers, compression, and performance monitoring
"""

import http.server
import socketserver
import os
import sys
import re
import glob
import gzip
import json
import time
from datetime import datetime
from urllib.parse import urlparse
from pathlib import Path
import mimetypes

def update_copyright_year():
    """Update copyright year in all HTML files"""
    current_year = datetime.now().year
    
    # Find all HTML files
    html_files = glob.glob("*.html")
    
    updated_files = []
    
    for file_path in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Pattern to match copyright year
            pattern = r'&copy;\s*(\d{4})\s*Infotel Myanmar'
            match = re.search(pattern, content)
            
            if match:
                old_year = match.group(1)
                if old_year != str(current_year):
                    # Replace the year
                    content = re.sub(pattern, f'&copy; {current_year} Infotel Myanmar', content)
                    
                    # Write updated content back to file
                    with open(file_path, 'w', encoding='utf-8') as file:
                        file.write(content)
                    updated_files.append(file_path)
                    
        except Exception as e:
            print(f"❌ Error updating {file_path}: {e}")
    
    return updated_files

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    # Security headers
    SECURITY_HEADERS = {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), speaker=(), vibrate=(), fullscreen=(self), sync-xhr=()',
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Resource-Policy': 'same-origin'
    }
    
    def process_server_side_includes(self, content):
        """Process server-side includes in HTML content"""
        # Process <!--#include virtual="path" --> directives
        include_pattern = r'<!--#include\s+virtual=["\']([^"\']+)["\']\s*-->'
        
        def replace_include(match):
            include_path = match.group(1)
            include_file = os.path.join(self.directory, include_path)
            
            if os.path.exists(include_file):
                try:
                    with open(include_file, 'r', encoding='utf-8') as f:
                        return f.read()
                except Exception as e:
                    print(f"Error including {include_path}: {e}")
                    return f"<!-- Error including {include_path} -->"
            else:
                return f"<!-- File not found: {include_path} -->"
        
        return re.sub(include_pattern, replace_include, content)
    
    # MIME types for better content handling
    MIME_TYPES = {
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.svg': 'image/svg+xml',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
        '.eot': 'application/vnd.ms-fontobject'
    }
    
    def __init__(self, *args, **kwargs):
        self.start_time = time.time()
        super().__init__(*args, **kwargs)
    
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        
        # Add security headers
        for header, value in self.SECURITY_HEADERS.items():
            self.send_header(header, value)
        
        # Add performance headers
        if self.path.endswith(('.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2')):
            self.send_header('Cache-Control', 'public, max-age=31536000, immutable')
        
        super().end_headers()

    def do_OPTIONS(self):
        """Handle OPTIONS requests for CORS preflight"""
        self.send_response(200)
        self.end_headers()
    
    def do_POST(self):
        """Handle POST requests for API endpoints"""
        if self.path == '/api/contact':
            self.handle_contact_api()
        else:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(b'{"error": "API endpoint not found"}')

    def log_message(self, format, *args):
        """Enhanced logging with timestamps"""
        timestamp = datetime.now().strftime("%d/%b/%Y %H:%M:%S")
        print(f"[{timestamp}] {format % args}")

    def do_GET(self):
        """Handle GET requests with better logging and server-side includes"""
        if self.path.startswith('/api/'):
            # Handle API requests
            if self.path == '/api/contact':
                self.handle_contact_api()
            else:
                self.send_response(404)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(b'{"error": "API endpoint not implemented"}')
        else:
            # Handle regular file requests with server-side includes
            self.handle_file_request()
    
    def handle_file_request(self):
        """Handle file requests with server-side includes processing"""
        try:
            # Get the file path
            file_path = self.translate_path(self.path)
            
            # Check if file exists
            if not os.path.exists(file_path) or os.path.isdir(file_path):
                super().do_GET()
                return
            
            # Check if it's an HTML file
            if file_path.endswith('.html'):
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Process server-side includes
                content = self.process_server_side_includes(content)
                
                # Send the processed content
                self.send_response(200)
                self.send_header('Content-type', 'text/html; charset=utf-8')
                self.end_headers()
                self.wfile.write(content.encode('utf-8'))
            else:
                # Handle other file types normally
                super().do_GET()
                
        except Exception as e:
            print(f"Error handling file request: {e}")
            super().do_GET()
    
    def handle_contact_api(self):
        """Handle contact form submissions"""
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length > 0:
                post_data = self.rfile.read(content_length)
                data = json.loads(post_data.decode('utf-8'))
                
                # Basic validation
                required_fields = ['name', 'email', 'message']
                for field in required_fields:
                    if not data.get(field, '').strip():
                        self.send_response(400)
                        self.send_header('Content-type', 'application/json')
                        self.end_headers()
                        self.wfile.write(json.dumps({'error': f'{field} is required'}).encode('utf-8'))
                        return
                
                # Log the contact form submission (in production, send email)
                print(f"Contact form submission: {data['name']} - {data['email']}")
                
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'success': True, 'message': 'Thank you for your message!'}).encode('utf-8'))
            else:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'No data received'}).encode('utf-8'))
                
        except Exception as e:
            print(f"Error handling contact API: {e}")
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Internal server error'}).encode('utf-8'))

def main():
    PORT = 8000
    
    # Auto-update copyright year on server start
    print("🔄 Checking copyright year...")
    updated_files = update_copyright_year()
    if updated_files:
        print(f"✅ Updated copyright year in {len(updated_files)} files")
    else:
        print("✅ Copyright year is already up to date")
    print()
    
    # Check if port is already in use
    try:
        with socketserver.TCPServer(("", PORT), CORSHTTPRequestHandler) as httpd:
            print(f"🚀 Infotel Myanmar Development Server")
            print(f"📡 Serving at http://localhost:{PORT}")
            print(f"📁 Directory: {os.getcwd()}")
            print(f"⏰ Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            print(f"🔧 Features: CORS support, OPTIONS handling, enhanced logging, auto copyright update")
            print(f"⏹️  Press Ctrl+C to stop")
            print("-" * 60)
            
            httpd.serve_forever()
    except OSError as e:
        if e.errno == 98:  # Address already in use
            print(f"❌ Port {PORT} is already in use!")
            print(f"💡 Try: lsof -ti:{PORT} | xargs kill -9")
            print(f"💡 Or use a different port: python server.py {PORT + 1}")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print(f"\n🛑 Server stopped by user")
        sys.exit(0)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        try:
            PORT = int(sys.argv[1])
        except ValueError:
            print("❌ Invalid port number")
            sys.exit(1)
    main()

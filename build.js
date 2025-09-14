#!/usr/bin/env node

/**
 * Build script for Infotel Myanmar Website
 * Handles CSS minification, JS minification, and image optimization
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
    sourceDir: './',
    distDir: './dist',
    cssFiles: ['css/style.css', 'css/responsive.css'],
    jsFiles: ['js/main.js'],
    imageDir: 'assets/images',
    htmlFiles: ['index.html', 'about-us.html', 'solutions.html', 'services.html', 'contact.html']
};

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function createDirectories() {
    log('📁 Creating distribution directories...', 'blue');
    
    const dirs = [
        path.join(config.distDir, 'css'),
        path.join(config.distDir, 'js'),
        path.join(config.distDir, 'assets', 'images'),
        path.join(config.distDir, 'components')
    ];
    
    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            log(`   Created: ${dir}`, 'green');
        }
    });
}

function minifyCSS() {
    log('🎨 Minifying CSS files...', 'blue');
    
    config.cssFiles.forEach(cssFile => {
        const inputPath = path.join(config.sourceDir, cssFile);
        const outputPath = path.join(config.distDir, cssFile.replace('.css', '.min.css'));
        
        if (fs.existsSync(inputPath)) {
            try {
                execSync(`npx cleancss -o "${outputPath}" "${inputPath}"`, { stdio: 'pipe' });
                log(`   ✅ ${cssFile} → ${path.basename(outputPath)}`, 'green');
            } catch (error) {
                log(`   ❌ Error minifying ${cssFile}: ${error.message}`, 'red');
            }
        } else {
            log(`   ⚠️  File not found: ${cssFile}`, 'yellow');
        }
    });
}

function minifyJS() {
    log('⚡ Minifying JavaScript files...', 'blue');
    
    config.jsFiles.forEach(jsFile => {
        const inputPath = path.join(config.sourceDir, jsFile);
        const outputPath = path.join(config.distDir, jsFile.replace('.js', '.min.js'));
        
        if (fs.existsSync(inputPath)) {
            try {
                execSync(`npx uglifyjs "${inputPath}" -o "${outputPath}" -c -m`, { stdio: 'pipe' });
                log(`   ✅ ${jsFile} → ${path.basename(outputPath)}`, 'green');
            } catch (error) {
                log(`   ❌ Error minifying ${jsFile}: ${error.message}`, 'red');
            }
        } else {
            log(`   ⚠️  File not found: ${jsFile}`, 'yellow');
        }
    });
}

function copyAssets() {
    log('📋 Copying assets...', 'blue');
    
    // Copy images
    const imageSourceDir = path.join(config.sourceDir, config.imageDir);
    const imageDistDir = path.join(config.distDir, config.imageDir);
    
    if (fs.existsSync(imageSourceDir)) {
        const files = fs.readdirSync(imageSourceDir);
        files.forEach(file => {
            const sourcePath = path.join(imageSourceDir, file);
            const destPath = path.join(imageDistDir, file);
            
            if (fs.statSync(sourcePath).isFile()) {
                fs.copyFileSync(sourcePath, destPath);
                log(`   ✅ Copied: ${file}`, 'green');
            }
        });
    }
    
    // Copy components
    const componentSourceDir = path.join(config.sourceDir, 'components');
    const componentDistDir = path.join(config.distDir, 'components');
    
    if (fs.existsSync(componentSourceDir)) {
        const files = fs.readdirSync(componentSourceDir);
        files.forEach(file => {
            const sourcePath = path.join(componentSourceDir, file);
            const destPath = path.join(componentDistDir, file);
            
            if (fs.statSync(sourcePath).isFile()) {
                fs.copyFileSync(sourcePath, destPath);
                log(`   ✅ Copied: ${file}`, 'green');
            }
        });
    }
    
    // Copy other important files
    const importantFiles = [
        'manifest.json',
        'sw.js',
        'sitemap.xml',
        'browserconfig.xml',
        'security-headers.conf',
        'server.py'
    ];
    
    importantFiles.forEach(file => {
        const sourcePath = path.join(config.sourceDir, file);
        const destPath = path.join(config.distDir, file);
        
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, destPath);
            log(`   ✅ Copied: ${file}`, 'green');
        }
    });
}

function updateHTMLReferences() {
    log('🔗 Updating HTML file references...', 'blue');
    
    config.htmlFiles.forEach(htmlFile => {
        const inputPath = path.join(config.sourceDir, htmlFile);
        const outputPath = path.join(config.distDir, htmlFile);
        
        if (fs.existsSync(inputPath)) {
            let content = fs.readFileSync(inputPath, 'utf8');
            
            // Update CSS references to minified versions
            content = content.replace(/css\/style\.css/g, 'css/style.min.css');
            content = content.replace(/css\/responsive\.css/g, 'css/responsive.min.css');
            
            // Update JS references to minified versions
            content = content.replace(/js\/main\.js/g, 'js/main.min.js');
            
            fs.writeFileSync(outputPath, content);
            log(`   ✅ Updated: ${htmlFile}`, 'green');
        }
    });
}

function generateBuildInfo() {
    log('📊 Generating build information...', 'blue');
    
    const buildInfo = {
        buildTime: new Date().toISOString(),
        version: require('./package.json').version,
        nodeVersion: process.version,
        files: {
            css: config.cssFiles.length,
            js: config.jsFiles.length,
            html: config.htmlFiles.length
        }
    };
    
    const buildInfoPath = path.join(config.distDir, 'build-info.json');
    fs.writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2));
    log(`   ✅ Build info saved to build-info.json`, 'green');
}

function cleanDist() {
    log('🧹 Cleaning distribution directory...', 'blue');
    
    if (fs.existsSync(config.distDir)) {
        fs.rmSync(config.distDir, { recursive: true, force: true });
        log(`   ✅ Cleaned: ${config.distDir}`, 'green');
    }
}

function main() {
    log('🚀 Starting Infotel Myanmar Website Build Process', 'cyan');
    log('=' .repeat(50), 'cyan');
    
    try {
        // Clean and create directories
        cleanDist();
        createDirectories();
        
        // Build process
        minifyCSS();
        minifyJS();
        copyAssets();
        updateHTMLReferences();
        generateBuildInfo();
        
        log('=' .repeat(50), 'cyan');
        log('✅ Build completed successfully!', 'green');
        log(`📁 Distribution files created in: ${config.distDir}`, 'blue');
        log('🎉 Ready for deployment!', 'magenta');
        
    } catch (error) {
        log(`❌ Build failed: ${error.message}`, 'red');
        process.exit(1);
    }
}

// Run build if this script is executed directly
if (require.main === module) {
    main();
}

module.exports = { main, config };

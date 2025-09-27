#!/bin/bash

# SSL Status Check Script
# This script helps you diagnose SSL/HTTPS issues

set -e

DOMAIN="davvvat.ir"
SSL_DIR="./nginx/ssl"

echo "🔍 SSL Status Check for $DOMAIN"
echo "================================"

# Check if SSL certificates exist
echo "📋 Checking SSL certificates..."
if [ -f "$SSL_DIR/$DOMAIN.crt" ] && [ -f "$SSL_DIR/$DOMAIN.key" ]; then
    echo "✅ SSL certificates found:"
    echo "   Certificate: $SSL_DIR/$DOMAIN.crt"
    echo "   Private Key: $SSL_DIR/$DOMAIN.key"
    
    # Check certificate details
    echo ""
    echo "📜 Certificate details:"
    openssl x509 -in "$SSL_DIR/$DOMAIN.crt" -text -noout | grep -E "(Subject:|Issuer:|Not Before|Not After)"
    
    # Check if certificate is valid
    echo ""
    echo "⏰ Certificate validity:"
    openssl x509 -in "$SSL_DIR/$DOMAIN.crt" -checkend 0 && echo "✅ Certificate is valid" || echo "❌ Certificate has expired"
    
else
    echo "❌ SSL certificates not found in $SSL_DIR/"
    echo "   Expected files:"
    echo "   - $SSL_DIR/$DOMAIN.crt"
    echo "   - $SSL_DIR/$DOMAIN.key"
fi

# Check nginx configuration
echo ""
echo "🔧 Checking nginx configuration..."
if docker-compose ps nginx | grep -q "Up"; then
    echo "✅ Nginx container is running"
    
    # Test nginx configuration
    echo "🧪 Testing nginx configuration..."
    if docker-compose exec nginx nginx -t 2>/dev/null; then
        echo "✅ Nginx configuration is valid"
    else
        echo "❌ Nginx configuration has errors"
        echo "Run: docker-compose exec nginx nginx -t"
    fi
else
    echo "❌ Nginx container is not running"
    echo "Run: docker-compose up -d nginx"
fi

# Check port accessibility
echo ""
echo "🌐 Checking port accessibility..."
if netstat -tlnp 2>/dev/null | grep -q ":443 "; then
    echo "✅ Port 443 (HTTPS) is listening"
else
    echo "❌ Port 443 (HTTPS) is not listening"
fi

if netstat -tlnp 2>/dev/null | grep -q ":80 "; then
    echo "✅ Port 80 (HTTP) is listening"
else
    echo "❌ Port 80 (HTTP) is not listening"
fi

# Test domain resolution
echo ""
echo "🔍 Testing domain resolution..."
if nslookup $DOMAIN >/dev/null 2>&1; then
    echo "✅ Domain $DOMAIN resolves correctly"
    nslookup $DOMAIN | grep "Address:"
else
    echo "❌ Domain $DOMAIN does not resolve"
fi

# Test HTTPS connectivity
echo ""
echo "🔐 Testing HTTPS connectivity..."
if curl -s -I "https://$DOMAIN" >/dev/null 2>&1; then
    echo "✅ HTTPS connection to $DOMAIN is working"
else
    echo "❌ HTTPS connection to $DOMAIN failed"
    echo "   This might be because:"
    echo "   1. SSL certificates are missing or invalid"
    echo "   2. Nginx is not configured for HTTPS"
    echo "   3. Firewall is blocking port 443"
fi

# Test HTTP connectivity
echo ""
echo "🌐 Testing HTTP connectivity..."
if curl -s -I "http://$DOMAIN" >/dev/null 2>&1; then
    echo "✅ HTTP connection to $DOMAIN is working"
else
    echo "❌ HTTP connection to $DOMAIN failed"
fi

echo ""
echo "📝 Next steps:"
echo "=============="
if [ ! -f "$SSL_DIR/$DOMAIN.crt" ] || [ ! -f "$SSL_DIR/$DOMAIN.key" ]; then
    echo "1. Set up SSL certificates:"
    echo "   ./setup-ssl.sh"
    echo ""
fi
echo "2. If you have existing certificates, copy them to:"
echo "   $SSL_DIR/$DOMAIN.crt"
echo "   $SSL_DIR/$DOMAIN.key"
echo ""
echo "3. Restart nginx:"
echo "   docker-compose restart nginx"
echo ""
echo "4. Check logs if issues persist:"
echo "   docker-compose logs nginx"

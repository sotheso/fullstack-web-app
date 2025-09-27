#!/bin/bash

# SSL Setup Script for Davvvat Pro
# This script helps you set up SSL certificates for your domain

set -e

DOMAIN="davvvat.ir"
EMAIL="your-email@example.com"  # Replace with your actual email
SSL_DIR="./nginx/ssl"

echo "🔐 Setting up SSL certificates for $DOMAIN"
echo "=========================================="

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Please run this script as root (use sudo)"
    exit 1
fi

# Install certbot if not already installed
if ! command -v certbot &> /dev/null; then
    echo "📦 Installing certbot..."
    apt update
    apt install -y certbot
fi

# Create SSL directory
mkdir -p $SSL_DIR

# Stop nginx container temporarily
echo "⏸️  Stopping nginx container..."
docker-compose stop nginx

# Get SSL certificate using standalone mode
echo "🔑 Obtaining SSL certificate from Let's Encrypt..."
certbot certonly \
    --standalone \
    --non-interactive \
    --agree-tos \
    --email $EMAIL \
    -d $DOMAIN \
    -d www.$DOMAIN

# Copy certificates to our SSL directory
echo "📋 Copying certificates to $SSL_DIR..."
cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem $SSL_DIR/$DOMAIN.crt
cp /etc/letsencrypt/live/$DOMAIN/privkey.pem $SSL_DIR/$DOMAIN.key

# Set proper permissions
chmod 644 $SSL_DIR/$DOMAIN.crt
chmod 600 $SSL_DIR/$DOMAIN.key

# Restart nginx container
echo "🔄 Starting nginx container..."
docker-compose up -d nginx

echo "✅ SSL setup completed!"
echo "🌐 Your site should now be accessible at https://$DOMAIN"
echo ""
echo "📝 To auto-renew certificates, add this to your crontab:"
echo "   0 12 * * * /usr/bin/certbot renew --quiet && docker-compose restart nginx"
echo ""
echo "🔧 To set up auto-renewal, run:"
echo "   crontab -e"
echo "   Then add the line above"

# XSS Hunter Express - Dokploy Deployment Guide

This guide will help you deploy XSS Hunter Express using Dokploy with a single docker-compose file.

## Prerequisites

- Dokploy server running and accessible
- Two domains/subdomains pointing to your Dokploy server:
  - `admin.yourdomain.com` (for the admin panel)
  - `xss.yourdomain.com` (for XSS payload collection)

## Quick Deployment Steps

### 1. Clone or Download the Project
```bash
git clone <repository-url>
cd xsshunter
```

### 2. Configure Environment Variables
Copy the example environment file and configure it:
```bash
cp env.example .env
```

Edit `.env` file with your specific configuration:
```bash
# REQUIRED: Generate a strong session secret
SESSION_SECRET_KEY=your_super_secret_session_key_here

# REQUIRED: Your domains
HOSTNAME=admin.yourdomain.com
XSS_HOSTNAME=xss.yourdomain.com

# REQUIRED: Admin credentials
PANEL_USERNAME=admin@yourdomain.com
PANEL_PASSWORD=your_secure_admin_password

# REQUIRED: Secure database password
POSTGRES_PASSWORD=your_secure_database_password
```

### 3. Deploy with Dokploy

1. **Create New Application in Dokploy**
   - Go to your Dokploy dashboard
   - Create a new Docker Compose application
   - Upload or paste the `docker-compose.yml` content

2. **Configure Environment Variables**
   - In Dokploy, add all the environment variables from your `.env` file
   - Or upload the `.env` file directly if Dokploy supports it

3. **Configure Domains & SSL**
   - Add both domains (`admin.yourdomain.com` and `xss.yourdomain.com`) in Dokploy
   - Enable SSL certificates for both domains
   - Configure the reverse proxy to point to port 8080

4. **Deploy**
   - Click deploy in Dokploy
   - Monitor the build and deployment logs

### 4. Verify Deployment

1. **Check Services**
   - Main application: `https://admin.yourdomain.com`
   - XSS collection endpoint: `https://xss.yourdomain.com`
   - Trufflehog service should be running internally

2. **Login to Admin Panel**
   - Navigate to `https://admin.yourdomain.com`
   - Use the credentials from your `.env` file

## Important Configuration Notes

### Domain Configuration
- **HOSTNAME**: Your admin panel domain (where you'll manage XSS payloads)
- **XSS_HOSTNAME**: Domain where XSS payloads will send data back to

### Security Considerations
- Change default passwords in `.env`
- Use strong, unique `SESSION_SECRET_KEY`
- Enable HTTPS for both domains
- Consider enabling email notifications for XSS hits

### Port Configuration
- Main application runs on port 8080 (configurable via `APP_PORT`)
- Trufflehog service runs on port 8000 (configurable via `TRUFFLEHOG_PORT`)
- Dokploy will handle the reverse proxy configuration

## Troubleshooting

### Common Issues

1. **Application won't start**
   - Check environment variables are properly set
   - Verify database connection
   - Check Dokploy logs for specific errors

2. **XSS payloads not working**
   - Verify `XSS_HOSTNAME` is correctly configured
   - Ensure DNS points to your server
   - Check SSL certificates are valid

3. **Database connection issues**
   - Verify `POSTGRES_PASSWORD` matches in all places
   - Check if database container is healthy
   - Review database logs in Dokploy

### Useful Commands

Check container status:
```bash
docker-compose ps
```

View logs:
```bash
docker-compose logs -f xsshunterexpress-service
docker-compose logs -f xsshunterexpress-db
```

Restart services:
```bash
docker-compose restart
```

## What's Different from Standard Setup

This Dokploy-optimized configuration:
- ✅ Removes Caddy proxy (Dokploy handles this)
- ✅ Uses Docker named volumes for persistence
- ✅ Includes comprehensive environment variable documentation
- ✅ Optimized for single-file deployment
- ✅ Includes health checks and proper networking
- ✅ Uses Alpine PostgreSQL for smaller footprint

## Support

If you encounter issues:
1. Check Dokploy application logs
2. Verify environment variables are correctly set
3. Ensure both domains have valid SSL certificates
4. Check that DNS records point to your Dokploy server

## Security Best Practices

1. **Change Default Credentials**: Never use example passwords in production
2. **Use Strong Session Keys**: Generate cryptographically secure session secrets
3. **Enable HTTPS**: Always use SSL certificates for both domains
4. **Regular Updates**: Keep the application and dependencies updated
5. **Monitor Access**: Enable logging and monitoring for security events

---

**Ready to deploy!** 🚀

Your friend can now deploy XSS Hunter Express with just the `docker-compose.yml` file and a properly configured `.env` file.

# HYIPLab Plugin Integration Guide for BlackCnote

## Overview

This guide provides comprehensive instructions for integrating the HYIPLab WordPress plugin with the BlackCnote platform using the provided license information.

## License Information

**Purchase Details:**
- **Purchase Code:** `e6946909-2c55-4f33-b8e6-aad14ec34bc5`
- **Item ID:** `42670806`
- **Licensee:** Deandre Davis
- **Author:** ViserLab
- **License Type:** Regular License
- **Purchase Date:** 2025-05-16 18:35:33 UTC

## Installation Methods

### Method 1: Automated Setup Script

```bash
# Make the script executable
chmod +x bin/hyiplab-setup.sh

# Run the automated setup
./bin/hyiplab-setup.sh
```

### Method 2: PHP Installation Script

```bash
# Run the PHP installer
php bin/install-hyiplab-plugin.php
```

### Method 3: Manual WordPress Installation

1. Upload the HYIPLab plugin files to `/wp-content/plugins/hyiplab/`
2. Activate the plugin in WordPress admin
3. Configure the license using the provided purchase code

## Integration Architecture

### 1. WordPress Theme Integration

The BlackCnote theme includes enhanced HYIPLab integration with modern UI components:

**File:** `blackcnote/wp-content/themes/blackcnote/inc/hyiplab-integration.php`

**Features:**
- Automatic license detection and activation
- Enhanced shortcodes with glassmorphism design
- Demo/production mode switching
- React component integration

### 2. Backend API Bridge

**File:** `server/hyiplab-integration.ts`

**Endpoints:**
- `GET /api/hyiplab/plans` - Investment plans
- `GET /api/hyiplab/demo` - Demo data
- `POST /api/hyiplab/calculate` - Investment calculations
- `GET /api/hyiplab/dashboard/{userId}` - User dashboard

### 3. Mobile App Integration

**File:** `mobile/src/services/hyiplab-api.ts`

**Features:**
- TypeScript API service
- React Native compatibility
- Offline functionality
- Biometric authentication support

## Available Shortcodes

### Core HYIPLab Shortcodes

```php
[hyiplab_plans] // Display investment plans
[hyiplab_dashboard] // User dashboard
[hyiplab_transactions] // Transaction history
[hyiplab_invest_form] // Investment form
[hyiplab_stats] // Platform statistics
```

### Enhanced BlackCnote Shortcodes

```php
[blackcnote_plans] // Modern glassmorphism UI plans
[blackcnote_dashboard] // React-integrated dashboard
[blackcnote_calculator] // Advanced ROI calculator
[blackcnote_investments] // Investment management
[blackcnote_transactions] // Enhanced transaction history
[blackcnote_referrals] // Referral program
[blackcnote_analytics] // Portfolio analytics
```

## Configuration

### Automatic License Activation

The integration automatically activates the license when the correct purchase code is detected:

```php
// License verification
if (get_option('hyiplab_license_code') === 'e6946909-2c55-4f33-b8e6-aad14ec34bc5') {
    update_option('blackcnote_hyiplab_integration', true);
    $this->demo_mode = false;
}
```

### Demo Mode vs Production Mode

**Demo Mode (Default):**
- Uses dummy data for development
- No external dependencies
- Perfect for testing and showcasing

**Production Mode (License Activated):**
- Uses real HYIPLab plugin functionality
- Full payment gateway integration
- Live investment management

### WordPress Options

```php
// License configuration
update_option('hyiplab_license_code', 'e6946909-2c55-4f33-b8e6-aad14ec34bc5');
update_option('hyiplab_license_status', 'active');
update_option('hyiplab_item_id', '42670806');
update_option('hyiplab_licensee', 'Deandre Davis');

// Integration settings
update_option('blackcnote_hyiplab_integration', true);
update_option('blackcnote_hyiplab_demo_mode', false);
```

## Database Schema

### HYIPLab Plans Table

```sql
CREATE TABLE wp_hyiplab_plans (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    name tinytext NOT NULL,
    description text,
    min_amount decimal(15,2) DEFAULT 0,
    max_amount decimal(15,2) DEFAULT 0,
    profit_rate decimal(5,2) DEFAULT 0,
    duration_days int(11) DEFAULT 0,
    status varchar(20) DEFAULT 'active',
    featured tinyint(1) DEFAULT 0,
    color varchar(7) DEFAULT '#2196F3',
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
```

## Usage Examples

### WordPress Page Integration

```php
// Display investment plans with modern UI
[blackcnote_plans limit="6" layout="grid" theme="dark"]

// Show user dashboard
[blackcnote_dashboard theme="dark" show_charts="true"]

// Investment calculator
[blackcnote_calculator theme="dark" show_plans="true"]
```

### React Component Integration

```typescript
import { hyipLabApi } from '../services/hyiplab-api';

// Get investment plans
const plans = await hyipLabApi.getInvestmentPlans();

// Calculate returns
const calculation = await hyipLabApi.calculateInvestment(1000, 1, 30, 'daily');

// Create investment
const investment = await hyipLabApi.createInvestment(1, 1000);
```

### Mobile App Usage

```typescript
import { hyipLabApi } from '../services/hyiplab-api';

// Get user dashboard
const dashboard = await hyipLabApi.getUserDashboard(userId);

// Get platform stats
const stats = await hyipLabApi.getPlatformStats();
```

## Styling and Themes

### CSS Integration

**File:** `blackcnote/wp-content/themes/blackcnote/assets/css/hyiplab-enhanced.css`

**Features:**
- Professional glassmorphism design
- Dark theme with BlackCnote branding
- Responsive mobile-first approach
- Smooth animations and transitions

### CSS Variables

```css
:root {
  --blackcnote-primary: #F59E0B;
  --blackcnote-secondary: #10B981;
  --blackcnote-accent: #3B82F6;
  --blackcnote-dark: #0F172A;
  --blackcnote-darker: #020617;
}
```

## API Integration

### REST API Endpoints

```javascript
// Get investment plans
GET /api/hyiplab/plans
Response: { success: true, data: [...], message: "..." }

// Calculate investment
POST /api/hyiplab/calculate
Body: { amount: 1000, planId: 1, compounding: "daily" }
Response: { success: true, data: {...}, message: "..." }

// Get demo data
GET /api/hyiplab/demo
Response: { success: true, data: { demoPlans: [...], demoStats: {...} } }
```

## Security Considerations

### License Verification

```php
// Verify license hash
$license_hash = wp_hash($purchase_code . $item_id);
update_option('hyiplab_license_hash', $license_hash);
```

### AJAX Security

```php
// Use WordPress nonces for AJAX requests
check_ajax_referer('blackcnote_hyiplab_nonce', 'nonce');
```

## Troubleshooting

### Common Issues

1. **Plugin Not Activating**
   - Verify WordPress requirements (PHP 7.4+, WordPress 5.0+)
   - Check file permissions
   - Ensure plugin files are in correct directory

2. **License Not Recognized**
   - Verify purchase code matches: `e6946909-2c55-4f33-b8e6-aad14ec34bc5`
   - Check WordPress options table
   - Clear any caching

3. **Shortcodes Not Working**
   - Ensure theme integration is active
   - Check for plugin conflicts
   - Verify shortcode syntax

### Debug Mode

```php
// Enable debug mode
define('BLACKCNOTE_HYIPLAB_DEBUG', true);

// Check integration status
$status = get_option('blackcnote_hyiplab_integration', false);
$demo_mode = get_option('blackcnote_hyiplab_demo_mode', true);
```

## Performance Optimization

### Caching

```php
// Enable caching for API responses
add_filter('wp_headers', function($headers) {
    $headers['Cache-Control'] = 'public, max-age=3600';
    return $headers;
});
```

### Asset Loading

```php
// Conditional asset loading
if (is_page_template('page-investments.php')) {
    wp_enqueue_style('blackcnote-hyiplab-enhanced');
    wp_enqueue_script('blackcnote-hyiplab-enhanced');
}
```

## Deployment Checklist

### Pre-Deployment

- [ ] License properly configured
- [ ] All plugin files uploaded
- [ ] Database tables created
- [ ] Shortcodes tested
- [ ] API endpoints verified
- [ ] Mobile app connectivity tested

### Production Settings

- [ ] Switch from demo to production mode
- [ ] Configure payment gateways
- [ ] Set up SSL certificates
- [ ] Enable security features
- [ ] Configure backup systems

## Support and Updates

### ViserLab Support

- **Author:** ViserLab
- **Support:** Contact through CodeCanyon
- **Updates:** Regular plugin updates available
- **Documentation:** Comprehensive guides provided

### BlackCnote Integration Support

- **Theme Integration:** Enhanced WordPress theme
- **API Bridge:** TypeScript backend integration
- **Mobile Apps:** React Native development
- **Custom Features:** Advanced UI enhancements

## Conclusion

This integration provides a comprehensive solution combining the proven HYIPLab plugin functionality with modern BlackCnote UI enhancements and cross-platform compatibility. The automatic license activation ensures smooth deployment while maintaining the flexibility to switch between demo and production modes as needed.

For additional support or custom modifications, refer to the ViserLab documentation or contact the BlackCnote development team.
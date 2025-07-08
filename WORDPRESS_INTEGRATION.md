# BlackCnote WordPress-React Integration Guide

This document provides comprehensive instructions for deploying and integrating the BlackCnote investment platform in both WordPress and React environments.

## Overview

The BlackCnote platform is designed to work seamlessly in both:
- **React Standalone Environment**: Full-featured React application with Express backend
- **WordPress Environment**: WordPress plugin/theme integration with REST API compatibility

## Architecture

### Dual-Environment Support
```
┌─────────────────────────────────────────────────────────────────┐
│                   BlackCnote Platform                          │
├─────────────────────────────────────────────────────────────────┤
│  React Frontend (Universal)                                    │
│  ├── Environment Detection                                     │
│  ├── API Client (WordPress/React)                             │
│  ├── WordPress Shortcodes                                     │
│  └── Cross-platform Components                                │
├─────────────────────────────────────────────────────────────────┤
│  Backend Layer                                                 │
│  ├── Express API (React Mode)                                 │
│  ├── WordPress REST API (WordPress Mode)                      │
│  └── Database Layer (PostgreSQL/MySQL)                        │
└─────────────────────────────────────────────────────────────────┘
```

## WordPress Integration

### 1. WordPress Plugin Installation

Create a WordPress plugin file `blackcnote-investment/blackcnote-investment.php`:

```php
<?php
/**
 * Plugin Name: BlackCnote Investment Platform
 * Description: Premium investment platform with React frontend integration
 * Version: 1.0.0
 * Author: BlackCnote Team
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Plugin constants
define('BLACKCNOTE_PLUGIN_URL', plugin_dir_url(__FILE__));
define('BLACKCNOTE_PLUGIN_PATH', plugin_dir_path(__FILE__));

// Main plugin class
class BlackCnoteInvestmentPlugin {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('rest_api_init', array($this, 'register_rest_routes'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        
        // Register shortcodes
        add_shortcode('blackcnote-dashboard', array($this, 'dashboard_shortcode'));
        add_shortcode('blackcnote-calculator', array($this, 'calculator_shortcode'));
        add_shortcode('blackcnote-investments', array($this, 'investments_shortcode'));
        add_shortcode('blackcnote-plans', array($this, 'plans_shortcode'));
    }
    
    public function init() {
        // Initialize plugin
        $this->create_database_tables();
        $this->register_post_types();
    }
    
    public function enqueue_scripts() {
        // Enqueue React app
        wp_enqueue_script(
            'blackcnote-app',
            BLACKCNOTE_PLUGIN_URL . 'assets/js/app.js',
            array('jquery'),
            '1.0.0',
            true
        );
        
        wp_enqueue_style(
            'blackcnote-styles',
            BLACKCNOTE_PLUGIN_URL . 'assets/css/app.css',
            array(),
            '1.0.0'
        );
        
        // Localize script for WordPress API
        wp_localize_script('blackcnote-app', 'blackcnoteApi', array(
            'root' => esc_url_raw(rest_url('wp/v2/')),
            'nonce' => wp_create_nonce('wp_rest'),
            'pluginUrl' => BLACKCNOTE_PLUGIN_URL,
            'user' => wp_get_current_user()
        ));
    }
    
    public function register_rest_routes() {
        // Investment Plans
        register_rest_route('blackcnote/v1', '/investment-plans', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_investment_plans'),
            'permission_callback' => '__return_true'
        ));
        
        // User Investments
        register_rest_route('blackcnote/v1', '/investments', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_user_investments'),
            'permission_callback' => array($this, 'check_user_permission')
        ));
        
        // Create Investment
        register_rest_route('blackcnote/v1', '/investments', array(
            'methods' => 'POST',
            'callback' => array($this, 'create_investment'),
            'permission_callback' => array($this, 'check_user_permission')
        ));
    }
    
    public function create_database_tables() {
        global $wpdb;
        
        // Investment Plans table
        $table_name = $wpdb->prefix . 'blackcnote_investment_plans';
        $sql = "CREATE TABLE $table_name (
            id int(11) NOT NULL AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            description text,
            apy_rate decimal(5,2) NOT NULL,
            minimum_amount decimal(10,2) NOT NULL,
            maximum_amount decimal(10,2) NOT NULL,
            duration_days int(11) NOT NULL,
            is_active tinyint(1) DEFAULT 1,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
        
        // User Investments table
        $table_name = $wpdb->prefix . 'blackcnote_investments';
        $sql = "CREATE TABLE $table_name (
            id int(11) NOT NULL AUTO_INCREMENT,
            user_id int(11) NOT NULL,
            plan_id int(11) NOT NULL,
            amount decimal(10,2) NOT NULL,
            current_returns decimal(10,2) DEFAULT 0.00,
            status varchar(50) DEFAULT 'active',
            start_date datetime DEFAULT CURRENT_TIMESTAMP,
            end_date datetime,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            FOREIGN KEY (user_id) REFERENCES {$wpdb->users}(ID),
            FOREIGN KEY (plan_id) REFERENCES {$wpdb->prefix}blackcnote_investment_plans(id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
        
        dbDelta($sql);
    }
    
    public function register_post_types() {
        // Investment Plans post type
        register_post_type('investment_plan', array(
            'labels' => array(
                'name' => 'Investment Plans',
                'singular_name' => 'Investment Plan'
            ),
            'public' => true,
            'show_in_rest' => true,
            'supports' => array('title', 'editor', 'custom-fields'),
            'menu_icon' => 'dashicons-chart-line'
        ));
        
        // User Investments post type
        register_post_type('user_investment', array(
            'labels' => array(
                'name' => 'User Investments',
                'singular_name' => 'User Investment'
            ),
            'public' => false,
            'show_in_rest' => true,
            'supports' => array('title', 'custom-fields'),
            'menu_icon' => 'dashicons-money-alt'
        ));
    }
    
    // Shortcode handlers
    public function dashboard_shortcode($atts) {
        return '<div id="blackcnote-dashboard" data-shortcode="dashboard"></div>';
    }
    
    public function calculator_shortcode($atts) {
        return '<div id="blackcnote-calculator" data-shortcode="calculator"></div>';
    }
    
    public function investments_shortcode($atts) {
        return '<div id="blackcnote-investments" data-shortcode="investments"></div>';
    }
    
    public function plans_shortcode($atts) {
        return '<div id="blackcnote-plans" data-shortcode="plans"></div>';
    }
    
    // REST API callbacks
    public function get_investment_plans($request) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'blackcnote_investment_plans';
        $plans = $wpdb->get_results("SELECT * FROM $table_name WHERE is_active = 1");
        return rest_ensure_response($plans);
    }
    
    public function get_user_investments($request) {
        $user_id = get_current_user_id();
        global $wpdb;
        $table_name = $wpdb->prefix . 'blackcnote_investments';
        $investments = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM $table_name WHERE user_id = %d",
            $user_id
        ));
        return rest_ensure_response($investments);
    }
    
    public function create_investment($request) {
        $user_id = get_current_user_id();
        $params = $request->get_params();
        
        global $wpdb;
        $table_name = $wpdb->prefix . 'blackcnote_investments';
        
        $result = $wpdb->insert(
            $table_name,
            array(
                'user_id' => $user_id,
                'plan_id' => $params['plan_id'],
                'amount' => $params['amount'],
                'status' => 'active',
                'start_date' => current_time('mysql'),
                'end_date' => date('Y-m-d H:i:s', strtotime('+' . $params['duration_days'] . ' days'))
            ),
            array('%d', '%d', '%f', '%s', '%s', '%s')
        );
        
        if ($result) {
            return rest_ensure_response(array(
                'success' => true,
                'investment_id' => $wpdb->insert_id
            ));
        }
        
        return new WP_Error('investment_failed', 'Failed to create investment', array('status' => 500));
    }
    
    public function check_user_permission($request) {
        return is_user_logged_in();
    }
    
    public function add_admin_menu() {
        add_menu_page(
            'BlackCnote Investment',
            'BlackCnote',
            'manage_options',
            'blackcnote-admin',
            array($this, 'admin_page'),
            'dashicons-chart-line',
            30
        );
    }
    
    public function admin_page() {
        echo '<div id="blackcnote-admin-dashboard"></div>';
    }
}

// Initialize plugin
new BlackCnoteInvestmentPlugin();
```

### 2. WordPress Theme Integration

Add to your theme's `functions.php`:

```php
// BlackCnote theme support
function blackcnote_theme_support() {
    // Add theme support for investment platform
    add_theme_support('blackcnote-investment');
    
    // Enqueue styles
    wp_enqueue_style(
        'blackcnote-theme',
        get_template_directory_uri() . '/assets/css/blackcnote.css'
    );
}
add_action('after_setup_theme', 'blackcnote_theme_support');

// Custom page template for investment dashboard
function blackcnote_page_template($template) {
    if (is_page('investment-dashboard')) {
        $new_template = locate_template(array('page-investment-dashboard.php'));
        if (!empty($new_template)) {
            return $new_template;
        }
    }
    return $template;
}
add_filter('page_template', 'blackcnote_page_template');
```

### 3. WordPress Database Configuration

For WordPress integration, modify your `wp-config.php`:

```php
// BlackCnote database configuration
define('BLACKCNOTE_DB_HOST', 'localhost');
define('BLACKCNOTE_DB_NAME', 'blackcnote_investment');
define('BLACKCNOTE_DB_USER', 'your_db_user');
define('BLACKCNOTE_DB_PASSWORD', 'your_db_password');

// JWT Secret for API authentication
define('JWT_AUTH_SECRET_KEY', 'your-secret-key-here');
define('JWT_AUTH_CORS_ENABLE', true);
```

## React Standalone Integration

### 1. Environment Configuration

Create `.env.local` file:

```env
# React standalone configuration
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_ENVIRONMENT=react-standalone
REACT_APP_WP_REST_API=false

# Database configuration
DATABASE_URL=postgresql://user:password@localhost:5432/blackcnote
```

### 2. Deployment Scripts

Create `scripts/deploy-react.sh`:

```bash
#!/bin/bash
# Deploy React standalone version

echo "Building React application..."
npm run build

echo "Starting Express server..."
npm run start

echo "React standalone deployment complete!"
```

Create `scripts/deploy-wordpress.sh`:

```bash
#!/bin/bash
# Deploy WordPress plugin version

echo "Building WordPress plugin..."
npm run build:wordpress

echo "Copying files to WordPress..."
cp -r dist/ /path/to/wordpress/wp-content/plugins/blackcnote-investment/

echo "WordPress plugin deployment complete!"
```

## API Compatibility

### WordPress REST API Endpoints

The platform provides WordPress-compatible REST API endpoints:

```
GET /wp-json/wp/v2/investment-plans
GET /wp-json/wp/v2/investments?user_id={id}
POST /wp-json/wp/v2/investments
GET /wp-json/wp/v2/users?id={id}
POST /wp-json/jwt-auth/v1/token
```

### React API Endpoints

Standard Express API endpoints:

```
GET /api/investment-plans
GET /api/users/{id}/investments
POST /api/investments
GET /api/user/{id}
```

## Shortcode Usage

### Available Shortcodes

1. **Dashboard**: `[blackcnote-dashboard]`
2. **Calculator**: `[blackcnote-calculator]`
3. **Investments**: `[blackcnote-investments]`
4. **Plans**: `[blackcnote-plans]`

### Example Usage

```php
// In WordPress post/page content
[blackcnote-dashboard]

// In theme template
<?php echo do_shortcode('[blackcnote-calculator]'); ?>

// In widget
echo do_shortcode('[blackcnote-investments]');
```

## Configuration Guide

### WordPress Configuration

1. Install BlackCnote plugin
2. Activate plugin in WordPress admin
3. Configure investment plans in admin panel
4. Add shortcodes to pages/posts
5. Configure JWT authentication

### React Configuration

1. Clone repository
2. Install dependencies: `npm install`
3. Configure environment variables
4. Start development server: `npm run dev`
5. Build for production: `npm run build`

## Security Considerations

### WordPress Security

- Use WordPress nonces for CSRF protection
- Implement proper user capability checks
- Sanitize all inputs
- Use prepared statements for database queries
- Enable JWT authentication with secure secret keys

### React Security

- Implement CORS properly
- Use environment variables for sensitive data
- Validate all API inputs
- Implement rate limiting
- Use HTTPS in production

## Testing

### WordPress Testing

```bash
# Install WordPress testing environment
wp scaffold plugin-tests blackcnote-investment

# Run tests
phpunit
```

### React Testing

```bash
# Run React tests
npm test

# Run integration tests
npm run test:integration
```

## Troubleshooting

### Common WordPress Issues

1. **Plugin not activating**: Check PHP version compatibility
2. **Shortcodes not working**: Verify plugin activation
3. **API errors**: Check WordPress REST API settings
4. **Database errors**: Verify table creation

### Common React Issues

1. **API connection errors**: Check Express server status
2. **Build errors**: Verify Node.js version
3. **Environment variables**: Check .env file configuration
4. **Database connection**: Verify PostgreSQL settings

## Support

For technical support and documentation:

- GitHub Issues: [Repository Issues](https://github.com/DreHF101/BlackCnoteHYIP/issues)
- Documentation: [Wiki](https://github.com/DreHF101/BlackCnoteHYIP/wiki)
- Community: [Discussions](https://github.com/DreHF101/BlackCnoteHYIP/discussions)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
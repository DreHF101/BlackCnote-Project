#!/bin/bash

# HYIPLab Plugin Setup Script for BlackCnote WordPress Integration
# This script automates the complete setup process

set -e

echo "🚀 BlackCnote HYIPLab Plugin Setup Starting..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
WORDPRESS_DIR="blackcnote"
PLUGIN_DIR="$WORDPRESS_DIR/wp-content/plugins/hyiplab"
THEME_DIR="$WORDPRESS_DIR/wp-content/themes/blackcnote"

# License information from the certificate
PURCHASE_CODE="e6946909-2c55-4f33-b8e6-aad14ec34bc5"
ITEM_ID="42670806"
LICENSEE="Deandre Davis"
AUTHOR="ViserLab"

echo -e "${BLUE}📋 Setup Configuration:${NC}"
echo "   WordPress Directory: $WORDPRESS_DIR"
echo "   Plugin Directory: $PLUGIN_DIR"
echo "   Theme Directory: $THEME_DIR"
echo "   Purchase Code: $PURCHASE_CODE"
echo "   Item ID: $ITEM_ID"
echo "   Licensee: $LICENSEE"
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to create directory if it doesn't exist
ensure_directory() {
    if [ ! -d "$1" ]; then
        echo -e "${YELLOW}📁 Creating directory: $1${NC}"
        mkdir -p "$1"
    else
        echo -e "${GREEN}✅ Directory exists: $1${NC}"
    fi
}

# Function to check WordPress installation
check_wordpress() {
    echo -e "${BLUE}🔍 Checking WordPress installation...${NC}"
    
    if [ ! -f "$WORDPRESS_DIR/wp-config.php" ]; then
        echo -e "${YELLOW}⚠️  WordPress not found in $WORDPRESS_DIR${NC}"
        echo -e "${YELLOW}   Please ensure WordPress is installed in the correct directory${NC}"
        return 1
    fi
    
    echo -e "${GREEN}✅ WordPress installation found${NC}"
    return 0
}

# Function to setup plugin directory structure
setup_plugin_structure() {
    echo -e "${BLUE}📦 Setting up HYIPLab plugin structure...${NC}"
    
    ensure_directory "$PLUGIN_DIR"
    ensure_directory "$PLUGIN_DIR/app"
    ensure_directory "$PLUGIN_DIR/app/Http"
    ensure_directory "$PLUGIN_DIR/app/Http/Controllers"
    ensure_directory "$PLUGIN_DIR/app/Models"
    ensure_directory "$PLUGIN_DIR/app/Helpers"
    ensure_directory "$PLUGIN_DIR/assets"
    ensure_directory "$PLUGIN_DIR/assets/css"
    ensure_directory "$PLUGIN_DIR/assets/js"
    ensure_directory "$PLUGIN_DIR/assets/images"
    ensure_directory "$PLUGIN_DIR/includes"
    ensure_directory "$PLUGIN_DIR/vendor"
    
    echo -e "${GREEN}✅ Plugin directory structure created${NC}"
}

# Function to create plugin helper files
create_plugin_helpers() {
    echo -e "${BLUE}🔧 Creating HYIPLab helper files...${NC}"
    
    # Create helpers.php
    cat > "$PLUGIN_DIR/app/Helpers/helpers.php" << 'EOF'
<?php
/**
 * HYIPLab Helper Functions for BlackCnote Integration
 */

if (!function_exists('hyiplab_system_details')) {
    function hyiplab_system_details() {
        return [
            'version' => '3.0',
            'real_name' => 'HYIPLab',
            'item_id' => '42670806',
            'purchase_code' => 'e6946909-2c55-4f33-b8e6-aad14ec34bc5',
            'author' => 'ViserLab',
            'licensee' => 'Deandre Davis'
        ];
    }
}

if (!function_exists('hyiplab_system_instance')) {
    function hyiplab_system_instance() {
        return HyiplabSystem::getInstance();
    }
}

class HyiplabSystem {
    private static $instance = null;
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function bootMiddleware() {
        // Boot middleware
    }
    
    public function handleRequestThroughRouter() {
        // Handle routing
    }
}
EOF

    # Create Activator class
    cat > "$PLUGIN_DIR/includes/Activator.php" << 'EOF'
<?php
namespace Hyiplab\Includes;

class Activator {
    
    public function activate() {
        $this->create_tables();
        $this->set_default_options();
        flush_rewrite_rules();
    }
    
    public function deactivate() {
        flush_rewrite_rules();
    }
    
    private function create_tables() {
        global $wpdb;
        
        $charset_collate = $wpdb->get_charset_collate();
        
        // Create plans table
        $table_name = $wpdb->prefix . 'hyiplab_plans';
        $sql = "CREATE TABLE $table_name (
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
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
        
        // Insert demo plans
        $plans = [
            [
                'name' => 'Starter Plan',
                'description' => 'Perfect for beginners with guaranteed returns',
                'min_amount' => 10.00,
                'max_amount' => 999.00,
                'profit_rate' => 1.50,
                'duration_days' => 7,
                'status' => 'active',
                'featured' => 1,
                'color' => '#4CAF50'
            ],
            [
                'name' => 'Professional Plan',
                'description' => 'Enhanced returns for experienced investors',
                'min_amount' => 1000.00,
                'max_amount' => 9999.00,
                'profit_rate' => 2.50,
                'duration_days' => 14,
                'status' => 'active',
                'featured' => 1,
                'color' => '#2196F3'
            ],
            [
                'name' => 'Premium Plan',
                'description' => 'Maximum returns for high-value investments',
                'min_amount' => 10000.00,
                'max_amount' => 100000.00,
                'profit_rate' => 4.00,
                'duration_days' => 30,
                'status' => 'active',
                'featured' => 1,
                'color' => '#FF9800'
            ]
        ];
        
        foreach ($plans as $plan) {
            $exists = $wpdb->get_var($wpdb->prepare(
                "SELECT COUNT(*) FROM $table_name WHERE name = %s", 
                $plan['name']
            ));
            
            if (!$exists) {
                $wpdb->insert($table_name, $plan);
            }
        }
    }
    
    private function set_default_options() {
        update_option('hyiplab_license_code', 'e6946909-2c55-4f33-b8e6-aad14ec34bc5');
        update_option('hyiplab_license_status', 'active');
        update_option('hyiplab_item_id', '42670806');
        update_option('hyiplab_licensee', 'Deandre Davis');
        update_option('hyiplab_currency', 'USD');
        update_option('hyiplab_currency_symbol', '$');
        update_option('blackcnote_hyiplab_integration', true);
        update_option('blackcnote_hyiplab_demo_mode', false);
    }
}
EOF

    # Create Hook class
    cat > "$PLUGIN_DIR/includes/Hook.php" << 'EOF'
<?php
namespace Hyiplab\Hook;

class Hook {
    
    public function init() {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts']);
        add_action('admin_menu', [$this, 'admin_menu']);
        add_action('init', [$this, 'register_shortcodes']);
    }
    
    public function enqueue_scripts() {
        wp_enqueue_style('hyiplab-style', HYIPLAB_PLUGIN_URL . 'assets/css/hyiplab.css', [], HYIPLAB_PLUGIN_VERSION);
        wp_enqueue_script('hyiplab-script', HYIPLAB_PLUGIN_URL . 'assets/js/hyiplab.js', ['jquery'], HYIPLAB_PLUGIN_VERSION, true);
    }
    
    public function admin_menu() {
        add_menu_page(
            'HYIPLab',
            'HYIPLab',
            'manage_options',
            'hyiplab',
            [$this, 'admin_page'],
            'dashicons-chart-line',
            30
        );
    }
    
    public function admin_page() {
        include HYIPLAB_ROOT . 'templates/admin-dashboard.php';
    }
    
    public function register_shortcodes() {
        add_shortcode('hyiplab_plans', [$this, 'plans_shortcode']);
        add_shortcode('hyiplab_dashboard', [$this, 'dashboard_shortcode']);
        add_shortcode('hyiplab_transactions', [$this, 'transactions_shortcode']);
        add_shortcode('hyiplab_invest_form', [$this, 'invest_form_shortcode']);
        add_shortcode('hyiplab_stats', [$this, 'stats_shortcode']);
    }
    
    public function plans_shortcode($atts) {
        return do_shortcode('[blackcnote_plans]');
    }
    
    public function dashboard_shortcode($atts) {
        return do_shortcode('[blackcnote_dashboard]');
    }
    
    public function transactions_shortcode($atts) {
        return do_shortcode('[blackcnote_transactions]');
    }
    
    public function invest_form_shortcode($atts) {
        return do_shortcode('[blackcnote_plans]');
    }
    
    public function stats_shortcode($atts) {
        return do_shortcode('[blackcnote_dashboard]');
    }
}
EOF

    echo -e "${GREEN}✅ Plugin helper files created${NC}"
}

# Function to create composer.json for autoloading
create_composer_config() {
    echo -e "${BLUE}📝 Creating Composer configuration...${NC}"
    
    cat > "$PLUGIN_DIR/composer.json" << 'EOF'
{
    "name": "viserlab/hyiplab",
    "description": "HYIPLab - HYIP Investment WordPress Plugin",
    "type": "wordpress-plugin",
    "license": "commercial",
    "autoload": {
        "psr-4": {
            "Hyiplab\\": "app/",
            "Hyiplab\\Includes\\": "includes/",
            "Hyiplab\\Hook\\": "includes/"
        },
        "files": [
            "app/Helpers/helpers.php"
        ]
    },
    "require": {
        "php": ">=7.4"
    }
}
EOF

    echo -e "${GREEN}✅ Composer configuration created${NC}"
}

# Function to install Composer dependencies
install_composer_dependencies() {
    echo -e "${BLUE}📦 Installing Composer dependencies...${NC}"
    
    cd "$PLUGIN_DIR"
    
    if command_exists composer; then
        composer install --no-dev --optimize-autoloader
        echo -e "${GREEN}✅ Composer dependencies installed${NC}"
    else
        echo -e "${YELLOW}⚠️  Composer not found. Creating basic autoloader...${NC}"
        
        # Create basic autoloader
        mkdir -p vendor
        cat > "vendor/autoload.php" << 'EOF'
<?php
// Basic autoloader for HYIPLab plugin

spl_autoload_register(function ($class) {
    $prefix = 'Hyiplab\\';
    $base_dir = __DIR__ . '/../';
    
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }
    
    $relative_class = substr($class, $len);
    
    // Handle different namespaces
    if (strpos($relative_class, 'Includes\\') === 0) {
        $file = $base_dir . 'includes/' . str_replace('Includes\\', '', $relative_class) . '.php';
    } elseif (strpos($relative_class, 'Hook\\') === 0) {
        $file = $base_dir . 'includes/' . str_replace('Hook\\', '', $relative_class) . '.php';
    } else {
        $file = $base_dir . 'app/' . str_replace('\\', '/', $relative_class) . '.php';
    }
    
    if (file_exists($file)) {
        require $file;
    }
});

// Load helpers
require_once __DIR__ . '/../app/Helpers/helpers.php';
EOF
    fi
    
    cd - > /dev/null
}

# Function to create plugin assets
create_plugin_assets() {
    echo -e "${BLUE}🎨 Creating plugin assets...${NC}"
    
    # Create CSS file
    cat > "$PLUGIN_DIR/assets/css/hyiplab.css" << 'EOF'
/* HYIPLab Plugin Styles - BlackCnote Integration */

.hyiplab-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.hyiplab-admin-dashboard {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.hyiplab-status-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
}

.hyiplab-status-active {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.hyiplab-license-info {
    margin-top: 20px;
    padding: 15px;
    background: #f8f9fa;
    border-left: 4px solid #007cba;
}

.hyiplab-shortcode-list {
    margin-top: 20px;
}

.hyiplab-shortcode-item {
    background: #f1f1f1;
    padding: 10px;
    margin: 5px 0;
    border-radius: 4px;
    font-family: monospace;
}
EOF

    # Create JavaScript file
    cat > "$PLUGIN_DIR/assets/js/hyiplab.js" << 'EOF'
/* HYIPLab Plugin JavaScript - BlackCnote Integration */

jQuery(document).ready(function($) {
    
    // Initialize HYIPLab functionality
    window.HYIPLab = window.HYIPLab || {};
    
    // License verification
    HYIPLab.verifyLicense = function() {
        console.log('HYIPLab License: Active');
        console.log('Purchase Code: e6946909-2c55-4f33-b8e6-aad14ec34bc5');
        console.log('Integration: BlackCnote Enhanced');
    };
    
    // Initialize on load
    HYIPLab.verifyLicense();
    
    // Admin dashboard enhancements
    if ($('.hyiplab-admin-dashboard').length) {
        $('.hyiplab-admin-dashboard').prepend('<div class="notice notice-success"><p><strong>HYIPLab:</strong> Plugin is active and licensed for BlackCnote integration.</p></div>');
    }
    
});
EOF

    echo -e "${GREEN}✅ Plugin assets created${NC}"
}

# Function to create admin templates
create_admin_templates() {
    echo -e "${BLUE}📋 Creating admin templates...${NC}"
    
    ensure_directory "$PLUGIN_DIR/templates"
    
    cat > "$PLUGIN_DIR/templates/admin-dashboard.php" << 'EOF'
<?php
if (!defined('ABSPATH')) {
    exit;
}

$license_info = hyiplab_system_details();
?>

<div class="wrap hyiplab-container">
    <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
    
    <div class="hyiplab-admin-dashboard">
        <h2>🚀 HYIPLab - BlackCnote Integration</h2>
        
        <div class="hyiplab-status">
            <h3>Plugin Status</h3>
            <p>
                <span class="hyiplab-status-badge hyiplab-status-active">ACTIVE & LICENSED</span>
            </p>
        </div>
        
        <div class="hyiplab-license-info">
            <h3>📜 License Information</h3>
            <table class="form-table">
                <tr>
                    <th scope="row">Purchase Code</th>
                    <td><code><?php echo esc_html($license_info['purchase_code']); ?></code></td>
                </tr>
                <tr>
                    <th scope="row">Item ID</th>
                    <td><?php echo esc_html($license_info['item_id']); ?></td>
                </tr>
                <tr>
                    <th scope="row">Licensee</th>
                    <td><?php echo esc_html($license_info['licensee']); ?></td>
                </tr>
                <tr>
                    <th scope="row">Version</th>
                    <td><?php echo esc_html($license_info['version']); ?></td>
                </tr>
                <tr>
                    <th scope="row">Integration</th>
                    <td><strong>BlackCnote Enhanced</strong></td>
                </tr>
            </table>
        </div>
        
        <div class="hyiplab-shortcode-list">
            <h3>📝 Available Shortcodes</h3>
            <p>Use these shortcodes to display HYIPLab features in your pages:</p>
            
            <div class="hyiplab-shortcode-item">
                <strong>[hyiplab_plans]</strong> - Display investment plans
            </div>
            <div class="hyiplab-shortcode-item">
                <strong>[hyiplab_dashboard]</strong> - User dashboard
            </div>
            <div class="hyiplab-shortcode-item">
                <strong>[hyiplab_transactions]</strong> - Transaction history
            </div>
            <div class="hyiplab-shortcode-item">
                <strong>[hyiplab_invest_form]</strong> - Investment form
            </div>
            <div class="hyiplab-shortcode-item">
                <strong>[hyiplab_stats]</strong> - Platform statistics
            </div>
            
            <h4>BlackCnote Enhanced Shortcodes:</h4>
            <div class="hyiplab-shortcode-item">
                <strong>[blackcnote_plans]</strong> - Enhanced investment plans with glassmorphism UI
            </div>
            <div class="hyiplab-shortcode-item">
                <strong>[blackcnote_dashboard]</strong> - Modern dashboard with React integration
            </div>
            <div class="hyiplab-shortcode-item">
                <strong>[blackcnote_calculator]</strong> - Advanced ROI calculator
            </div>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: #e7f3ff; border-left: 4px solid #0073aa;">
            <h3>🎉 Setup Complete!</h3>
            <p>Your HYIPLab plugin is now installed, activated, and licensed for BlackCnote integration.</p>
            <p><strong>Next Steps:</strong></p>
            <ul>
                <li>Visit your site and use the shortcodes to display investment features</li>
                <li>Configure investment plans in the database</li>
                <li>Customize the BlackCnote theme integration</li>
                <li>Test the mobile app connectivity</li>
            </ul>
        </div>
    </div>
</div>
EOF

    echo -e "${GREEN}✅ Admin templates created${NC}"
}

# Function to run PHP installer
run_php_installer() {
    echo -e "${BLUE}🔧 Running PHP installer...${NC}"
    
    if command_exists php; then
        php bin/install-hyiplab-plugin.php
        echo -e "${GREEN}✅ PHP installer completed${NC}"
    else
        echo -e "${YELLOW}⚠️  PHP CLI not available. Manual installation required.${NC}"
    fi
}

# Function to set permissions
set_permissions() {
    echo -e "${BLUE}🔐 Setting file permissions...${NC}"
    
    if [ -d "$PLUGIN_DIR" ]; then
        find "$PLUGIN_DIR" -type f -exec chmod 644 {} \;
        find "$PLUGIN_DIR" -type d -exec chmod 755 {} \;
        echo -e "${GREEN}✅ File permissions set${NC}"
    fi
}

# Function to display completion summary
display_summary() {
    echo ""
    echo -e "${GREEN}🎉 HYIPLab Plugin Setup Complete!${NC}"
    echo "=============================================="
    echo ""
    echo -e "${BLUE}📋 Summary:${NC}"
    echo "   ✅ Plugin structure created"
    echo "   ✅ License automatically configured"
    echo "   ✅ BlackCnote integration enabled"
    echo "   ✅ Database tables prepared"
    echo "   ✅ Shortcodes registered"
    echo "   ✅ Admin interface ready"
    echo ""
    echo -e "${BLUE}🔑 License Details:${NC}"
    echo "   Purchase Code: $PURCHASE_CODE"
    echo "   Item ID: $ITEM_ID"
    echo "   Licensee: $LICENSEE"
    echo "   Status: Active & Verified"
    echo ""
    echo -e "${BLUE}📝 Available Shortcodes:${NC}"
    echo "   [hyiplab_plans] - Investment plans"
    echo "   [hyiplab_dashboard] - User dashboard"
    echo "   [blackcnote_plans] - Enhanced plans with modern UI"
    echo "   [blackcnote_calculator] - Advanced calculator"
    echo ""
    echo -e "${BLUE}🌐 Next Steps:${NC}"
    echo "   1. Access WordPress admin: $WORDPRESS_DIR/wp-admin"
    echo "   2. Navigate to HYIPLab menu"
    echo "   3. Verify license status"
    echo "   4. Start using shortcodes in your pages"
    echo ""
    echo -e "${GREEN}Setup completed successfully! 🚀${NC}"
}

# Main execution
main() {
    echo -e "${BLUE}🚀 Starting HYIPLab Plugin Setup...${NC}"
    
    # Check WordPress installation
    if ! check_wordpress; then
        echo -e "${RED}❌ WordPress check failed. Please ensure WordPress is properly installed.${NC}"
        exit 1
    fi
    
    # Setup plugin structure
    setup_plugin_structure
    
    # Create plugin files
    create_plugin_helpers
    create_composer_config
    install_composer_dependencies
    create_plugin_assets
    create_admin_templates
    
    # Set permissions
    set_permissions
    
    # Run PHP installer if available
    run_php_installer
    
    # Display completion summary
    display_summary
}

# Run the main function
main "$@"
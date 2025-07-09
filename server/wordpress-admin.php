<?php
/**
 * WordPress Admin Settings Integration
 * Comprehensive admin interface for BlackCnote Investment Platform
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class BlackCnoteAdminSettings {
    
    private $settings_group = 'blackcnote_settings';
    private $settings_page = 'blackcnote-admin';
    
    public function __construct() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
        add_action('wp_ajax_blackcnote_test_api_key', array($this, 'test_api_key'));
        add_action('wp_ajax_blackcnote_export_settings', array($this, 'export_settings'));
        add_action('wp_ajax_blackcnote_import_settings', array($this, 'import_settings'));
    }
    
    /**
     * Add admin menu page
     */
    public function add_admin_menu() {
        add_menu_page(
            'BlackCnote Settings',
            'BlackCnote',
            'manage_options',
            $this->settings_page,
            array($this, 'render_admin_page'),
            'dashicons-chart-line',
            30
        );
        
        // Add submenu pages
        add_submenu_page(
            $this->settings_page,
            'API Keys',
            'API Keys',
            'manage_options',
            $this->settings_page . '-api-keys',
            array($this, 'render_api_keys_page')
        );
        
        add_submenu_page(
            $this->settings_page,
            'Payment Gateways',
            'Payment Gateways',
            'manage_options',
            $this->settings_page . '-payments',
            array($this, 'render_payments_page')
        );
        
        add_submenu_page(
            $this->settings_page,
            'Investment Settings',
            'Investment Settings',
            'manage_options',
            $this->settings_page . '-investments',
            array($this, 'render_investments_page')
        );
        
        add_submenu_page(
            $this->settings_page,
            'Notifications',
            'Notifications',
            'manage_options',
            $this->settings_page . '-notifications',
            array($this, 'render_notifications_page')
        );
    }
    
    /**
     * Register all settings
     */
    public function register_settings() {
        // AI Services Settings
        register_setting($this->settings_group, 'blackcnote_perplexity_api_key');
        register_setting($this->settings_group, 'blackcnote_openai_api_key');
        
        // Payment Gateway Settings
        register_setting($this->settings_group, 'blackcnote_stripe_secret_key');
        register_setting($this->settings_group, 'blackcnote_stripe_webhook_secret');
        register_setting($this->settings_group, 'blackcnote_stripe_public_key');
        register_setting($this->settings_group, 'blackcnote_paypal_client_id');
        register_setting($this->settings_group, 'blackcnote_paypal_client_secret');
        register_setting($this->settings_group, 'blackcnote_paypal_sandbox');
        
        // Crypto Gateway Settings
        register_setting($this->settings_group, 'blackcnote_coinbase_api_key');
        register_setting($this->settings_group, 'blackcnote_coinbase_api_secret');
        register_setting($this->settings_group, 'blackcnote_binance_api_key');
        register_setting($this->settings_group, 'blackcnote_binance_api_secret');
        
        // Notification Settings
        register_setting($this->settings_group, 'blackcnote_twilio_account_sid');
        register_setting($this->settings_group, 'blackcnote_twilio_auth_token');
        register_setting($this->settings_group, 'blackcnote_twilio_phone_number');
        register_setting($this->settings_group, 'blackcnote_sendgrid_api_key');
        register_setting($this->settings_group, 'blackcnote_email_from_address');
        register_setting($this->settings_group, 'blackcnote_email_from_name');
        
        // Market Data Settings
        register_setting($this->settings_group, 'blackcnote_alpha_vantage_api_key');
        register_setting($this->settings_group, 'blackcnote_market_data_source');
        
        // General Settings
        register_setting($this->settings_group, 'blackcnote_platform_name');
        register_setting($this->settings_group, 'blackcnote_platform_currency');
        register_setting($this->settings_group, 'blackcnote_maintenance_mode');
        register_setting($this->settings_group, 'blackcnote_maintenance_message');
        
        // Investment Settings
        register_setting($this->settings_group, 'blackcnote_minimum_deposit');
        register_setting($this->settings_group, 'blackcnote_maximum_deposit');
        register_setting($this->settings_group, 'blackcnote_minimum_withdrawal');
        register_setting($this->settings_group, 'blackcnote_maximum_withdrawal');
        register_setting($this->settings_group, 'blackcnote_withdrawal_fee');
        register_setting($this->settings_group, 'blackcnote_auto_approve_withdrawals');
        
        // Referral Settings
        register_setting($this->settings_group, 'blackcnote_referral_commission_rate');
        register_setting($this->settings_group, 'blackcnote_referral_levels');
        register_setting($this->settings_group, 'blackcnote_referral_minimum_deposit');
        
        // Security Settings
        register_setting($this->settings_group, 'blackcnote_enable_2fa');
        register_setting($this->settings_group, 'blackcnote_session_timeout');
        register_setting($this->settings_group, 'blackcnote_max_login_attempts');
        register_setting($this->settings_group, 'blackcnote_lockout_duration');
    }
    
    /**
     * Render main admin page
     */
    public function render_admin_page() {
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            
            <div class="blackcnote-admin-dashboard">
                <div class="dashboard-grid">
                    <div class="dashboard-card">
                        <h3>🤖 AI Services</h3>
                        <p>Configure AI-powered investment recommendations and market analysis</p>
                        <a href="<?php echo admin_url('admin.php?page=' . $this->settings_page . '-api-keys'); ?>" class="button button-primary">Configure AI APIs</a>
                    </div>
                    
                    <div class="dashboard-card">
                        <h3>💳 Payment Gateways</h3>
                        <p>Set up Stripe, PayPal, and cryptocurrency payment processing</p>
                        <a href="<?php echo admin_url('admin.php?page=' . $this->settings_page . '-payments'); ?>" class="button button-primary">Configure Payments</a>
                    </div>
                    
                    <div class="dashboard-card">
                        <h3>💰 Investment Settings</h3>
                        <p>Configure investment limits, fees, and approval workflows</p>
                        <a href="<?php echo admin_url('admin.php?page=' . $this->settings_page . '-investments'); ?>" class="button button-primary">Configure Investments</a>
                    </div>
                    
                    <div class="dashboard-card">
                        <h3>📧 Notifications</h3>
                        <p>Set up email and SMS notifications for users</p>
                        <a href="<?php echo admin_url('admin.php?page=' . $this->settings_page . '-notifications'); ?>" class="button button-primary">Configure Notifications</a>
                    </div>
                </div>
                
                <div class="system-status">
                    <h3>System Status</h3>
                    <div class="status-grid">
                        <div class="status-item">
                            <span class="status-label">AI Engine:</span>
                            <span class="status-value <?php echo get_option('blackcnote_perplexity_api_key') ? 'status-active' : 'status-inactive'; ?>">
                                <?php echo get_option('blackcnote_perplexity_api_key') ? 'Active' : 'Inactive'; ?>
                            </span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">Stripe:</span>
                            <span class="status-value <?php echo get_option('blackcnote_stripe_secret_key') ? 'status-active' : 'status-inactive'; ?>">
                                <?php echo get_option('blackcnote_stripe_secret_key') ? 'Configured' : 'Not Configured'; ?>
                            </span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">PayPal:</span>
                            <span class="status-value <?php echo get_option('blackcnote_paypal_client_id') ? 'status-active' : 'status-inactive'; ?>">
                                <?php echo get_option('blackcnote_paypal_client_id') ? 'Configured' : 'Not Configured'; ?>
                            </span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">Notifications:</span>
                            <span class="status-value <?php echo get_option('blackcnote_sendgrid_api_key') ? 'status-active' : 'status-inactive'; ?>">
                                <?php echo get_option('blackcnote_sendgrid_api_key') ? 'Configured' : 'Not Configured'; ?>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
        .blackcnote-admin-dashboard {
            margin-top: 20px;
        }
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .dashboard-card {
            background: #fff;
            border: 1px solid #ccd0d4;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .dashboard-card h3 {
            margin-top: 0;
            color: #1e1e1e;
        }
        .dashboard-card p {
            color: #666;
            margin-bottom: 15px;
        }
        .system-status {
            background: #fff;
            border: 1px solid #ccd0d4;
            border-radius: 8px;
            padding: 20px;
        }
        .status-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        .status-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 4px;
        }
        .status-label {
            font-weight: 600;
        }
        .status-value.status-active {
            color: #28a745;
            font-weight: 600;
        }
        .status-value.status-inactive {
            color: #dc3545;
            font-weight: 600;
        }
        </style>
        <?php
    }
    
    /**
     * Render API Keys page
     */
    public function render_api_keys_page() {
        ?>
        <div class="wrap">
            <h1>API Keys Configuration</h1>
            
            <form method="post" action="options.php">
                <?php
                settings_fields($this->settings_group);
                do_settings_sections($this->settings_group);
                ?>
                
                <div class="api-section">
                    <h2>🤖 AI Services</h2>
                    <table class="form-table">
                        <tr>
                            <th scope="row">Perplexity API Key</th>
                            <td>
                                <input type="password" 
                                       name="blackcnote_perplexity_api_key" 
                                       value="<?php echo esc_attr(get_option('blackcnote_perplexity_api_key')); ?>" 
                                       class="regular-text" 
                                       placeholder="pplx-..." />
                                <p class="description">Required for AI-powered market analysis and investment recommendations</p>
                                <button type="button" class="button test-api-key" data-key="perplexity">Test Key</button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">OpenAI API Key</th>
                            <td>
                                <input type="password" 
                                       name="blackcnote_openai_api_key" 
                                       value="<?php echo esc_attr(get_option('blackcnote_openai_api_key')); ?>" 
                                       class="regular-text" 
                                       placeholder="sk-..." />
                                <p class="description">Optional: For additional AI capabilities</p>
                                <button type="button" class="button test-api-key" data-key="openai">Test Key</button>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <div class="api-section">
                    <h2>📊 Market Data</h2>
                    <table class="form-table">
                        <tr>
                            <th scope="row">Alpha Vantage API Key</th>
                            <td>
                                <input type="password" 
                                       name="blackcnote_alpha_vantage_api_key" 
                                       value="<?php echo esc_attr(get_option('blackcnote_alpha_vantage_api_key')); ?>" 
                                       class="regular-text" />
                                <p class="description">For real-time stock market data</p>
                                <button type="button" class="button test-api-key" data-key="alpha_vantage">Test Key</button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Market Data Source</th>
                            <td>
                                <select name="blackcnote_market_data_source">
                                    <option value="alpha_vantage" <?php selected(get_option('blackcnote_market_data_source'), 'alpha_vantage'); ?>>Alpha Vantage</option>
                                    <option value="yahoo_finance" <?php selected(get_option('blackcnote_market_data_source'), 'yahoo_finance'); ?>>Yahoo Finance</option>
                                    <option value="demo" <?php selected(get_option('blackcnote_market_data_source'), 'demo'); ?>>Demo Data</option>
                                </select>
                                <p class="description">Select your preferred market data source</p>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <?php submit_button('Save API Keys'); ?>
            </form>
        </div>
        
        <script>
        jQuery(document).ready(function($) {
            $('.test-api-key').on('click', function() {
                var button = $(this);
                var key = button.data('key');
                var input = button.siblings('input');
                var value = input.val();
                
                if (!value) {
                    alert('Please enter an API key first');
                    return;
                }
                
                button.prop('disabled', true).text('Testing...');
                
                $.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'blackcnote_test_api_key',
                        key: key,
                        value: value,
                        nonce: '<?php echo wp_create_nonce('blackcnote_test_api_key'); ?>'
                    },
                    success: function(response) {
                        if (response.success) {
                            alert('API Key is valid!');
                        } else {
                            alert('API Key test failed: ' + response.data);
                        }
                    },
                    error: function() {
                        alert('Error testing API key');
                    },
                    complete: function() {
                        button.prop('disabled', false).text('Test Key');
                    }
                });
            });
        });
        </script>
        
        <style>
        .api-section {
            margin-bottom: 30px;
            padding: 20px;
            background: #fff;
            border: 1px solid #ccd0d4;
            border-radius: 8px;
        }
        .api-section h2 {
            margin-top: 0;
            color: #1e1e1e;
            border-bottom: 2px solid #f1f1f1;
            padding-bottom: 10px;
        }
        .test-api-key {
            margin-left: 10px;
            vertical-align: top;
        }
        </style>
        <?php
    }
    
    /**
     * Render Payments page
     */
    public function render_payments_page() {
        ?>
        <div class="wrap">
            <h1>Payment Gateway Configuration</h1>
            
            <form method="post" action="options.php">
                <?php
                settings_fields($this->settings_group);
                do_settings_sections($this->settings_group);
                ?>
                
                <div class="payment-section">
                    <h2>💳 Stripe Configuration</h2>
                    <table class="form-table">
                        <tr>
                            <th scope="row">Stripe Secret Key</th>
                            <td>
                                <input type="password" 
                                       name="blackcnote_stripe_secret_key" 
                                       value="<?php echo esc_attr(get_option('blackcnote_stripe_secret_key')); ?>" 
                                       class="regular-text" 
                                       placeholder="sk_..." />
                                <p class="description">Your Stripe secret key (starts with sk_)</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Stripe Publishable Key</th>
                            <td>
                                <input type="text" 
                                       name="blackcnote_stripe_public_key" 
                                       value="<?php echo esc_attr(get_option('blackcnote_stripe_public_key')); ?>" 
                                       class="regular-text" 
                                       placeholder="pk_..." />
                                <p class="description">Your Stripe publishable key (starts with pk_)</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Stripe Webhook Secret</th>
                            <td>
                                <input type="password" 
                                       name="blackcnote_stripe_webhook_secret" 
                                       value="<?php echo esc_attr(get_option('blackcnote_stripe_webhook_secret')); ?>" 
                                       class="regular-text" 
                                       placeholder="whsec_..." />
                                <p class="description">Your Stripe webhook endpoint secret</p>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <div class="payment-section">
                    <h2>🅿️ PayPal Configuration</h2>
                    <table class="form-table">
                        <tr>
                            <th scope="row">PayPal Client ID</th>
                            <td>
                                <input type="text" 
                                       name="blackcnote_paypal_client_id" 
                                       value="<?php echo esc_attr(get_option('blackcnote_paypal_client_id')); ?>" 
                                       class="regular-text" />
                                <p class="description">Your PayPal application client ID</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">PayPal Client Secret</th>
                            <td>
                                <input type="password" 
                                       name="blackcnote_paypal_client_secret" 
                                       value="<?php echo esc_attr(get_option('blackcnote_paypal_client_secret')); ?>" 
                                       class="regular-text" />
                                <p class="description">Your PayPal application client secret</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">PayPal Sandbox Mode</th>
                            <td>
                                <label>
                                    <input type="checkbox" 
                                           name="blackcnote_paypal_sandbox" 
                                           value="1" 
                                           <?php checked(get_option('blackcnote_paypal_sandbox'), 1); ?> />
                                    Enable PayPal sandbox mode for testing
                                </label>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <div class="payment-section">
                    <h2>₿ Cryptocurrency Configuration</h2>
                    <table class="form-table">
                        <tr>
                            <th scope="row">Coinbase API Key</th>
                            <td>
                                <input type="password" 
                                       name="blackcnote_coinbase_api_key" 
                                       value="<?php echo esc_attr(get_option('blackcnote_coinbase_api_key')); ?>" 
                                       class="regular-text" />
                                <p class="description">Your Coinbase Commerce API key</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Coinbase API Secret</th>
                            <td>
                                <input type="password" 
                                       name="blackcnote_coinbase_api_secret" 
                                       value="<?php echo esc_attr(get_option('blackcnote_coinbase_api_secret')); ?>" 
                                       class="regular-text" />
                                <p class="description">Your Coinbase Commerce API secret</p>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <?php submit_button('Save Payment Settings'); ?>
            </form>
        </div>
        
        <style>
        .payment-section {
            margin-bottom: 30px;
            padding: 20px;
            background: #fff;
            border: 1px solid #ccd0d4;
            border-radius: 8px;
        }
        .payment-section h2 {
            margin-top: 0;
            color: #1e1e1e;
            border-bottom: 2px solid #f1f1f1;
            padding-bottom: 10px;
        }
        </style>
        <?php
    }
    
    /**
     * Render Investments page
     */
    public function render_investments_page() {
        ?>
        <div class="wrap">
            <h1>Investment Settings</h1>
            
            <form method="post" action="options.php">
                <?php
                settings_fields($this->settings_group);
                do_settings_sections($this->settings_group);
                ?>
                
                <div class="investment-section">
                    <h2>💰 Deposit & Withdrawal Limits</h2>
                    <table class="form-table">
                        <tr>
                            <th scope="row">Minimum Deposit</th>
                            <td>
                                <input type="number" 
                                       name="blackcnote_minimum_deposit" 
                                       value="<?php echo esc_attr(get_option('blackcnote_minimum_deposit', '100')); ?>" 
                                       class="regular-text" 
                                       step="0.01" />
                                <p class="description">Minimum deposit amount in USD</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Maximum Deposit</th>
                            <td>
                                <input type="number" 
                                       name="blackcnote_maximum_deposit" 
                                       value="<?php echo esc_attr(get_option('blackcnote_maximum_deposit', '50000')); ?>" 
                                       class="regular-text" 
                                       step="0.01" />
                                <p class="description">Maximum deposit amount in USD</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Minimum Withdrawal</th>
                            <td>
                                <input type="number" 
                                       name="blackcnote_minimum_withdrawal" 
                                       value="<?php echo esc_attr(get_option('blackcnote_minimum_withdrawal', '50')); ?>" 
                                       class="regular-text" 
                                       step="0.01" />
                                <p class="description">Minimum withdrawal amount in USD</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Maximum Withdrawal</th>
                            <td>
                                <input type="number" 
                                       name="blackcnote_maximum_withdrawal" 
                                       value="<?php echo esc_attr(get_option('blackcnote_maximum_withdrawal', '10000')); ?>" 
                                       class="regular-text" 
                                       step="0.01" />
                                <p class="description">Maximum withdrawal amount in USD</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Withdrawal Fee</th>
                            <td>
                                <input type="number" 
                                       name="blackcnote_withdrawal_fee" 
                                       value="<?php echo esc_attr(get_option('blackcnote_withdrawal_fee', '2.5')); ?>" 
                                       class="regular-text" 
                                       step="0.01" />
                                <p class="description">Withdrawal fee percentage</p>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <div class="investment-section">
                    <h2>🎯 Referral System</h2>
                    <table class="form-table">
                        <tr>
                            <th scope="row">Referral Commission Rate</th>
                            <td>
                                <input type="number" 
                                       name="blackcnote_referral_commission_rate" 
                                       value="<?php echo esc_attr(get_option('blackcnote_referral_commission_rate', '5')); ?>" 
                                       class="regular-text" 
                                       step="0.1" />
                                <p class="description">Referral commission percentage</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Referral Levels</th>
                            <td>
                                <input type="number" 
                                       name="blackcnote_referral_levels" 
                                       value="<?php echo esc_attr(get_option('blackcnote_referral_levels', '3')); ?>" 
                                       class="regular-text" 
                                       min="1" 
                                       max="10" />
                                <p class="description">Number of referral levels (1-10)</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Minimum Deposit for Referral</th>
                            <td>
                                <input type="number" 
                                       name="blackcnote_referral_minimum_deposit" 
                                       value="<?php echo esc_attr(get_option('blackcnote_referral_minimum_deposit', '100')); ?>" 
                                       class="regular-text" 
                                       step="0.01" />
                                <p class="description">Minimum deposit amount to earn referral commissions</p>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <div class="investment-section">
                    <h2>⚙️ System Settings</h2>
                    <table class="form-table">
                        <tr>
                            <th scope="row">Auto-Approve Withdrawals</th>
                            <td>
                                <label>
                                    <input type="checkbox" 
                                           name="blackcnote_auto_approve_withdrawals" 
                                           value="1" 
                                           <?php checked(get_option('blackcnote_auto_approve_withdrawals'), 1); ?> />
                                    Automatically approve withdrawals under limits
                                </label>
                                <p class="description">Enable automatic approval for withdrawals within configured limits</p>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <?php submit_button('Save Investment Settings'); ?>
            </form>
        </div>
        
        <style>
        .investment-section {
            margin-bottom: 30px;
            padding: 20px;
            background: #fff;
            border: 1px solid #ccd0d4;
            border-radius: 8px;
        }
        .investment-section h2 {
            margin-top: 0;
            color: #1e1e1e;
            border-bottom: 2px solid #f1f1f1;
            padding-bottom: 10px;
        }
        </style>
        <?php
    }
    
    /**
     * Render Notifications page
     */
    public function render_notifications_page() {
        ?>
        <div class="wrap">
            <h1>Notification Settings</h1>
            
            <form method="post" action="options.php">
                <?php
                settings_fields($this->settings_group);
                do_settings_sections($this->settings_group);
                ?>
                
                <div class="notification-section">
                    <h2>📧 Email Configuration</h2>
                    <table class="form-table">
                        <tr>
                            <th scope="row">SendGrid API Key</th>
                            <td>
                                <input type="password" 
                                       name="blackcnote_sendgrid_api_key" 
                                       value="<?php echo esc_attr(get_option('blackcnote_sendgrid_api_key')); ?>" 
                                       class="regular-text" 
                                       placeholder="SG..." />
                                <p class="description">Your SendGrid API key for email notifications</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">From Email Address</th>
                            <td>
                                <input type="email" 
                                       name="blackcnote_email_from_address" 
                                       value="<?php echo esc_attr(get_option('blackcnote_email_from_address', 'noreply@blackcnote.com')); ?>" 
                                       class="regular-text" />
                                <p class="description">Email address to send notifications from</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">From Name</th>
                            <td>
                                <input type="text" 
                                       name="blackcnote_email_from_name" 
                                       value="<?php echo esc_attr(get_option('blackcnote_email_from_name', 'BlackCnote Investment Platform')); ?>" 
                                       class="regular-text" />
                                <p class="description">Name to display in email notifications</p>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <div class="notification-section">
                    <h2>📱 SMS Configuration</h2>
                    <table class="form-table">
                        <tr>
                            <th scope="row">Twilio Account SID</th>
                            <td>
                                <input type="text" 
                                       name="blackcnote_twilio_account_sid" 
                                       value="<?php echo esc_attr(get_option('blackcnote_twilio_account_sid')); ?>" 
                                       class="regular-text" 
                                       placeholder="AC..." />
                                <p class="description">Your Twilio Account SID</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Twilio Auth Token</th>
                            <td>
                                <input type="password" 
                                       name="blackcnote_twilio_auth_token" 
                                       value="<?php echo esc_attr(get_option('blackcnote_twilio_auth_token')); ?>" 
                                       class="regular-text" />
                                <p class="description">Your Twilio Auth Token</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Twilio Phone Number</th>
                            <td>
                                <input type="text" 
                                       name="blackcnote_twilio_phone_number" 
                                       value="<?php echo esc_attr(get_option('blackcnote_twilio_phone_number')); ?>" 
                                       class="regular-text" 
                                       placeholder="+1234567890" />
                                <p class="description">Your Twilio phone number for sending SMS</p>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <?php submit_button('Save Notification Settings'); ?>
            </form>
        </div>
        
        <style>
        .notification-section {
            margin-bottom: 30px;
            padding: 20px;
            background: #fff;
            border: 1px solid #ccd0d4;
            border-radius: 8px;
        }
        .notification-section h2 {
            margin-top: 0;
            color: #1e1e1e;
            border-bottom: 2px solid #f1f1f1;
            padding-bottom: 10px;
        }
        </style>
        <?php
    }
    
    /**
     * Test API key via AJAX
     */
    public function test_api_key() {
        if (!wp_verify_nonce($_POST['nonce'], 'blackcnote_test_api_key')) {
            wp_die('Security check failed');
        }
        
        if (!current_user_can('manage_options')) {
            wp_die('Insufficient permissions');
        }
        
        $key = sanitize_text_field($_POST['key']);
        $value = sanitize_text_field($_POST['value']);
        
        // Basic validation based on key type
        $is_valid = false;
        $message = '';
        
        switch ($key) {
            case 'perplexity':
                $is_valid = strpos($value, 'pplx-') === 0;
                $message = $is_valid ? 'Perplexity API key format is valid' : 'Invalid Perplexity API key format';
                break;
            case 'openai':
                $is_valid = strpos($value, 'sk-') === 0;
                $message = $is_valid ? 'OpenAI API key format is valid' : 'Invalid OpenAI API key format';
                break;
            case 'alpha_vantage':
                $is_valid = strlen($value) >= 8;
                $message = $is_valid ? 'Alpha Vantage API key format is valid' : 'Invalid Alpha Vantage API key format';
                break;
            default:
                $is_valid = !empty($value);
                $message = $is_valid ? 'API key format appears valid' : 'Invalid API key format';
        }
        
        if ($is_valid) {
            wp_send_json_success($message);
        } else {
            wp_send_json_error($message);
        }
    }
}

// Initialize the admin settings
new BlackCnoteAdminSettings();
<?php
/**
 * Enhanced HYIPLab Integration for BlackCnote Theme
 * 
 * This file provides seamless integration between HYIPLab plugin and BlackCnote's
 * modern React/TypeScript architecture while maintaining demo data for development.
 */

if (!defined('ABSPATH')) {
    exit;
}

class BlackCnoteHYIPLabIntegration {

    private $demo_mode = true; // Enable demo data for development

    public function __construct() {
        $this->init();
    }

    /**
     * Initialize the integration
     */
    public function init() {
        // Check if we should use demo mode or real HYIPLab plugin
        $this->demo_mode = !function_exists('hyiplab_system_instance') || 
                          (defined('BLACKCNOTE_DEMO_MODE') && BLACKCNOTE_DEMO_MODE) ||
                          !get_option('blackcnote_hyiplab_integration', false);
        
        // Auto-enable integration if license is properly configured
        if (get_option('hyiplab_license_code') === 'e6946909-2c55-4f33-b8e6-aad14ec34bc5') {
            update_option('blackcnote_hyiplab_integration', true);
            $this->demo_mode = false;
        }

        // Add hooks
        add_action('init', [$this, 'register_shortcodes']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_hyiplab_assets']);
        add_action('wp_ajax_blackcnote_get_plans', [$this, 'handle_get_plans']);
        add_action('wp_ajax_nopriv_blackcnote_get_plans', [$this, 'handle_get_plans']);
        add_action('wp_ajax_blackcnote_create_investment', [$this, 'handle_create_investment']);
        add_action('wp_ajax_blackcnote_get_dashboard', [$this, 'handle_get_dashboard']);
        add_action('wp_ajax_blackcnote_calculate_investment', [$this, 'handle_calculate_investment']);
        add_action('wp_ajax_nopriv_blackcnote_calculate_investment', [$this, 'handle_calculate_investment']);

        // Add React integration hooks
        add_action('wp_head', [$this, 'add_hyiplab_config']);
    }

    /**
     * Register enhanced shortcodes
     */
    public function register_shortcodes() {
        add_shortcode('blackcnote_plans', [$this, 'plans_shortcode']);
        add_shortcode('blackcnote_dashboard', [$this, 'dashboard_shortcode']);
        add_shortcode('blackcnote_calculator', [$this, 'calculator_shortcode']);
        add_shortcode('blackcnote_investments', [$this, 'investments_shortcode']);
        add_shortcode('blackcnote_transactions', [$this, 'transactions_shortcode']);
        add_shortcode('blackcnote_referrals', [$this, 'referrals_shortcode']);
        add_shortcode('blackcnote_analytics', [$this, 'analytics_shortcode']);
        
        // Legacy HYIPLab shortcode compatibility
        add_shortcode('hyiplab_plans', [$this, 'plans_shortcode']);
        add_shortcode('hyiplab_dashboard', [$this, 'dashboard_shortcode']);
        add_shortcode('hyiplab_transactions', [$this, 'transactions_shortcode']);
        add_shortcode('hyiplab_invest_form', [$this, 'invest_form_shortcode']);
        add_shortcode('hyiplab_stats', [$this, 'stats_shortcode']);
    }

    /**
     * Enqueue HYIPLab assets
     */
    public function enqueue_hyiplab_assets() {
        // Enhanced HYIPLab styles with BlackCnote design
        wp_enqueue_style(
            'blackcnote-hyiplab-enhanced',
            get_template_directory_uri() . '/assets/css/hyiplab-enhanced.css',
            [],
            BLACKCNOTE_THEME_VERSION
        );

        // Enhanced HYIPLab JavaScript
        wp_enqueue_script(
            'blackcnote-hyiplab-enhanced',
            get_template_directory_uri() . '/assets/js/hyiplab-enhanced.js',
            ['jquery'],
            BLACKCNOTE_THEME_VERSION,
            true
        );

        // Chart.js for analytics
        wp_enqueue_script(
            'chart-js',
            'https://cdn.jsdelivr.net/npm/chart.js',
            [],
            '3.9.1',
            true
        );
    }

    /**
     * Add HYIPLab configuration for React integration
     */
    public function add_hyiplab_config() {
        $config = [
            'demoMode' => $this->demo_mode,
            'apiUrl' => $this->demo_mode ? 'http://localhost:5000/api' : home_url('/wp-json/hyiplab/v1/'),
            'wpApiUrl' => home_url('/wp-json/blackcnote/v1/'),
            'nonce' => wp_create_nonce('blackcnote_hyiplab_nonce'),
            'isLoggedIn' => is_user_logged_in(),
            'userId' => get_current_user_id(),
            'currency' => get_option('hyiplab_currency', 'USD'),
            'features' => [
                'plans' => true,
                'dashboard' => true,
                'calculator' => true,
                'analytics' => true,
                'referrals' => true,
                'transactions' => true
            ]
        ];

        echo '<script>window.blackCnoteHYIPLab = ' . wp_json_encode($config) . ';</script>';
    }

    /**
     * Get demo investment plans
     */
    private function get_demo_plans() {
        return [
            [
                'id' => 1,
                'name' => 'Starter Plan',
                'description' => 'Perfect for beginners with guaranteed returns and low risk investment strategy.',
                'minimumAmount' => '10.00',
                'maximumAmount' => '999.00',
                'apyRate' => '1.5',
                'durationDays' => 7,
                'isActive' => true,
                'color' => '#4CAF50',
                'featured' => true
            ],
            [
                'id' => 2,
                'name' => 'Professional Plan',
                'description' => 'Enhanced returns for experienced investors with moderate risk exposure.',
                'minimumAmount' => '1000.00',
                'maximumAmount' => '9999.00',
                'apyRate' => '2.5',
                'durationDays' => 14,
                'isActive' => true,
                'color' => '#2196F3',
                'featured' => true
            ],
            [
                'id' => 3,
                'name' => 'Premium Plan',
                'description' => 'Maximum returns for high-value investments with premium support.',
                'minimumAmount' => '10000.00',
                'maximumAmount' => '100000.00',
                'apyRate' => '4.0',
                'durationDays' => 30,
                'isActive' => true,
                'color' => '#FF9800',
                'featured' => true
            ]
        ];
    }

    /**
     * Enhanced plans shortcode
     */
    public function plans_shortcode($atts) {
        $atts = shortcode_atts([
            'limit' => 10,
            'layout' => 'grid',
            'show_calculator' => true,
            'theme' => 'dark'
        ], $atts);

        if ($this->demo_mode) {
            $plans = array_slice($this->get_demo_plans(), 0, $atts['limit']);
        } else {
            // Use real HYIPLab data if plugin is active
            global $wpdb;
            $table_name = $wpdb->prefix . 'hyiplab_plans';
            $plans = $wpdb->get_results(
                $wpdb->prepare(
                    "SELECT * FROM $table_name WHERE status = 'active' ORDER BY min_amount ASC LIMIT %d",
                    $atts['limit']
                )
            );
        }

        ob_start();
        ?>
        <div class="blackcnote-plans-container" data-theme="<?php echo esc_attr($atts['theme']); ?>">
            <div class="plans-header">
                <h2 class="plans-title">Investment Plans</h2>
                <?php if ($atts['show_calculator']): ?>
                <button class="btn btn-secondary calculator-toggle" onclick="toggleCalculator()">
                    <i class="icon-calculator"></i> Investment Calculator
                </button>
                <?php endif; ?>
            </div>

            <div class="plans-grid layout-<?php echo esc_attr($atts['layout']); ?>">
                <?php foreach ($plans as $plan): ?>
                    <div class="plan-card" 
                         data-plan-id="<?php echo esc_attr($plan['id']); ?>"
                         style="--plan-color: <?php echo esc_attr($plan['color'] ?? '#2196F3'); ?>">
                        
                        <?php if ($plan['featured']): ?>
                        <div class="plan-badge">Featured</div>
                        <?php endif; ?>

                        <div class="plan-header">
                            <h3 class="plan-name"><?php echo esc_html($plan['name']); ?></h3>
                            <div class="plan-rate">
                                <span class="rate-value"><?php echo esc_html($plan['apyRate']); ?>%</span>
                                <span class="rate-label">APY</span>
                            </div>
                        </div>

                        <div class="plan-description">
                            <?php echo esc_html($plan['description']); ?>
                        </div>

                        <div class="plan-details">
                            <div class="detail-item">
                                <span class="label">Investment Range</span>
                                <span class="value">$<?php echo number_format($plan['minimumAmount']); ?> - $<?php echo number_format($plan['maximumAmount']); ?></span>
                            </div>
                            <div class="detail-item">
                                <span class="label">Duration</span>
                                <span class="value"><?php echo esc_html($plan['durationDays']); ?> days</span>
                            </div>
                        </div>

                        <div class="plan-actions">
                            <?php if (is_user_logged_in()): ?>
                                <button class="btn btn-primary invest-btn" 
                                        onclick="investInPlan(<?php echo esc_attr($plan['id']); ?>)">
                                    Invest Now
                                </button>
                                <button class="btn btn-outline calculate-btn" 
                                        onclick="calculatePlan(<?php echo esc_attr($plan['id']); ?>)">
                                    Calculate
                                </button>
                            <?php else: ?>
                                <a href="<?php echo wp_login_url(get_permalink()); ?>" class="btn btn-primary">
                                    Login to Invest
                                </a>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

            <?php if ($atts['show_calculator']): ?>
            <div id="investment-calculator" class="calculator-widget" style="display: none;">
                <div class="calculator-content">
                    <h3>Investment Calculator</h3>
                    <div class="calculator-form">
                        <div class="form-group">
                            <label>Select Plan</label>
                            <select id="calc-plan">
                                <?php foreach ($plans as $plan): ?>
                                <option value="<?php echo esc_attr($plan['id']); ?>"><?php echo esc_html($plan['name']); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Investment Amount ($)</label>
                            <input type="number" id="calc-amount" min="10" step="0.01" placeholder="Enter amount">
                        </div>
                        <div class="form-group">
                            <label>Custom Duration (days, optional)</label>
                            <input type="number" id="calc-duration" min="1" placeholder="Leave blank for default">
                        </div>
                        <button class="btn btn-primary" onclick="calculateInvestment()">Calculate Returns</button>
                    </div>
                    <div id="calc-results" class="calculator-results" style="display: none;">
                        <!-- Results will be populated by JavaScript -->
                    </div>
                </div>
            </div>
            <?php endif; ?>
        </div>

        <script>
        // Enhanced JavaScript for plan interactions
        function investInPlan(planId) {
            if (window.blackCnoteReact && window.blackCnoteReact.openInvestmentModal) {
                window.blackCnoteReact.openInvestmentModal(planId);
            } else {
                // Fallback for non-React environments
                window.location.href = '<?php echo home_url("/invest"); ?>?plan=' + planId;
            }
        }

        function calculatePlan(planId) {
            document.getElementById('calc-plan').value = planId;
            toggleCalculator();
        }

        function toggleCalculator() {
            const calculator = document.getElementById('investment-calculator');
            calculator.style.display = calculator.style.display === 'none' ? 'block' : 'none';
        }

        function calculateInvestment() {
            const planId = document.getElementById('calc-plan').value;
            const amount = document.getElementById('calc-amount').value;
            const duration = document.getElementById('calc-duration').value;

            if (!planId || !amount) {
                alert('Please select a plan and enter an investment amount.');
                return;
            }

            // Make AJAX request to calculate investment
            fetch('<?php echo admin_url("admin-ajax.php"); ?>', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'blackcnote_calculate_investment',
                    nonce: '<?php echo wp_create_nonce("blackcnote_hyiplab_nonce"); ?>',
                    plan_id: planId,
                    amount: amount,
                    duration: duration
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    displayCalculationResults(data.data);
                } else {
                    alert('Calculation failed: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Calculation error:', error);
                alert('Calculation failed. Please try again.');
            });
        }

        function displayCalculationResults(results) {
            const resultsDiv = document.getElementById('calc-results');
            resultsDiv.innerHTML = `
                <h4>Calculation Results</h4>
                <div class="result-grid">
                    <div class="result-item">
                        <span class="label">Investment Amount:</span>
                        <span class="value">$${parseFloat(results.principal).toFixed(2)}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Total Profit:</span>
                        <span class="value success">$${parseFloat(results.totalProfit).toFixed(2)}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Total Return:</span>
                        <span class="value primary">$${parseFloat(results.totalAmount).toFixed(2)}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Daily Profit:</span>
                        <span class="value">$${parseFloat(results.dailyProfit).toFixed(2)}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Duration:</span>
                        <span class="value">${results.duration} days</span>
                    </div>
                    <div class="result-item">
                        <span class="label">APY Rate:</span>
                        <span class="value">${results.profitRate}%</span>
                    </div>
                </div>
                <div class="result-actions">
                    <button class="btn btn-primary" onclick="investInPlan(${results.planId || document.getElementById('calc-plan').value})">
                        Invest This Amount
                    </button>
                </div>
            `;
            resultsDiv.style.display = 'block';
        }
        </script>
        <?php
        return ob_get_clean();
    }

    /**
     * Enhanced dashboard shortcode
     */
    public function dashboard_shortcode($atts) {
        if (!is_user_logged_in()) {
            return '<div class="login-required">
                <h3>Access Required</h3>
                <p>Please <a href="' . wp_login_url(get_permalink()) . '" class="btn btn-primary">login</a> to view your investment dashboard.</p>
            </div>';
        }

        $atts = shortcode_atts([
            'theme' => 'dark',
            'show_charts' => true,
            'layout' => 'grid'
        ], $atts);

        ob_start();
        ?>
        <div class="blackcnote-dashboard" data-theme="<?php echo esc_attr($atts['theme']); ?>">
            <div class="dashboard-header">
                <h2>Investment Dashboard</h2>
                <div class="dashboard-actions">
                    <button class="btn btn-outline refresh-btn" onclick="refreshDashboard()">
                        <i class="icon-refresh"></i> Refresh
                    </button>
                    <a href="<?php echo home_url('/plans'); ?>" class="btn btn-primary">
                        <i class="icon-plus"></i> New Investment
                    </a>
                </div>
            </div>

            <div id="dashboard-content" class="dashboard-content">
                <div class="loading-spinner">Loading your dashboard...</div>
            </div>
        </div>

        <script>
        // Load dashboard data via AJAX
        document.addEventListener('DOMContentLoaded', function() {
            loadDashboardData();
        });

        function loadDashboardData() {
            fetch('<?php echo admin_url("admin-ajax.php"); ?>', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'blackcnote_get_dashboard',
                    nonce: '<?php echo wp_create_nonce("blackcnote_hyiplab_nonce"); ?>',
                    user_id: <?php echo get_current_user_id(); ?>
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    renderDashboard(data.data);
                } else {
                    document.getElementById('dashboard-content').innerHTML = 
                        '<div class="error">Failed to load dashboard data.</div>';
                }
            })
            .catch(error => {
                console.error('Dashboard error:', error);
                document.getElementById('dashboard-content').innerHTML = 
                    '<div class="error">Error loading dashboard. Please refresh the page.</div>';
            });
        }

        function renderDashboard(data) {
            const content = `
                <div class="stats-overview">
                    <div class="stat-card">
                        <div class="stat-icon"><i class="icon-wallet"></i></div>
                        <div class="stat-content">
                            <div class="stat-value">$${data.stats.totalInvested.toFixed(2)}</div>
                            <div class="stat-label">Total Invested</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon success"><i class="icon-trending-up"></i></div>
                        <div class="stat-content">
                            <div class="stat-value success">$${data.stats.totalProfit.toFixed(2)}</div>
                            <div class="stat-label">Total Profit</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon primary"><i class="icon-activity"></i></div>
                        <div class="stat-content">
                            <div class="stat-value">${data.stats.activeInvestments}</div>
                            <div class="stat-label">Active Investments</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon warning"><i class="icon-users"></i></div>
                        <div class="stat-content">
                            <div class="stat-value">${data.stats.totalReferrals}</div>
                            <div class="stat-label">Referrals</div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-sections">
                    <div class="section investments-section">
                        <h3>Recent Investments</h3>
                        <div class="investments-list">
                            ${data.investments.map(inv => `
                                <div class="investment-item">
                                    <div class="investment-info">
                                        <div class="investment-plan">Investment #${inv.id}</div>
                                        <div class="investment-amount">$${inv.amount.toFixed(2)}</div>
                                    </div>
                                    <div class="investment-progress">
                                        <div class="investment-profit success">+$${inv.totalProfit.toFixed(2)}</div>
                                        <div class="investment-status ${inv.status}">${inv.status.toUpperCase()}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="section transactions-section">
                        <h3>Recent Transactions</h3>
                        <div class="transactions-list">
                            ${data.transactions.map(txn => `
                                <div class="transaction-item">
                                    <div class="transaction-type ${txn.type}">
                                        <i class="icon-${txn.type}"></i>
                                    </div>
                                    <div class="transaction-info">
                                        <div class="transaction-desc">${txn.description}</div>
                                        <div class="transaction-date">${new Date(txn.createdAt).toLocaleDateString()}</div>
                                    </div>
                                    <div class="transaction-amount ${txn.amount < 0 ? 'negative' : 'positive'}">
                                        ${txn.amount < 0 ? '-' : '+'}$${Math.abs(txn.amount).toFixed(2)}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('dashboard-content').innerHTML = content;
        }

        function refreshDashboard() {
            document.getElementById('dashboard-content').innerHTML = 
                '<div class="loading-spinner">Refreshing dashboard...</div>';
            loadDashboardData();
        }
        </script>
        <?php
        return ob_get_clean();
    }

    /**
     * Investment calculator shortcode
     */
    public function calculator_shortcode($atts) {
        $atts = shortcode_atts([
            'theme' => 'dark',
            'show_plans' => true
        ], $atts);

        ob_start();
        ?>
        <div class="blackcnote-calculator" data-theme="<?php echo esc_attr($atts['theme']); ?>">
            <div class="calculator-header">
                <h2>Investment Calculator</h2>
                <p>Calculate your potential returns with our investment plans</p>
            </div>
            
            <!-- Calculator form will be enhanced with React integration -->
            <div id="calculator-app">
                <div class="loading-spinner">Loading calculator...</div>
            </div>
        </div>

        <script>
        // This will be enhanced when React app loads
        document.addEventListener('DOMContentLoaded', function() {
            if (window.blackCnoteReact && window.blackCnoteReact.renderCalculator) {
                window.blackCnoteReact.renderCalculator('calculator-app');
            } else {
                // Fallback calculator implementation
                loadFallbackCalculator();
            }
        });

        function loadFallbackCalculator() {
            document.getElementById('calculator-app').innerHTML = `
                <div class="calculator-fallback">
                    <p>Advanced calculator loading... Please visit our <a href="${window.location.origin}/calculator">dedicated calculator page</a> for full features.</p>
                </div>
            `;
        }
        </script>
        <?php
        return ob_get_clean();
    }

    /**
     * AJAX handler for getting plans
     */
    public function handle_get_plans() {
        check_ajax_referer('blackcnote_hyiplab_nonce', 'nonce');

        if ($this->demo_mode) {
            wp_send_json_success($this->get_demo_plans());
        } else {
            // Use real HYIPLab data
            global $wpdb;
            $table_name = $wpdb->prefix . 'hyiplab_plans';
            $plans = $wpdb->get_results(
                "SELECT * FROM $table_name WHERE status = 'active' ORDER BY min_amount ASC"
            );
            wp_send_json_success($plans);
        }
    }

    /**
     * AJAX handler for investment calculation
     */
    public function handle_calculate_investment() {
        check_ajax_referer('blackcnote_hyiplab_nonce', 'nonce');

        $plan_id = intval($_POST['plan_id']);
        $amount = floatval($_POST['amount']);
        $custom_duration = intval($_POST['duration']) ?: null;

        if ($this->demo_mode) {
            $plans = $this->get_demo_plans();
            $plan = array_filter($plans, function($p) use ($plan_id) {
                return $p['id'] == $plan_id;
            });
            $plan = reset($plan);
        } else {
            global $wpdb;
            $table_name = $wpdb->prefix . 'hyiplab_plans';
            $plan = $wpdb->get_row(
                $wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $plan_id),
                ARRAY_A
            );
        }

        if (!$plan) {
            wp_send_json_error('Investment plan not found');
        }

        $duration = $custom_duration ?: $plan['durationDays'];
        $profit_rate = floatval($plan['apyRate']);
        
        // Calculate compound returns
        $daily_rate = $profit_rate / 100 / 365;
        $compound_amount = $amount * pow(1 + $daily_rate, $duration);
        $total_profit = $compound_amount - $amount;
        $daily_profit = $total_profit / $duration;

        $result = [
            'principal' => $amount,
            'totalAmount' => $compound_amount,
            'totalProfit' => $total_profit,
            'dailyProfit' => $daily_profit,
            'profitRate' => $profit_rate,
            'duration' => $duration,
            'planId' => $plan_id
        ];

        wp_send_json_success($result);
    }

    /**
     * Additional shortcode implementations...
     */
    public function investments_shortcode($atts) {
        return '<div id="blackcnote-investments-app"><div class="loading-spinner">Loading investments...</div></div>';
    }

    public function transactions_shortcode($atts) {
        return '<div id="blackcnote-transactions-app"><div class="loading-spinner">Loading transactions...</div></div>';
    }

    public function referrals_shortcode($atts) {
        return '<div id="blackcnote-referrals-app"><div class="loading-spinner">Loading referral program...</div></div>';
    }

    public function analytics_shortcode($atts) {
        return '<div id="blackcnote-analytics-app"><div class="loading-spinner">Loading analytics...</div></div>';
    }

    // Legacy HYIPLab compatibility methods
    public function invest_form_shortcode($atts) {
        return $this->plans_shortcode($atts);
    }

    public function stats_shortcode($atts) {
        return $this->dashboard_shortcode($atts);
    }
}

// Initialize the integration
new BlackCnoteHYIPLabIntegration();
import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Wifi, WifiOff } from 'lucide-react';

interface ConnectionStatusProps {
  className?: string;
}

interface ConnectionHealth {
  api: boolean;
  frontend: boolean;
  database: boolean;
  latency: number;
  lastCheck: Date;
}

export function ConnectionStatus({ className = '' }: ConnectionStatusProps) {
  const [health, setHealth] = useState<ConnectionHealth>({
    api: false,
    frontend: true,
    database: false,
    latency: 0,
    lastCheck: new Date()
  });
  const [isChecking, setIsChecking] = useState(false);

  const checkConnections = async () => {
    setIsChecking(true);
    const startTime = Date.now();
    
    try {
      // Test API connection
      const apiResponse = await fetch('/api/users/1', { 
        method: 'HEAD',
        signal: AbortSignal.timeout(5000)
      });
      const apiHealthy = apiResponse.ok;

      // Test database via API
      const dbResponse = await fetch('/api/investment-plans', {
        method: 'HEAD',
        signal: AbortSignal.timeout(5000)
      });
      const dbHealthy = dbResponse.ok;

      const latency = Date.now() - startTime;

      setHealth({
        api: apiHealthy,
        frontend: true, // If this component loads, frontend is working
        database: dbHealthy,
        latency,
        lastCheck: new Date()
      });
    } catch (error) {
      console.error('Connection check failed:', error);
      setHealth(prev => ({
        ...prev,
        api: false,
        database: false,
        latency: Date.now() - startTime,
        lastCheck: new Date()
      }));
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnections();
    const interval = setInterval(checkConnections, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const getOverallStatus = () => {
    if (health.api && health.database && health.frontend) return 'healthy';
    if (health.frontend && (health.api || health.database)) return 'partial';
    return 'unhealthy';
  };

  const status = getOverallStatus();

  return (
    <div className={`connection-status ${className}`}>
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-1">
          {status === 'healthy' ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : status === 'partial' ? (
            <AlertCircle className="w-4 h-4 text-yellow-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500" />
          )}
          
          <span className={`font-medium ${
            status === 'healthy' ? 'text-green-600 dark:text-green-400' :
            status === 'partial' ? 'text-yellow-600 dark:text-yellow-400' :
            'text-red-600 dark:text-red-400'
          }`}>
            {status === 'healthy' ? 'All Systems Online' :
             status === 'partial' ? 'Partial Connection' :
             'Connection Issues'}
          </span>
        </div>

        {isChecking && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin opacity-50" />
        )}

        <span className="text-xs text-gray-500 dark:text-gray-400">
          {health.latency}ms
        </span>
      </div>

      {/* Detailed status tooltip */}
      <div className="absolute top-full left-0 mt-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 min-w-48">
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Frontend</span>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
          <div className="flex items-center justify-between">
            <span>API Server</span>
            {health.api ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-500" />
            )}
          </div>
          <div className="flex items-center justify-between">
            <span>Database</span>
            {health.database ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-500" />
            )}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-600 pt-2 text-xs text-gray-500">
            Last check: {health.lastCheck.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}
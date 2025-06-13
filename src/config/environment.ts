

// src/config/environment.ts
// Environment configuration validation and exports

interface Config {
  // Google Sheets
  googleSheets: {
    apiKey: string;
    spreadsheetId: string;
  };
  
  // Email Service
  email: {
    provider: 'mailchimp' | 'convertkit';
    mailchimp?: {
      apiKey: string;
      listId: string;
      serverPrefix: string;
    };
    convertkit?: {
      apiKey: string;
      formId: string;
    };
  };
  
  // App URLs
  urls: {
    app: string;
    api: string;
  };
  
  // Security
  security: {
    csrfSecret: string;
  };
  
  // Analytics
  analytics?: {
    googleAnalyticsId: string;
  };
  
  // Environment
  env: 'development' | 'production' | 'test';
}

// Validation helpers
const requireEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const optionalEnvVar = (name: string, defaultValue?: string): string | undefined => {
  return process.env[name] || defaultValue;
};

// Configuration object
export const config: Config = {
  googleSheets: {
    apiKey: requireEnvVar('GOOGLE_SHEETS_API_KEY'),
    spreadsheetId: requireEnvVar('GOOGLE_SPREADSHEET_ID'),
  },
  
  email: {
    provider: (process.env.EMAIL_PROVIDER as 'mailchimp' | 'convertkit') || 'mailchimp',
    mailchimp: process.env.MAILCHIMP_API_KEY ? {
      apiKey: requireEnvVar('MAILCHIMP_API_KEY'),
      listId: requireEnvVar('MAILCHIMP_LIST_ID'),
      serverPrefix: optionalEnvVar('MAILCHIMP_SERVER_PREFIX', 'us1') || 'us1',
    } : undefined,
    convertkit: process.env.CONVERTKIT_API_KEY ? {
      apiKey: requireEnvVar('CONVERTKIT_API_KEY'),
      formId: requireEnvVar('CONVERTKIT_FORM_ID'),
    } : undefined,
  },
  
  urls: {
    app: optionalEnvVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3000') || 'http://localhost:3000',
    api: optionalEnvVar('NEXT_PUBLIC_API_URL', 'http://localhost:3000/api') || 'http://localhost:3000/api',
  },
  
  security: {
    csrfSecret: requireEnvVar('CSRF_SECRET'),
  },
  
  analytics: process.env.GOOGLE_ANALYTICS_ID ? {
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
  } : undefined,
  
  env: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
};

// Validate configuration on startup
export const validateConfig = (): void => {
  try {
    // Check that at least one email provider is configured
    if (!config.email.mailchimp && !config.email.convertkit) {
      throw new Error('At least one email service provider must be configured (Mailchimp or ConvertKit)');
    }
    
    // Validate URLs
    try {
      new URL(config.urls.app);
      new URL(config.urls.api);
    } catch {
      throw new Error('Invalid URL configuration');
    }
    
    // Validate CSRF secret length
    if (config.security.csrfSecret.length < 32) {
      throw new Error('CSRF secret must be at least 32 characters long');
    }
    
    console.log('✅ Configuration validated successfully');
  } catch (error) {
    console.error('❌ Configuration validation failed:', error);
    process.exit(1);
  }
};

// Export individual configs for convenience
export const {
  googleSheets: googleSheetsConfig,
  email: emailConfig,
  urls: urlConfig,
  security: securityConfig,
  analytics: analyticsConfig,
} = config;

// Development helpers
export const isDevelopment = config.env === 'development';
export const isProduction = config.env === 'production';
export const isTest = config.env === 'test';



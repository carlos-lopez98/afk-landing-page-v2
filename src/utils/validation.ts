// src/utils/validation.ts
// Form validation utilities

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FormData {
  email: string;
  location: string;
  customLocation?: string;
}

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!email) {
    errors.push('Email is required');
  } else {
    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Please enter a valid email address');
    }
    
    // Check email length
    if (email.length > 254) {
      errors.push('Email address is too long');
    }
    
    // Check for common typos
    const commonDomainTypos = [
      { typo: 'gmial.com', correct: 'gmail.com' },
      { typo: 'gmai.com', correct: 'gmail.com' },
      { typo: 'yahooo.com', correct: 'yahoo.com' },
      { typo: 'hotmial.com', correct: 'hotmail.com' }
    ];
    
    const domain = email.split('@')[1]?.toLowerCase();
    const typo = commonDomainTypos.find(t => t.typo === domain);
    if (typo) {
      errors.push(`Did you mean ${email.replace(typo.typo, typo.correct)}?`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Location validation
export const validateLocation = (location: string, customLocation?: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!location) {
    errors.push('Location is required');
  } else if (location === 'Other') {
    if (!customLocation || customLocation.trim().length === 0) {
      errors.push('Please specify your location');
    } else if (customLocation.trim().length < 2) {
      errors.push('Location must be at least 2 characters');
    } else if (customLocation.trim().length > 100) {
      errors.push('Location is too long');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Comprehensive form validation
export const validateForm = (formData: FormData): ValidationResult => {
  const emailValidation = validateEmail(formData.email);
  const locationValidation = validateLocation(formData.location, formData.customLocation);
  
  const allErrors = [
    ...emailValidation.errors,
    ...locationValidation.errors
  ];
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  };
};

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>\"'&]/g, '') // Remove potentially dangerous characters
    .substring(0, 500); // Limit length
};

// Los Angeles County cities list
export const LA_COUNTY_CITIES = [
  'Los Angeles'
];

// Check if location is in LA County
export const isLACountyLocation = (location: string): boolean => {
  return LA_COUNTY_CITIES.some(city => 
    city.toLowerCase() === location.toLowerCase()
  );
};

// Format location for storage
export const formatLocation = (location: string, customLocation?: string): string => {
  if (location === 'Other' && customLocation) {
    return sanitizeInput(customLocation);
  }
  return sanitizeInput(location);
};

export default {
  validateEmail,
  validateLocation,
  validateForm,
  sanitizeInput,
  LA_COUNTY_CITIES,
  isLACountyLocation,
  formatLocation
};
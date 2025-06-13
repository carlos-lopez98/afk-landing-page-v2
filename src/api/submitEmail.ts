// src/api/submitEmail.ts
// API handler for form submission to Google Sheets

interface SubmissionData {
  email: string;
  location: string;
  timestamp?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Email validation utility
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Input sanitization
const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>\"']/g, '');
};

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; lastRequest: number }>();

// Rate limiting check (max 3 submissions per hour per IP)
const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const limit = rateLimitStore.get(identifier);
  
  if (!limit) {
    rateLimitStore.set(identifier, { count: 1, lastRequest: now });
    return true;
  }
  
  // Reset if more than 1 hour has passed
  if (now - limit.lastRequest > 3600000) {
    rateLimitStore.set(identifier, { count: 1, lastRequest: now });
    return true;
  }
  
  if (limit.count >= 3) {
    return false;
  }
  
  limit.count++;
  limit.lastRequest = now;
  return true;
};

// Google Sheets API integration
const submitToGoogleSheets = async (data: SubmissionData): Promise<boolean> => {
  try {
    // In production, these would be environment variables
    const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
    const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
    const SHEET_NAME = 'Waitlist';
    
    if (!GOOGLE_SHEETS_API_KEY || !SPREADSHEET_ID) {
      console.error('Missing Google Sheets configuration');
      return false;
    }
    
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}:append?valueInputOption=USER_ENTERED&key=${GOOGLE_SHEETS_API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [[
          data.email,
          data.location,
          data.timestamp || new Date().toISOString(),
          'Waitlist Signup'
        ]]
      })
    });
    
    return response.ok;
  } catch (error) {
    console.error('Google Sheets submission error:', error);
    return false;
  }
};

// Email service integration (Mailchimp/ConvertKit)
const triggerEmailSequence = async (email: string, location: string): Promise<boolean> => {
  try {
    // In production, integrate with actual email service
    const EMAIL_SERVICE_API_KEY = process.env.EMAIL_SERVICE_API_KEY;
    const EMAIL_SERVICE_LIST_ID = process.env.EMAIL_SERVICE_LIST_ID;
    
    if (!EMAIL_SERVICE_API_KEY || !EMAIL_SERVICE_LIST_ID) {
      console.error('Missing email service configuration');
      return false;
    }
    
    // Example Mailchimp integration
    const response = await fetch(`https://us1.api.mailchimp.com/3.0/lists/${EMAIL_SERVICE_LIST_ID}/members`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${EMAIL_SERVICE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          LOCATION: location,
          SIGNUP_SOURCE: 'Landing Page Waitlist'
        },
        tags: ['waitlist', 'la-launch']
      })
    });
    
    return response.ok;
  } catch (error) {
    console.error('Email service error:', error);
    return false;
  }
};

// Check for duplicate emails
const checkDuplicateEmail = async (email: string): Promise<boolean> => {
  try {
    // In production, query your database or Google Sheets
    // For now, simulate with a simple check
    const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
    const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
    const SHEET_NAME = 'Waitlist';
    
    if (!GOOGLE_SHEETS_API_KEY || !SPREADSHEET_ID) {
      return false; // Allow submission if we can't check
    }
    
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${GOOGLE_SHEETS_API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.values) {
      const emails = data.values.map((row: string[]) => row[0]?.toLowerCase());
      return emails.includes(email.toLowerCase());
    }
    
    return false;
  } catch (error) {
    console.error('Duplicate check error:', error);
    return false; // Allow submission if check fails
  }
};

// Main API handler
export const submitEmail = async (
  email: string, 
  location: string, 
  userIdentifier: string = 'unknown'
): Promise<ApiResponse> => {
  try {
    // Input validation
    if (!email || !location) {
      return {
        success: false,
        message: 'Email and location are required'
      };
    }
    
    // Email format validation
    if (!validateEmail(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address'
      };
    }
    
    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    const sanitizedLocation = sanitizeInput(location);
    
    // Rate limiting
    if (!checkRateLimit(userIdentifier)) {
      return {
        success: false,
        message: 'Too many submissions. Please try again later.'
      };
    }
    
    // Check for duplicate email
    const isDuplicate = await checkDuplicateEmail(sanitizedEmail);
    if (isDuplicate) {
      return {
        success: false,
        message: 'This email is already on our waitlist!'
      };
    }
    
    // Prepare submission data
    const submissionData: SubmissionData = {
      email: sanitizedEmail,
      location: sanitizedLocation,
      timestamp: new Date().toISOString()
    };
    
    // Submit to Google Sheets
    const sheetsSuccess = await submitToGoogleSheets(submissionData);
    
    // Trigger email sequence
    const emailSuccess = await triggerEmailSequence(sanitizedEmail, sanitizedLocation);
    
    // Log results
    console.log('Submission results:', {
      email: sanitizedEmail,
      location: sanitizedLocation,
      sheetsSuccess,
      emailSuccess,
      timestamp: submissionData.timestamp
    });
    
    // Return success even if email automation fails
    if (sheetsSuccess) {
      return {
        success: true,
        message: 'Successfully added to waitlist!',
        data: {
          email: sanitizedEmail,
          location: sanitizedLocation,
          emailSequenceTriggered: emailSuccess
        }
      };
    } else {
      return {
        success: false,
        message: 'Unable to process your request. Please try again.'
      };
    }
    
  } catch (error) {
    console.error('Submit email error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.'
    };
  }
};

// Helper function for frontend integration
export const handleFormSubmission = async (
  email: string,
  location: string
): Promise<ApiResponse> => {
  // Get user identifier (IP address in production)
  const userIdentifier = 'demo-user'; // In production: req.ip or similar
  
  return await submitEmail(email, location, userIdentifier);
};
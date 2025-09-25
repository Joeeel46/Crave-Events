export type TRole = "client" | "admin" | "vendor";

export const roles: TRole[] = ["client", "admin", "vendor"];

export type statusTypes = "active" | "pending" | "rejected" | "blocked";

export const HTTP_STATUS = {
  // ✅ Success responses
  OK: 200, // Request was successful (e.g., fetching data, updating without response body)
  CREATED: 201, // Resource successfully created (e.g., user registration, new booking)
  ACCEPTED: 202, // Request accepted for processing but not completed yet (e.g., background job)
  NO_CONTENT: 204, // Request successful but no content returned (e.g., deleting a resource)

  // ❌ Client errors
  BAD_REQUEST: 400, // Invalid request (e.g., missing fields, invalid data format)
  UNAUTHORIZED: 401, // Authentication required (e.g., user not logged in, invalid token)
  FORBIDDEN: 403, // Access denied (e.g., trying to access admin-only routes)
  NOT_FOUND: 404, // Requested resource not found (e.g., wrong ID, missing endpoint)
  METHOD_NOT_ALLOWED: 405, // HTTP method not supported (e.g., using GET instead of POST)
  CONFLICT: 409, // Conflict in request (e.g., duplicate email, already registered)
  PAYLOAD_TOO_LARGE: 413, // Request payload is too large (e.g., file upload exceeds limit)
  UNSUPPORTED_MEDIA_TYPE: 415, // Unsupported content type (e.g., sending XML instead of JSON)
  TOO_MANY_REQUESTS: 429, // Rate limiting (e.g., too many login attempts, API abuse)

  // ⚠️ Server errors
  INTERNAL_SERVER_ERROR: 500, // Generic server error (e.g., database failure, unhandled exception)
  NOT_IMPLEMENTED: 501, // Feature not implemented yet (e.g., unbuilt endpoint)
  BAD_GATEWAY: 502, // Server received invalid response from upstream (e.g., microservices failure)
  SERVICE_UNAVAILABLE: 503, // Server is down or overloaded (e.g., maintenance mode)
  GATEWAY_TIMEOUT: 504, // Upstream server timed out (e.g., long API response time)
} as const;

export const SUCCESS_MESSAGES = {
  BOOKING_SUCCESS: "Booking completed",
  CREATED: "Successfully created",
  ADDED: "Successfully Added",
  LOGIN_SUCCESS: "Logged in",
  REGISTRATION_SUCCESS: "Registration completed",
  OTP_SEND_SUCCESS: "OTP sent",
  OTP_VERIFIED: "OTP verified",
  LOGOUT_SUCCESS: "Logged out",
  UPDATE_SUCCESS: "Updated",
  DELETE_SUCCESS: "Deleted",
  OPERATION_SUCCESS: "Action completed",
  PASSWORD_RESET_SUCCESS: "Password reset",
  VERIFICATION_SUCCESS: "Verification done",
  DATA_RETRIEVED: "Data loaded",
  ACTION_SUCCESS: "Action successful",
  EMAIL_SENT_SUCCESSFULLY: "Email sent",
  REQUEST_SUBMITTED: "Request submitted waiting for admin approval",
  APPLICATION_SUBMITTED: "Application submitted waiting for admin approval",
  REQUEST_APPROVED: "Request approved",
  REQUEST_REJECTED: "Request rejected",
  ACCOUNT_ACTIVATED: "Your account is now active",
  ACCOUNT_DEACTIVATED: "Your account has been deactivated",
  TRANSACTION_SUCCESS: "Transaction successful",
  REFUND_INITIATED: "Refund process started",
  PAYMENT_SUCCESS: "Payment completed",
  PAYMENT_PENDING: "Payment is being processed",
  PAYMENT_FAILED: "Payment failed please try again",
  FILE_UPLOADED: "File uploaded successfully",
  PROFILE_UPDATED: "Profile updated",
  SESSION_EXTENDED: "Session extended",
  TICKET_CONFIRMED: "Ticket confirmed",
  RESETMAIL_SEND_SUCCESS:"Reset mail send successfully"
} as const;

export const ERROR_MESSAGES = {
  WRONG_ID: "Invalid ID",
  TOKEN_EXPIRED: "Session expired login again",
  OTP_EXPIRED: "OTP has expired. Please request a new one.",
  TOKEN_BLACKLISTED: "Session is no longer valid",
  EMAIL_NOT_FOUND: "Email not found",
  FORBIDDEN: "You don’t have access",
  BLOCKED: "Your account is blocked",
  EMAIL_REQUIRED: "Email is required",
  NOT_ALLOWED: "You can’t do this action",
  EMAIL_EXISTS: "Email already registered",
  USERNAME_EXISTS: "Username already taken",
  REQUEST_NOT_FOUND: "Request not found",
  SERVICE_EXISTS: "Service already exists",
  SERVICE_NOT_FOUND: "Service not found",
  INVALID_TOKEN: "Invalid session please login again",
  INVALID_ROLE: "Access denied",
  INVALID_OTP: "Invalid otp",
  INVALID_CREDENTIALS: "Wrong email or password",
  USER_NOT_FOUND: "User not found",
  ROUTE_NOT_FOUND: "Page not found",
  UNAUTHORIZED_ACCESS: "Not authorized",
  SERVER_ERROR: "Something went wrong try again later",
  VALIDATION_ERROR: "Check your inputs and try again",
  MISSING_PARAMETERS: "Some details are missing",
  WRONG_CURRENT_PASSWORD: "Current password is incorrect",
  ACCOUNT_UNDER_VERIFICATION:
    "Your account is under verification. Please wait for admin approval.",
  SAME_CURR_NEW_PASSWORD:
    "New password must be different from current password",
  INSUFFICIENT_FUNDS: "Not enough balance",
  TRANSACTION_FAILED: "Transaction failed try again",
  REFUND_FAILED: "Refund process failed",
  PAYMENT_ERROR: "Payment could not be processed",
  ACCOUNT_SUSPENDED: "Your account has been suspended",
  ACCOUNT_BANNED: "Your account has been banned",
  SESSION_EXPIRED: "Your session has expired please log in again",
  TOO_MANY_ATTEMPTS: "Too many failed attempts try again later",
  UNSUPPORTED_FILE_TYPE: "Unsupported file type",
  FILE_SIZE_EXCEEDED: "File size is too large",
  RATE_LIMIT_EXCEEDED: "Too many requests try again later",
  VENDOR_ACCOUNTS_CANNOT_BE_CREATED_USING_GOOGLE: "Vendor accounts cannot be created using Google. Please Register First",
  PASSWORD_SAME: "New password must be different from current password",
  BOOKING_LOCKED: "You already initiated a booking. Please wait a few minutes before trying again.",
} as const;


export const VERIFICATION_MAIL_CONTENT = (otp: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email - Crave Events</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #121212; color: #ffffff;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto;">
    <!-- Modern Dark Header -->
    <tr>
      <td style="padding: 40px 30px; text-align: center;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td>
              <!-- Logo with glowing effect -->
              <div style="display: inline-block; position: relative; margin-bottom: 20px;">
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle, rgba(0,255,170,0.3) 0%, rgba(0,0,0,0) 70%); filter: blur(10px); z-index: 0;"></div>
                <h1 style="position: relative; z-index: 1; font-size: 42px; font-weight: 900; margin: 0; background: linear-gradient(90deg, #00ffaa 0%, #2e3192 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -1px;">
                  Crave<span style="font-weight: 900;">Events</span>
                </h1>
              </div>
              <p style="margin: 0; color: #aaaaaa; font-size: 16px; letter-spacing: 1px;">INNOVATION STARTS HERE</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Main Content -->
    <tr>
      <td style="background-color: #1e1e1e; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <!-- Header Bar -->
          <tr>
            <td style="padding: 20px 30px; background: linear-gradient(90deg, #2e3192 0%, #00ffaa 100%); border-radius: 16px 16px 0 0;">
              <h2 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">Verify Your Account</h2>
            </td>
          </tr>
          
          <!-- Content Area -->
          <tr>
            <td style="padding: 40px 30px 20px;">
              <p style="margin: 0 0 20px; color: #dddddd; font-size: 16px; line-height: 1.6;">
                Hey there,
              </p>
              <p style="margin: 0 0 30px; color: #dddddd; font-size: 16px; line-height: 1.6;">
                Welcome to Crave Events! To complete your registration and unlock all features, please use the verification code below:
              </p>
            </td>
          </tr>
          
          <!-- OTP Section with futuristic design -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <div style="background-color: #252525; border-radius: 12px; padding: 30px; text-align: center; position: relative; overflow: hidden; border: 1px solid #333333;">
                      <!-- Decorative elements -->
                      <div style="position: absolute; top: -20px; left: -20px; width: 100px; height: 100px; background: radial-gradient(circle, rgba(46,49,146,0.2) 0%, rgba(0,0,0,0) 70%);"></div>
                      <div style="position: absolute; bottom: -30px; right: -30px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(0,255,170,0.1) 0%, rgba(0,0,0,0) 70%);"></div>
                      
                      <p style="margin: 0 0 20px; color: #aaaaaa; font-size: 12px; text-transform: uppercase; letter-spacing: 3px;">Verification Code</p>
                      
                      <!-- OTP Display -->
                      <div style="display: flex; justify-content: center; margin: 0 auto;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            ${otp
    .split("")
    .map(
      (digit, index) => `
                              <td style="padding: 0 4px;">
                                <div style="background-color: #2a2a2a; border: 1px solid ${index % 2 === 0 ? "#2e3192" : "#00ffaa"}; border-radius: 8px; padding: 15px 12px; font-family: 'Courier New', monospace; font-size: 28px; font-weight: bold; color: #ffffff; position: relative; overflow: hidden;">
                                  <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, ${index % 2 === 0 ? "#2e3192" : "#00ffaa"}, transparent);"></div>
                                  ${digit}
                                </div>
                              </td>
                            `,
    )
    .join("")}
                          </tr>
                        </table>
                      </div>
                      
                      <p style="margin: 25px 0 0; color: #aaaaaa; font-size: 14px;">
                        Code expires in <span style="color: #00ffaa; font-weight: 600;">10:00</span> minutes
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Button Section -->
          <tr>
            <td style="padding: 0 30px 40px; text-align: center;">
              <p style="margin: 0 0 20px; color: #aaaaaa; font-size: 14px;">
                Having trouble? Contact our support team
              </p>
              <a href="#" style="display: inline-block; background: linear-gradient(90deg, #2e3192 0%, #00ffaa 100%); color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 30px; font-weight: 600; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s ease;">Get Help</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td style="padding: 40px 30px; text-align: center;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td style="padding: 0 0 20px;">
              <!-- Social Media Icons -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td style="padding: 0 10px;">
                    <a href="#" style="display: inline-block; width: 36px; height: 36px; background-color: #252525; border-radius: 50%; text-align: center; line-height: 36px; color: #00ffaa; text-decoration: none; font-size: 18px; border: 1px solid #333333;">
                      <span style="color: #00ffaa;">f</span>
                    </a>
                  </td>
                  <td style="padding: 0 10px;">
                    <a href="#" style="display: inline-block; width: 36px; height: 36px; background-color: #252525; border-radius: 50%; text-align: center; line-height: 36px; color: #00ffaa; text-decoration: none; font-size: 18px; border: 1px solid #333333;">
                      <span style="color: #00ffaa;">in</span>
                    </a>
                  </td>
                  <td style="padding: 0 10px;">
                    <a href="#" style="display: inline-block; width: 36px; height: 36px; background-color: #252525; border-radius: 50%; text-align: center; line-height: 36px; color: #00ffaa; text-decoration: none; font-size: 18px; border: 1px solid #333333;">
                      <span style="color: #00ffaa;">t</span>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <p style="margin: 0 0 5px; color: #aaaaaa; font-size: 14px;">
                © ${new Date().getFullYear()} MakeIT. All rights reserved.
              </p>
              <p style="margin: 0; color: #666666; font-size: 12px;">
                123 Tech Street, Innovation City, TC 12345
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`





export const RESET_PASSWORD_MAIL_CONTENT = (resetLink: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    /* Base styles */
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f9fafb;
      color: #1f2937;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    /* Email container */
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    
    /* Header */
    .header {
      background: linear-gradient(to right, #8b5cf6, #ec4899);
      padding: 30px 20px;
      text-align: center;
    }
    
    .logo {
      margin-bottom: 20px;
    }
    
    .logo img {
      height: 40px;
    }
    
    .header-title {
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      margin: 0;
    }
    
    /* Content */
    .content {
      padding: 40px 30px;
      text-align: center;
    }
    
    .greeting {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
      color: #1f2937;
    }
    
    .message {
      font-size: 16px;
      line-height: 1.6;
      color: #4b5563;
      margin-bottom: 30px;
    }
    
    /* Button */
    .button-container {
      margin: 30px 0;
    }
    
    .button {
      display: inline-block;
      background: linear-gradient(to right, #8b5cf6, #ec4899);
      color: #ffffff;
      font-weight: 600;
      font-size: 16px;
      text-decoration: none;
      padding: 12px 30px;
      border-radius: 6px;
      box-shadow: 0 4px 6px rgba(139, 92, 246, 0.25);
      transition: all 0.3s ease;
    }
    
    .button:hover {
      opacity: 0.9;
      box-shadow: 0 6px 10px rgba(139, 92, 246, 0.3);
    }
    
    /* Link fallback */
    .link-fallback {
      margin-top: 20px;
      padding: 15px;
      background-color: #f3f4f6;
      border-radius: 6px;
      word-break: break-all;
    }
    
    .link-fallback p {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 10px;
    }
    
    .link-url {
      font-size: 14px;
      color: #8b5cf6;
      text-decoration: none;
    }
    
    /* Footer */
    .footer {
      background-color: #f9fafb;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    
    .footer-text {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 20px;
    }
    
    .footer-links {
      margin-bottom: 20px;
    }
    
    .footer-link {
      color: #8b5cf6;
      text-decoration: none;
      font-size: 14px;
      margin: 0 10px;
    }
    
    .footer-link:hover {
      text-decoration: underline;
    }
    
    .copyright {
      font-size: 12px;
      color: #9ca3af;
    }
    
    /* Expiration notice */
    .expiration {
      margin-top: 30px;
      font-size: 14px;
      color: #6b7280;
    }
    
    /* Responsive */
    @media only screen and (max-width: 600px) {
      .content {
        padding: 30px 20px;
      }
      
      .header-title {
        font-size: 22px;
      }
      
      .greeting {
        font-size: 18px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      <div class="logo">
        <img src="https://via.placeholder.com/150x40/8b5cf6/FFFFFF?text=EventFlow" alt="EventFlow Logo">
      </div>
      <h1 class="header-title">Reset Your Password</h1>
    </div>
    
    <!-- Content -->
    <div class="content">
      <p class="greeting">Hello there,</p>
      <p class="message">
        We received a request to reset your password for your EventFlow account. 
        Click the button below to create a new password. If you didn't make this request, 
        you can safely ignore this email.
      </p>
      
      <!-- Button -->
      <div class="button-container">
        <a href="${resetLink}" class="button">Reset Password</a>
      </div>
      
      <!-- Link fallback -->
      <div class="link-fallback">
        <p>If the button above doesn't work, copy and paste this link into your browser:</p>

      </div>
      
      <!-- Expiration notice -->
      <p class="expiration">
        This password reset link will expire in 24 hours.
      </p>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p class="footer-text">
        If you have any questions, feel free to contact our support team.
      </p>
      <div class="footer-links">
        <a href="#" class="footer-link">Help Center</a>
        <a href="#" class="footer-link">Contact Us</a>
        <a href="#" class="footer-link">Privacy Policy</a>
      </div>
      <p class="copyright">
        &copy; 2025 EventFlow. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
`



export const VENDOR_APPLICATION_MAIL_CONTENT = (message: string, name: string, status: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crave Events - Application Status Update</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fafc;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        
        .logo {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 10px;
            letter-spacing: 1px;
        }
        
        .header-subtitle {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 300;
        }
        
        .status-badge {
            display: inline-block;
            padding: 12px 24px;
            border-radius: 50px;
            font-weight: bold;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 20px 0;
        }
        
        .status-approved {
            background-color: #10b981;
            color: white;
        }
        
        .status-rejected {
            background-color: #ef4444;
            color: white;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 20px;
        }
        
        .message-box {
            background-color: #f8fafc;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 8px 8px 0;
        }
        
        .message-text {
            font-size: 16px;
            line-height: 1.7;
            color: #4b5563;
        }
        
        .icon-container {
            text-align: center;
            margin: 30px 0;
        }
        
        .icon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            margin-bottom: 20px;
        }
        
        .icon-approved {
            background-color: #dcfce7;
            color: #16a34a;
        }
        
        .icon-rejected {
            background-color: #fef2f2;
            color: #dc2626;
        }
        
        .next-steps {
            background-color: #eff6ff;
            border: 1px solid #dbeafe;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
        }
        
        .next-steps-title {
            font-size: 18px;
            font-weight: 600;
            color: #1e40af;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        
        .next-steps-list {
            list-style: none;
            padding: 0;
        }
        
        .next-steps-list li {
            padding: 8px 0;
            color: #374151;
            position: relative;
            padding-left: 25px;
        }
        
        .next-steps-list li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            transition: transform 0.2s ease;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
        }
        
        .footer {
            background-color: #1f2937;
            color: #9ca3af;
            padding: 30px;
            text-align: center;
        }
        
        .footer-links {
            margin: 20px 0;
        }
        
        .footer-links a {
            color: #60a5fa;
            text-decoration: none;
            margin: 0 15px;
        }
        
        .social-icons {
            margin: 20px 0;
        }
        
        .social-icon {
            display: inline-block;
            width: 40px;
            height: 40px;
            background-color: #374151;
            border-radius: 50%;
            margin: 0 10px;
            line-height: 40px;
            text-align: center;
            color: #9ca3af;
            text-decoration: none;
        }
        
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
            margin: 30px 0;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                box-shadow: none;
            }
            
            .header, .content, .footer {
                padding: 30px 20px;
            }
            
            .greeting {
                font-size: 20px;
            }
            
            .logo {
                font-size: 28px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">Crave Events</div>
            <div class="header-subtitle">Your Event Planning Partner</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="greeting">Hello ${name},</div>
            
            <!-- Status Icon -->
            <div class="icon-container">
                ${status === "rejected"
    ?
    `<div class="icon icon-rejected">📋</div>
                  <div class="status-badge status-rejected">Application Rejected</div>`
    :
    `<div class="icon icon-approved">🎉</div>
                  <div class="status-badge status-approved">Application Approved</div>`
  }
              </div>
            
            <!-- Message Box -->
            <div class="message-box">
                <div class="message-text">
                    ${message}
                </div>
            </div>
            
            <div class="divider"></div>
            
            <!-- Next Steps -->
            ${status === "rejected"
    ?
    `
            <div class="next-steps">
                <div class="next-steps-title">
                    📝 How to Improve Your Application
                </div>
                <ul class="next-steps-list">
                    <li>Review and update your business information</li>
                    <li>Provide additional documentation if requested</li>
                    <li>Ensure all required fields are completed</li>
                    <li>Contact our support team if you need assistance</li>
                </ul>
                
                <div style="text-align: center; margin-top: 25px;">
                    <a href="{{reapplyUrl}}" class="cta-button">
                        Update Application
                    </a>
                </div>
            </div>
            `
    :
    `<div class="next-steps">
                <div class="next-steps-title">
                    🚀 What's Next?
                </div>
                <ul class="next-steps-list">
                    <li>Upload your portfolio and service packages</li>
                    <li>Set your availability and pricing</li>
                    <li>Start receiving booking requests from clients</li>
                </ul>
            </div> `
  }
            
            <div class="divider"></div>
            
            <!-- Support Section -->
            <div style="text-align: center; padding: 20px 0;">
                <h3 style="color: #374151; margin-bottom: 15px;">Need Help?</h3>
                <p style="color: #6b7280; margin-bottom: 20px;">
                    Our support team is here to assist you with any questions or concerns.
                </p>
                <a href="mailto:support@crave-events.com" style="color: #667eea; text-decoration: none; font-weight: 600;">
                    📧 support@crave-events.com
                </a>
                <span style="color: #9ca3af; margin: 0 15px;">|</span>
                <a href="tel:+919876543210" style="color: #667eea; text-decoration: none; font-weight: 600;">
                    📞 +91 9876543210
                </a>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 10px;">MakeIt</div>
            <div style="margin-bottom: 20px;">Making your events unforgettable</div>
            
            <div class="footer-links">
                <a href="{{websiteUrl}}">Website</a>
                <a href="{{privacyUrl}}">Privacy Policy</a>
                <a href="{{termsUrl}}">Terms of Service</a>
                <a href="{{unsubscribeUrl}}">Unsubscribe</a>
            </div>
            
            <div class="social-icons">
                <a href="{{facebookUrl}}" class="social-icon">f</a>
                <a href="{{twitterUrl}}" class="social-icon">t</a>
                <a href="{{linkedinUrl}}" class="social-icon">in</a>
                <a href="{{instagramUrl}}" class="social-icon">ig</a>
            </div>
            
            <div style="font-size: 12px; margin-top: 20px; opacity: 0.7;">
                © 2024 MakeIt. All rights reserved.<br>
                123 Event Street, City, State 12345
            </div>
        </div>
    </div>
</body>
</html>
`

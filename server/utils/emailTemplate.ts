export const generateRegistrationEmail = (name: string, aarunyaId: string) => {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: 'Rajdhani', 'Arial', sans-serif;
          background-color: #0a0e27;
          color: #e0e0e0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background: linear-gradient(135deg, #1a1f3a 0%, #16213e 100%);
          border: 2px solid #00d9ff;
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(0, 217, 255, 0.3);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding: 20px 0;
          border-bottom: 2px solid #00d9ff;
        }
        .header h1 {
          font-family: 'Orbitron', monospace;
          font-size: 32px;
          margin: 0;
          color: #00d9ff;
          text-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
          letter-spacing: 2px;
        }
        .content {
          line-height: 1.6;
        }
        .welcome {
          margin: 20px 0;
          font-size: 16px;
        }
        .aarunya-id-box {
          background: rgba(0, 217, 255, 0.1);
          border: 2px solid #00d9ff;
          border-radius: 8px;
          padding: 20px;
          margin: 30px 0;
          text-align: center;
        }
        .aarunya-id-label {
          font-size: 12px;
          color: #b0b0b0;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }
        .aarunya-id {
          font-family: 'Courier New', monospace;
          font-size: 24px;
          color: #00d9ff;
          font-weight: bold;
          letter-spacing: 2px;
          word-spacing: 5px;
        }
        .features {
          margin: 30px 0;
          background: rgba(0, 217, 255, 0.05);
          padding: 20px;
          border-left: 3px solid #00d9ff;
          border-radius: 5px;
        }
        .features h3 {
          color: #00d9ff;
          margin-top: 0;
          text-transform: uppercase;
          font-size: 14px;
          letter-spacing: 1px;
        }
        .features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .features li {
          margin: 10px 0;
          padding-left: 20px;
          position: relative;
        }
        .features li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #00d9ff;
          font-weight: bold;
        }
        .login-section {
          margin: 30px 0;
          background: rgba(0, 217, 255, 0.05);
          padding: 20px;
          border: 1px solid #00d9ff;
          border-radius: 5px;
          text-align: center;
        }
        .login-button {
          display: inline-block;
          background: linear-gradient(135deg, #00d9ff 0%, #0099cc 100%);
          color: #0a0e27;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 15px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 14px;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #00d9ff;
          text-align: center;
          font-size: 12px;
          color: #808080;
        }
        .secondary-color {
          color: #ff006e;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>AARUNYA</h1>
          <p style="margin: 10px 0 0 0; color: #00d9ff; font-size: 14px; letter-spacing: 2px;">EUPHORIA CAMPUS EXPLORER</p>
        </div>

        <div class="content">
          <div class="welcome">
            <p>Hey <strong>${name}</strong>,</p>
            <p>Welcome to <strong style="color: #00d9ff;">AARUNYA</strong> - Your gateway to the campus festival experience!</p>
            <p>We're thrilled to have you join our community. Your account has been successfully created and verified.</p>
          </div>

          <div class="aarunya-id-box">
            <div class="aarunya-id-label">Your Unique AARUNYA ID</div>
            <div class="aarunya-id">${aarunyaId}</div>
            <p style="margin: 10px 0 0 0; color: #b0b0b0; font-size: 12px;">Save this ID - you'll need it to login</p>
          </div>

          <div class="features">
            <h3>What You Can Do Now:</h3>
            <ul>
              <li>Access exclusive festival events and schedules</li>
              <li>Register for competitions and merch drops</li>
              <li>Explore the interactive campus map</li>
              <li>Connect with other festival participants</li>
              <li>Track your bookings and registrations</li>
              <li>Receive updates on upcoming announcements</li>
            </ul>
          </div>

          <div class="login-section">
            <h3 style="margin: 0 0 15px 0; color: #00d9ff; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">Ready to Get Started?</h3>
            <p style="margin: 0 0 15px 0;">Login using your email or AARUNYA ID:</p>
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/login" class="login-button">LOGIN NOW</a>
            <p style="margin: 15px 0 0 0; font-size: 12px; color: #808080;">You can also login with Google for quick access</p>
          </div>

          <div style="margin: 30px 0; padding: 20px; background: rgba(255, 0, 110, 0.05); border-left: 3px solid #ff006e; border-radius: 5px;">
            <h3 style="margin: 0 0 10px 0; color: #ff006e; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">Pro Tip!</h3>
            <p style="margin: 0; font-size: 14px;">Keep your AARUNYA ID handy. You can use it along with your password to login anytime from any device.</p>
          </div>

          <p style="margin: 30px 0 10px 0;">If you have any questions or need assistance, feel free to reach out to our support team.</p>
          <p style="margin: 0;">See you at the festival! 🎉</p>
        </div>

        <div class="footer">
          <p style="margin: 0 0 10px 0;">© 2026 AARUNYA Festival. All rights reserved.</p>
          <p style="margin: 0;">This is an automated email. Please do not reply directly.</p>
          <p style="margin: 10px 0 0 0;"><strong>Email:</strong> support@aarunya.in | <strong>Phone:</strong> +91 XXXX XXXXX</p>
        </div>
      </div>
    </body>
    </html>
  `;

    const textContent = `
WELCOME TO AARUNYA - EUPHORIA CAMPUS EXPLORER

Hey ${name},

Welcome to AARUNYA - Your gateway to the campus festival experience!

We're thrilled to have you join our community. Your account has been successfully created and verified.

YOUR UNIQUE AARUNYA ID: ${aarunyaId}
Save this ID - you'll need it to login!

WHAT YOU CAN DO NOW:
✓ Access exclusive festival events and schedules
✓ Register for competitions and merch drops
✓ Explore the interactive campus map
✓ Connect with other festival participants
✓ Track your bookings and registrations
✓ Receive updates on upcoming announcements

READY TO GET STARTED?
Login using your email or AARUNYA ID at:
${process.env.FRONTEND_URL || 'http://localhost:5173'}/login

You can also login with Google for quick access.

PRO TIP!
Keep your AARUNYA ID handy. You can use it along with your password to login anytime from any device.

If you have any questions or need assistance, feel free to reach out to our support team.

See you at the festival! 🎉

© 2026 AARUNYA Festival. All rights reserved.
This is an automated email. Please do not reply directly.
Email: support@aarunya.in | Phone: +91 XXXX XXXXX
  `;

    return { htmlContent, textContent };
};

/**
 * Google Apps Script for Wedding RSVP Form
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet for your RSVPs
 * 2. Go to Extensions > Apps Script
 * 3. Copy this entire file and paste it there
 * 4. Update the SHEET_NAME below if needed
 * 5. Click "Deploy" > "New deployment"
 * 6. Choose "Web app"
 * 7. Set "Execute as" to "Me"
 * 8. Set "Who has access" to "Anyone"
 * 9. Click "Deploy" and copy the Web App URL
 * 10. Paste that URL in main.js where it says YOUR_GOOGLE_APPS_SCRIPT_URL_HERE
 */

// Configuration
const SHEET_NAME = 'RSVPs'; // Change this if you want a different sheet name

/**
 * Handles POST requests from the wedding form
 */
function doPost(e) {
  try {
    // Get form data from parameters (FormData submission)
    const data = {
      name: e.parameter.name || '',
      phone: e.parameter.phone || '',
      attendance: e.parameter.attendance || '',
      guests: e.parameter.guests || '',
      message: e.parameter.message || '',
      timestamp: e.parameter.timestamp || new Date().toISOString()
    };

    // Get or create the sheet
    const sheet = getOrCreateSheet(SHEET_NAME);

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Attendance', 'Number of Guests', 'Message']);
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 6);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4d0013');
      headerRange.setFontColor('#ffffff');
    }

    // Append the form data
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.phone,
      data.attendance,
      data.guests,
      data.message
    ]);

    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, 6);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'RSVP received successfully!'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles OPTIONS requests for CORS preflight
 */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Handles GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput('Wedding RSVP form handler is running! Use POST to submit data.')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Gets existing sheet or creates a new one
 */
function getOrCreateSheet(sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  return sheet;
}

/**
 * Optional: Send email notification when new RSVP is received
 * Uncomment and configure if you want email notifications
 */
/*
function sendEmailNotification(data) {
  const recipient = 'your-email@example.com'; // Change to your email
  const subject = 'New Wedding RSVP from ' + data.name;
  const body = `
    New RSVP Received!

    Name: ${data.name}
    Phone: ${data.phone}
    Attendance: ${data.attendance}
    Number of Guests: ${data.guests}
    Message: ${data.message || 'No message'}

    Timestamp: ${data.timestamp}
  `;

  MailApp.sendEmail(recipient, subject, body);
}
*/

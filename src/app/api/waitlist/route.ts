import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Destructure body to get fields
    const { name, age, city, country, email, isEarlyAccess } = body;

    // --- GOOGLE SHEETS INTEGRATION ---
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: [
          'https://www.googleapis.com/auth/drive',
          'https://www.googleapis.com/auth/drive.file',
          'https://www.googleapis.com/auth/spreadsheets',
        ],
      });

      const sheets = google.sheets({ version: 'v4', auth });

      const spreadsheetId = process.env.GOOGLE_SHEET_ID;

      if (spreadsheetId) {
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: 'Sheet1!A:G', // Adjust 'Sheet1' if your sheet has a different name
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [
              [name, age, city, country, email, isEarlyAccess ? 'Yes' : 'No', new Date().toISOString()]
            ],
          },
        });
        console.log(`Saved entry to Google Sheet: ${email}`);
      } else {
        console.warn("GOOGLE_SHEET_ID is missing using local log instead.");
        console.log("WAITLIST_ENTRY:", { name, email, city });
      }

    } catch (error) {
      console.error("Error saving to Google Sheets:", error);
      // Continue without failing the request
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true, message: "Added to waitlist" });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ success: false, message: "Failed to process" }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(req) {
  try {
    const data = await req.json();

    // Authenticate with the "Robot" email using environment variables
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Load the specific Google Sheet
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    // Select the first tab in the sheet
    const sheet = doc.sheetsByIndex[0];

    // Add the student's data as a new row
    await sheet.addRow({
      Name: data.name,
      Phone: data.phone,
      Stream: data.stream,
      College: data.college,
      Timestamp: new Date().toLocaleString()
    });

    return NextResponse.json({ message: 'Success' });
    
  } catch (error) {
    console.error("Sheet Error:", error);
    return NextResponse.json({ message: 'Error saving to sheet' }, { status: 500 });
  }
}
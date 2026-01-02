import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'registrations.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);

    // Convert JSON to CSV
    const csvHeader = "Name,Phone,Stream,College,Time\n";
    const csvRows = data.map(row => {
      const cleanName = row.name?.replace(/,/g, '') || '';
      const cleanCollege = row.college?.replace(/,/g, '') || '';
      const time = row.timestamp ? new Date(row.timestamp).toLocaleString() : '';
      return `${cleanName},${row.phone},${row.stream},${cleanCollege},"${time}"`;
    }).join("\n");

    return new NextResponse(csvHeader + csvRows, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="envision_2026_registrations_${Date.now()}.csv"`,
      },
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to export' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // In a real environment with filesystem access, we would append to a CSV file here.
    // For this demo/environment, we will simulate the "Excel connection" by logging structurally.
    // This is where you'd use a library like `xlsx` or `csv-writer` to append to a local file.

    console.log("--- NEW WAITLIST SUBMISSION ---");
    console.log("Name:", body.name);
    console.log("Age:", body.age);
    console.log("City:", body.city);
    console.log("Country:", body.country);
    console.log("Email:", body.email);
    console.log("Early Access VIP:", body.isEarlyAccess);
    console.log("-------------------------------");

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true, message: "Added to waitlist" });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ success: false, message: "Failed to process" }, { status: 500 });
  }
}

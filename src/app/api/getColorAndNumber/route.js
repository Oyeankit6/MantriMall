// import { connect } from "@/dbconfig/db";
// import Result from "@/models/publicSchema";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   await connect(); // Ensure database connection is established

//   try {
//     // Fetch all documents from the Result collection, sorted by period in descending order
//     const data = await Result.find().sort({ period: -1 });

//     // If no data exists, handle the case
//     if (data.length === 0) {
//       return NextResponse.json(
//         { message: "No records found" },
//         { status: 404 }
//       );
//     }

//     // Map the data to format it according to the schema structure
//     const formattedData = data.map((record) => ({
//       period: record.period,
//       results: {
//         Parity: {
//           number: record.results.Parity.number,
//           color: record.results.Parity.color,
//         },
//         Sapre: {
//           number: record.results.Sapre.number,
//           color: record.results.Sapre.color,
//         },
//         Bcone: {
//           number: record.results.Bcone.number,
//           color: record.results.Bcone.color,
//         },
//         Emerd: {
//           number: record.results.Emerd.number,
//           color: record.results.Emerd.color,
//         },
//       },
//       createdAt: record.createdAt,
//     }));

//     // Return the formatted data as a response
//     return NextResponse.json(formattedData);
//   } catch (error) {
//     console.error("Error fetching records:", error);
//     return NextResponse.json(
//       { message: "Error fetching records" },
//       { status: 500 }
//     );
//   }
// }



import { connect } from "@/dbconfig/db";
import Result from "@/models/publicSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
  // Log to indicate the API route is being hit
  console.log("GET request received at /api/getColorAndNumber");

  // Start timing the DB connection and data fetch
  console.time("DB Connection");

  // Ensure database connection is established
  await connect();
  console.log("Database connected");

  try {
    // Fetch all documents from the Result collection, sorted by period in descending order
    console.time("Data Fetch");
    const data = await Result.find().sort({ period: -1 });
    console.timeEnd("Data Fetch");

    // Log the length of the retrieved data
    console.log(`Fetched ${data.length} records from the database`);

    // If no data exists, handle the case
    if (data.length === 0) {
      console.log("No records found");
      return NextResponse.json(
        { message: "No records found" },
        { status: 404 }
      );
    }

    // Log that data formatting is starting
    console.log("Formatting fetched data");
    const formattedData = data.map((record) => ({
      period: record.period,
      results: {
        Parity: {
          number: record.results.Parity.number,
          color: record.results.Parity.color,
        },
        Sapre: {
          number: record.results.Sapre.number,
          color: record.results.Sapre.color,
        },
        Bcone: {
          number: record.results.Bcone.number,
          color: record.results.Bcone.color,
        },
        Emerd: {
          number: record.results.Emerd.number,
          color: record.results.Emerd.color,
        },
      },
      createdAt: record.createdAt,
    }));

    // Log that the response is ready to be sent
    console.log("Data formatted successfully, returning the response");

    // End the DB connection timer
    console.timeEnd("DB Connection");

    // Return the formatted data as a response
    return NextResponse.json(formattedData);
  } catch (error) {
    // Log the error with detailed information
    console.error("Error fetching records:", error);

    // Return an error response
    return NextResponse.json(
      { message: "Error fetching records" },
      { status: 500 }
    );
  }
}

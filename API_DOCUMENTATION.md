Image Processing API Documentation

Overview

This API allows users to upload CSV files containing product details and image URLs, process the images, and retrieve the processed images through a webhook. The system utilizes Redis for job queue management and MySQL for data persistence.

Base URL

http://localhost:5000/

1. Upload CSV

Endpoint:

POST /upload

Description:

Uploads a CSV file containing product information and image URLs for processing.

Request:

Headers:

Content-Type: multipart/form-data

Body:

file (Required): The CSV file to be uploaded.

webhookUrl (Required): The URL to receive processing completion notifications.

Response:

Success (200 OK):

{
  "requestId": "123e4567-e89b-12d3-a456-426614174000",
  "message": "File uploaded and processing started"
}

Error (400 Bad Request):

{
  "error": "No file uploaded"
}

2. Check Processing Status

Endpoint:

GET /status/:requestId

Description:

Retrieves the current status of a request.

Request:

Path Parameter:

requestId (UUID, Required) - The ID of the request.

Response:

Success (200 OK):

{
  "requestId": "123e4567-e89b-12d3-a456-426614174000",
  "status": "PROCESSING",
  "downloadLink": null
}

Error (404 Not Found):

{
  "error": "Request not found"
}

3. Webhook Trigger

Triggered Automatically When Processing Completes

Method: POST

Payload Sent to Webhook URL:

{
  "requestId": "123e4567-e89b-12d3-a456-426614174000",
  "status": "COMPLETED",
  "downloadLink": "http://example.com/output_123e4567-e89b-12d3-a456-426614174000.csv"
}

Data Models

1. Request Model

{
  "id": "UUID",
  "status": "PENDING | PROCESSING | COMPLETED",
  "createdAt": "Timestamp",
  "updatedAt": "Timestamp",
  "downloadLink": "string (URL)",
  "webhookUrl": "string (URL)"
}

2. Product Model

{
  "id": "INTEGER",
  "requestId": "UUID",
  "productName": "STRING",
  "inputImageUrl": ["STRING"],
  "outputImageUrl": ["STRING"],
  "status": "PENDING | PROCESSED"
}

System Workflow

User uploads a CSV file via POST /upload.

Each row in the CSV is added to a job queue for image processing.

Images are processed, resized, and stored.

Once all images are processed, a CSV containing output image URLs is generated.

The webhook is triggered with a COMPLETED status and the CSV download link.

User can check the status anytime using GET /status/:requestId.

Error Handling

Status Code

Description

400

Bad Request (e.g., Missing required parameters)

404

Not Found (e.g., Request ID not found)

500

Internal Server Error (e.g., Database failure, Processing errors)

Technologies Used

Backend: Node.js, Express.js

Database: MySQL (Sequelize ORM)

Job Queue: BullMQ (Redis)

Image Processing: Sharp

Storage: Local filesystem (can be extended to S3, etc.)

Future Enhancements

Support for cloud storage (AWS S3, Google Cloud Storage)

Real-time status updates via WebSockets

Image processing customization options (e.g., different resolutions, formats)
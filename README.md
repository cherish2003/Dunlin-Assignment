# Insightify

This project is a web-based application that allows users to upload various file types (text, PDF, DOC ) for analysis. The application provides detailed insights such as classification, entity recognition, sentiment analysis, and syntax analysis.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- User friendly UI 
- Drag and drop or select files for upload.
- Perform classification, entity recognition, sentiment analysis, and syntax analysis on uploaded files.
- View analysis results in a user-friendly interface.
- Download analysis reports as CSV files.
- Delete uploaded files and their analysis data.

## Technologies Used

- Next.js
- TypeScript
- Shadcn UI
- Axios
- Clerk (for authentication)
- Tailwind CSS (for styling)
- Express ( Backend )

## LLM Used 

- Google Cloud Natural Language API (For Extracting insights & useful info )
- Gemini api ( for Summarizing the extracted text ) 
  
## Demo
https://github.com/user-attachments/assets/9eea17a4-60fa-4089-9a10-031399f67d09


## Installation

## Client  
1. Set the clerk api keys from the clerk dashboard in client/.env.local

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```
2.Install the necessary dependencies and run the client:
```
cd client
npm install
npm run dev

```
## Server 
3. Set the Clerk API keys from the Clerk dashboard and the Gemini API key in server/.env:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_API_URL='https://api.clerk.com'
API_KEY=
```
4. Download the GOOGLE_APPLICATION_CREDENTIALS from the Google Cloud Console and don't forget to export it globally:
``export GOOGLE_APPLICATION_CREDENTIALS="youpath"

5.Install the necessary dependencies and run the server:

```
cd server
npm install
npm run dev

```


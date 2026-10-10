# Spurgs Video — Full-Stack Video Streaming Platform

A full-stack video streaming web application built with Next.js, React, TypeScript, Prisma, and MySQL.

Spurgs Video allows users to create accounts, authenticate securely, upload videos with custom thumbnails, browse uploaded content, and stream videos directly through their browsers.

## Features

- **User Authentication:** Account registration and login using NextAuth.js, JWT sessions, and bcrypt password hashing.
- **Video Uploads:** Authenticated users can upload video files with custom thumbnails.
- **Video Streaming:** Users can watch uploaded videos through an HTML5 video player.
- **Video Library:** Browse uploaded videos in a responsive grid layout.
- **Database Integration:** Store user information and video metadata in MySQL using Prisma ORM.
- **Dynamic Routing:** Individual video pages generated using Next.js App Router.

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes, Node.js |
| Database | MySQL |
| ORM | Prisma |
| Authentication | NextAuth.js, bcrypt.js, JWT |

## Application Screenshots

### Homepage

Browse uploaded videos through a responsive grid displaying video thumbnails and titles.

![Homepage](screenshots/homepage.png)

### Video Playback

Select a video to open its dedicated playback page.

![Video Player](screenshots/video-player.png)

### Video Upload

Authenticated users can upload videos and custom thumbnails.

![Video Upload](screenshots/upload.png)

### Authentication

Users can register and log in to their accounts.

![Login Page](screenshots/login.png)

### Database Integration

Prisma ORM connects the application to a MySQL database containing user accounts and video metadata.

**Video Database**

![Video Database](screenshots/database_video_data.png)

**User Database**

![User Database](screenshots/database_user_data.png)

## Database Architecture

The application uses three primary database models:

### User

- Stores account information.
- Maintains relationships with uploaded videos.
- Stores bcrypt-hashed passwords.

### Video

- Stores video titles, filenames, thumbnails, and upload timestamps.
- Associates uploaded videos with their owners through a foreign key.

### Session

- Stores session-related records associated with users.

## Getting Started

### Prerequisites

- Node.js
- MySQL
- npm

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Alexdeor/spurgs.com.git
cd spurgs.com
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Create a `.env` file containing the required database connection string and authentication configuration.

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME"
```

Additional authentication environment variables may be required depending on your NextAuth.js configuration.

**4. Set up the database**

```bash
npx prisma migrate deploy
npx prisma generate
```

**5. Start the development server**

```bash
npm run dev
```

Open the application at `http://localhost:3000`.

## Future Improvements

Potential enhancements include:

- Video search and filtering.
- User profiles displaying uploaded videos.
- Video descriptions and categories.
- Cloud-based video storage.
- Improved mobile responsiveness.

## Author

Developed by **Alex De Orbegoso**.
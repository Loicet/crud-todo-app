# Task Management App

A modern, full-stack task management application built with Next.js, TypeScript, and Firebase. This app provides a clean and intuitive interface for managing your daily tasks with user authentication and real-time data synchronization.

##  Features

- **User Authentication**: Secure email/password authentication using Firebase Auth
- **CRUD Operations**: Create, read, update, and delete tasks
- **Real-time Updates**: Tasks are synchronized in real-time across all devices
- **Priority Management**: Assign priority levels (Low, Medium, High) to tasks
- **Task Completion**: Mark tasks as complete/incomplete with visual indicators
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean and intuitive interface built with Tailwind CSS
- **Protected Routes**: Secure pages that require authentication
- **User-friendly**: Easy-to-use forms with validation and error handling

##  Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Authentication
- **Database**: Cloud Firestore
- **State Management**: React hooks and Context API
- **Deployment**: Vercel-ready

##  Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- A Firebase account

##  Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd firebase-crud-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable **Email/Password** authentication in Authentication settings
4. Create a **Cloud Firestore** database
5. Set up security rules (see Security Rules section below)

### 4. Environment Variables

Create a `.env.local` file in the root directory and add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

You can find these values in your Firebase project settings under "General" tab.

### 5. Firestore Security Rules

Set up these security rules in your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Tasks collection
    match /tasks/{taskId} {
      allow read: if request.auth != null && request.auth.token.email == resource.data.userEmail;
      allow create: if request.auth != null && request.auth.token.email == request.resource.data.userEmail;
      allow update: if request.auth != null && request.auth.token.email == resource.data.userEmail;
      allow delete: if request.auth != null && request.auth.token.email == resource.data.userEmail;
    }
  }
}
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

##  Project Structure

```
firebase-crud-app/
├── src/
│   ├── app/
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   ├── page.tsx        # Main dashboard (protected)
│   │   └── layout.tsx      # Root layout
│   ├── components/
│   │   ├── ProtectedRoute.tsx    # Authentication wrapper
│   │   ├── TaskForm.tsx          # Task creation/edit form
│   │   └── TaskList.tsx          # Task display component
│   ├── lib/
│   │   └── firebase.ts           # Firebase configuration
│   ├── services/
│   │   └── taskService.ts      # Firestore CRUD operations
│   ├── types/
│   │   └── task.ts              # TypeScript interfaces
│   └── styles/
│       └── globals.css          # Global styles
├── public/                    # Static assets
├── .env.local                # Environment variables (not in git)
├── package.json              # Dependencies
└── README.md                # This file
```

##  Key Components

### Authentication
- **Register Page**: User registration with email/password
- **Login Page**: User authentication
- **ProtectedRoute**: HOC for protecting routes

### Task Management
- **TaskForm**: Form for creating/editing tasks
- **TaskList**: Displays all user tasks
- **taskService**: Firestore CRUD operations

### Data Model
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
  userEmail: string;
  createdAt: Date;
  updatedAt: Date;
}
```

##  Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

```bash
npm run build
npm start
```

##  Testing

Run the development server and test the following:

1. **User Registration**: Create a new account
2. **Login/Logout**: Test authentication flow
3. **Task Creation**: Add new tasks with different priorities
4. **Task Editing**: Modify existing tasks
5. **Task Deletion**: Remove tasks
6. **Task Completion**: Mark tasks as complete/incomplete
7. **Responsive Design**: Test on mobile and desktop

##  Security Features

- Protected routes require authentication
- Firestore security rules ensure data isolation
- Environment variables for sensitive configuration
- Input validation and error handling

##  Troubleshooting

### Common Issues

1. **Firebase Configuration Errors**
   - Double-check your environment variables
   - Ensure Firebase services are enabled

2. **Authentication Issues**
   - Verify email/password authentication is enabled
   - Check Firestore security rules

3. **Build Errors**
   - Ensure all dependencies are installed
   - Check TypeScript types are correct

4. **Deployment Issues**
   - Verify environment variables are set in deployment platform
   - Check build logs for specific errors

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the LICENSE file for details.

##  Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Firebase](https://firebase.google.com/) for authentication and database
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [react-firebase-hooks](https://github.com/CSFrequency/react-firebase-hooks) for Firebase hooks

##  Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the Firebase documentation
3. Open an issue in the GitHub repository

---

**Happy Task Managing! **

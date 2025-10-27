# AI Study Plan Generator

An intelligent web application that generates personalized study plans for any topic using AI. Built with React and powered by n8n + OpenAI.

![Study Plan Generator](./src/assets/image1.png)

## ✨ Features

- 🤖 **AI-Powered Plans**: Generate comprehensive study plans for any topic using OpenAI
- 📚 **Step-by-Step Learning**: Detailed learning paths with time estimates and activities
- 🔖 **Save & Organize**: Save your favorite study plans and access them anytime
- 📱 **Responsive Design**: Beautiful, book-themed interface that works on all devices
- ✅ **Progress Tracking**: Mark steps as completed to track your learning journey
- 🖨️ **Print Support**: Print your study plans for offline reference
- 🎯 **Resource Links**: Curated learning resources including videos and articles
- 🔐 **Secure API**: Protected with token-based authentication

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: n8n Webhooks + OpenAI API
- **Database**: Managed through n8n workflows

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)
- Git

## 🚀 Installation

### 1. Clone the repository

```
git clone https://github.com/yourusername/study-plan-generator.git
cd study-plan-generator
```

### 2. Install dependencies

```
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```
VITE_N8N_WEBHOOK_URL=https://youssefx90.app.n8n.cloud/webhook/study-plan-api
VITE_JWT_TOKEN=your_authentication_token_here
```

### 4. Start the development server

```
npm run dev
```

The application will open at `http://localhost:5173`

## 📁 Project Structure

```
study-plan-generator/
├── public/
├── src/
│   ├── components/
│   │   ├── AISummaryQuote.jsx
│   │   ├── HeroSection.jsx
│   │   ├── InputForm.jsx
│   │   ├── Loader.jsx
│   │   ├── OrnamentalDivider.jsx
│   │   ├── ResourceCard.jsx
│   │   ├── ResourcesSection.jsx
│   │   ├── ResultCard.jsx
│   │   ├── Sidebar.jsx
│   │   └── StudyPlanTimeline.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── StudyPlanView.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── helpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .env.example
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Usage

### Generating a Study Plan

1. Enter any topic you want to learn in the input field
2. Click "Generate Study Plan"
3. Wait for AI to create your personalized plan
4. Review the generated steps, resources, and timeline

### Saving Plans

1. Click "Save for Later" button on any study plan
2. Access saved plans from the "Study History" sidebar
3. Click on any saved plan to view it again

### Tracking Progress

1. Click the numbered circles next to each step to mark as complete
2. Watch your progress indicator update in real-time
3. Completed steps will show a checkmark

### Printing Plans

1. Click the "Print" button on any study plan
2. Your browser's print dialog will open
3. Save as PDF or print directly

## 🔧 Configuration

### Authentication

The app uses Header Authentication with n8n:
- Header Name: `token`
- Token is stored in `.env` file

## 🏗️ Building for Production

```
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```
npm run preview
```




## 📧 Contact

Youssef Faisal - [yousseffaissal0@gmail.com]
My LinkedIn - [Youssef Faisal](https://www.linkedin.com/in/yousef-faisal/)


## **Create .env**

Also create a `.env` file for other developers:

```env
VITE_N8N_WEBHOOK_URL=your_n8n_webhook_url_here
VITE_JWT_TOKEN=your_authentication_token_here
```
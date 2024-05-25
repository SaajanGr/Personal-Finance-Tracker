# Personal Finance Tracker

## Description
Personal Finance Tracker is a full-stack application designed to help users track their income and expenses efficiently. By providing dynamic data visualization features, such as interactive pie charts for both income and expense categories, the application enhances user insights and supports better financial decision making. 

## Features
- **Income and Expense Tracking:** Easily record and categorize your income and expenses to keep track of your financial activities.
- **Interactive Pie Charts:** Visualize your income and expenses with interactive pie charts, allowing for better analysis and insights.
- **User Authentication and Authorization:** Secure user login and registration system to protect user data.
- **Data Security:** Utilizes MongoDB to securely store user data and financial records.
- **Real-Time Updates:** Changes and updates to financial data are reflected in real-time for accurate tracking.
  
## Demo
![App Screenshot](https://github.com/SaajanGr/Personal-Finance-Tracker/blob/main/frontend/HomeScreenshot.png)

## Installation and Usage

### Prerequisites
- Node.js
- MongoDB

### Frontend Setup

Navigate to the frontend directory:
cd your-repo-name/frontend


Install dependencies:
npm install

Start the development server:
npm start

### Backend Setup
Navigate to the backend directory:
cd your-repo-name/backend

Install dependencies:

npm install

Create a .env file in the backend directory with the following variables:

NODE_ENV=
PORT=
MONGO_URI=
JWT_SECRET=

Start the server:
npm start

### Running the Application
- Ensure that MongoDB is running on your local machine or your specified server.
- Run the frontend and backend setups as described above.
- Open your browser and go to http://localhost:3000 to access the application.

## Technologies Used

### Frontend:
- React.js
- Tailwind CSS
- Axios
- Vite

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Nodemailer

## Future Improvements
- **Enhanced Data Visualization:** Introduce more advanced visualization tools, such as bar charts and line graphs, to provide deeper insights into financial trends.
- **Expense Sharing:** Enable users to share specific expenses or financial summaries with family members or partners, allowing for better financial collaboration.
- **Integration with Financial Institutions:** Integrate with banks and financial institutions to automatically import and categorize transactions, reducing manual data entry.

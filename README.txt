=================================================================
                    EXPRESS CHAT BACKEND APP
=================================================================

Description:
-------------
This is a basic Node/Express backend chat application (without a UI) that provides simple chat functionality. It uses MongoDB for data persistence and Joi for input validation. The application allows you to:
  - Register a new user.
  - Add a friend to a user's friend list.
  - Send messages between users.
  - Retrieve messages from a specific friend.
  - View a user's friends list (via the user routes).

The app is written in TypeScript and runs on port 3000 for local deployment.

Installation & Setup:
----------------------
1. **Clone the Repository:**
   git clone https://github.com/yourusername/your-repository.git
   cd your-repository

2. **Install Dependencies:**
   npm install

3. **Configure MongoDB:**
   - Ensure MongoDB is installed and running.
   - Set your MongoDB connection string in the configuration file or as an environment variable (e.g., MONGO_URI).

4. **Configure Environment (Optional):**
   - Create a `.env` file if needed and set up any required variables.

Usage:
------
1. **Start the Application:**
   For local deployment, the application starts using `index.ts` on port 3000:
   
      npm start
      (Or use ts-node: ts-node index.ts)

2. **Base URL:**
   The API will be accessible at: http://localhost:3000

Endpoints:
----------
The application provides the following API routes:

### User Routes
- **Register a New User:**
  - **Endpoint:** POST `/user/register`
  - **Payload:** `{ "name": "<name>" }`
  - **Description:** Registers a new user with the provided name.

- **Add a Friend:**
  - **Endpoint:** POST `/user/add_a_friend/add_a_friend`
  - **Payload:** `{ "name": "<name>", "friend": "<friend_name>" }`
  - **Description:** Adds a new friend to the user's friend list.

### Message Routes
- **Send a Message:**
  - **Endpoint:** POST `/message/send`
  - **Payload:** `{ "from": "<name>", "to": "<friend>", "message": "<text>" }`
  - **Description:** Sends a message from one user to a friend.

- **Get Messages from a Friend:**
  - **Endpoint:** GET `/message/get`
  - **Query Parameters:** `name=<name>&friend=<friend>`
  - **Description:** Retrieves all messages exchanged between the user and a specified friend.

### Error Handling:
- The application uses a central error handler middleware (attached via `app.use(error_handler)`) to catch and process any errors that occur during API calls.

Validation:
-----------
All incoming data is validated using Joi schemas to ensure:
  - Required fields are provided.
  - No empty input is accepted.
  - Data adheres to expected types and formats.

Development Requirements:
--------------------------
- Node.js (v10 or later recommended)
- MongoDB
- TypeScript
- npm (Node Package Manager)

Contributing:
-------------
Contributions are welcome! If you have suggestions, improvements, or bug fixes, please fork the repository and submit a pull request. For issues or feature requests, open an issue on GitHub.

License:
--------
This project is open-source and available under the MIT License.

Contact:
--------
For questions or further information, please contact:
   [Your Name]
   [Your Email Address]
   [Your GitHub Profile URL]

=================================================================
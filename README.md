![app screenshot](/src/assets/MATS_app_ss1.jpg)

# MATS - Medicine, Appointment Tracking Solution

MATS is a personal medicine and appointment tracker designed to help users manage their healthcare routines. With Singapore's aging population in mind, MATS allows users to easily track their medications, upcoming medical appointments, and ensure they never miss a dose or an appointment. The app enables users to record down their upcoming doctor visit, with info such as the date, time, location, and type. The app also allows users to log medications, track their quantities and expiration dates.

Although stil in its beta stage, I believe this app holds great potential and usefulness for individuals and healthcare organisation.

---

> “The journey of building this project has been one of learning, growth, and persistence. It is a testament to the passion and dedication I have for using technology to solve real-world problems. As I look ahead, I am excited for the opportunities this project will bring and the positive impact it will have on healthcare management.”

# Getting Started

Here’s how to get started with the MATS app.

### Link to Deployed App

Currently, the app is still under development. You can explore the front-end and back-end repositories below:

- **Frontend**: [https://github.com/BenjaminGohPS/MATS-app-frontend](https://github.com/BenjaminGohPS/MATS-app-frontend)
- **Backend**: [https://github.com/BenjaminGohPS/MATS-app-backend](https://github.com/BenjaminGohPS/MATS-app-backend)

### Planning Materials

All planning materials and project management details can be found here:

- **Trello Board**: [MATS App - Planning](https://trello.com/b/DNTvCL83/mats-app-medicine-appointment-tracking-solution-app)

### Setup Instructions

1. **Clone the Repositories**

   - Frontend: [Clone the frontend repository](https://github.com/BenjaminGohPS/MATS-app-frontend)
   - Backend: [Clone the backend repository](https://github.com/BenjaminGohPS/MATS-app-backend)

2. **Install Dependencies**

   In both the frontend and backend directories, run:

   ```bash
   npm install

   ```

3. **Configuration**

   You will need to configure your `.env` files for both the frontend and backend.

   ### Frontend (.env):

   ```javascript
   VITE_SERVER=<your server IP and port>
   ```

   ### Backend (.env):

   ```javascript
   PORT=<port number>
   DB_HOST=<your server IP>
   DB_PORT=<port number>
   DB_USER=<your user>
   DB_PASSWORD=<your password>
   DB_NAME=<your DB name>
   ACCESS_SECRET=<secret key>
   REFRESH_SECRET=<refresh token secret>
   ```

   In both the frontend and backend directories, run:

   ```bash
   npm run dev

   ```

4. **PostgreSQL database**

   You will need to run the PostgreSQL database queries. I have included the file `db_p4_setup.sql` under the src/assets/db_p4_setup.sql for you to run.

   You may refer to the file `MATS-DataModeling_12Dec24` for an overview.

# Using the app

### 1. Sign Up

- Navigate to the **Sign Up** page from the navbar.
- Fill in the required details (i.e. email, password) and click **Sign Up**.

![Sign Up Page](/src/assets/MATS_app_ss2.jpg)

- Upon successful registration, you will receive a confirmation message.

### 2. Log In

- Click the logo on the top left which will bring you back to the landing page.
- Once you have signed up, go to the **Log In** page via the navbar.
- Enter your email and password, then click **Log In**.

![Log In Page](/src/assets/MATS_app_ss3.jpg)

### 3. Dashboard

- After logging in, you will be redirected to your **Dashboard**.
- Here, you can manage your medication and appointments.

![Dashboard](/src/assets/MATS_app_ss4.jpg)

### 4. Adding Appointments

- depending on your screen size, the navigation bar may have expanded. Otherwise, click on the hamburger ☰ button to expand the menu
- From the dashboard you get an overview of your appointments in chronological order from the earliest to the latest appointment.
- You may also edit the details, or delete appointments here
- From the navigation bar at the top, click Appointments, and you are greeted with the input field to add appointments.
- fill in the appointment date, appointment time, location, type, and doctor. Once done, click **Add Appointment** to add to your list.
![Add Appointment Page](/src/assets/MATS_app_ss5.jpg)

- For ADMIN, there will be an additonal field for you to assign to an individual.
- ADMIN will also have a drop down menu to filter the appointments by individual users

![Admin Filter Appointment Page](/src/assets/MATS_app_ss5.jpg)

### 5. Adding Medication

- depending on your screen size, the navigation bar may have expanded. Otherwise, click on the hamburger ☰ button to expand the menu
- Click **Add Medication** to enter details such as the medicine name, dosage, and expiry date.
- You can also input the quantity to track how many pills are left.

![Add Medication Page](path/to/your/add-medication-image.png)

### 6. Viewing and Managing Medications & Appointments

- After adding medication and appointments, you can view them directly on your **Dashboard**.
- Medication cards will show key details such as how many pills are left, the expiry date, and a visual cue if the medication is running low (less than 30 days).
- Appointment cards display information such as the date, time, and location.

![Medications and Appointments Overview](path/to/your/overview-image.png)

---

# Attributions

For overall html styling, I have used css and tailwind:-

- [tailwindcss](https://tailwindcss.com/)

Logo obtained from this site:-

- [shopify](https://www.shopify.com/tools/logo-maker)

Whenever I got stuck, or faced difficulties in implementing the codes or ideas, I would refer to the following for examples and write ups. Other sites use for reference can be found here too:-

- [W3Schools](https://www.w3schools.com/)
- [MDN](https://developer.mozilla.org/en-US/)
- [stackoverflow](https://stackoverflow.com/)
- [General Assembly Course Notes](https://generalassemb.ly/)
- [MediaWiki](https://www.mediawiki.org/wiki/API:Query)
- [React](https://react.dev/learn)
- [Random.org](https://www.random.org/)
- [jwtio](https://jwt.io/)
- [TanStack Query](https://tanstack.com/query/latest)
- [PostgreSQL](https://www.postgresql.org/)

# Technologies Used

### Frontend:

- HTML
- CSS
- JavaScript
- React
- React Icon
- React Router
- TailwindCSS
- TanStack Query
- JWT (JSON Web Token) for authentication
- React Toastify for notifications

### Backend:

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- bcrypt (for password hashing)
- jsonwebtoken for authentication

# Next Steps

- Implement automatic reminders for medication and appointments.
- Add a feature for users to share medication or appointment details with family members.
- Allow users to see a warning when their medication is running low (e.g., <30 days).
- Add functionality to query medication details from external sources like HealthHub.

# Conclusion

Thank you for exploring the MATS project. I hope it inspires others to create practical and meaningful solutions in the field of healthcare. For any feedback or questions, feel free to reach out. Stay safe, and take care!

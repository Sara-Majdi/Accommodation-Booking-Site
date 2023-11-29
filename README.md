# Room-Booking-Site

'npm run dev' to run the server 

testing email = sara@gmail.com
testing password = sara1234

</br>

# Videos/Viva Points 

## Preparations </br> 
1. Log in MongoDB 
2. Make sure current IP Address is added 
3. Prepare 2 Accommodations Details for Demo </br> </br>


## Start Servers </br>
1. Cd in to 'client', Run 'npm run dev' in client terminal (I am using Vite as the frontend server, and this is the command I gotta use to run the server)
2. Cd in to 'api', Run 'nodemon index.js' in api terminal (nodemon is a npm package, which is a more convienient way to run the backend server)</br> </br>



## Home Page </br>
1. Navbar (Its across all pages) 
2. All the accommodations are in grid layout 
3. Search Functionality (Using .filter() and .includes() function, show code) -> **Homepage**
4. Search with capital and small letters also can, also can search middle words 
5. Mobile Responsive </br> </br>


## Register Page </br>
1. Need to have '@' for email input (in-built html validation)
2. Show backend code, users are registered with mongoose with User.create() function
3. Passwords are encrypted (show demo in database)
4. Show isEmpty Validations
5. Create a new user for Ms Vimala
6. Mobile Responsive </br> </br>


## Login Page </br>
1. Show isEmpty Validations
2. First enter wrong Email, then show 'Login Failed' message
3. Now enter wrong password, then show 'Login Failed' message, then only Login correctly
4. Show code, upon clicking Login button, mongoose will find for the userID (userID is unique and it is 
    given when users register)
5. If user is registered, then login succesful, vice versa
6. Login now
7. User will be redirected to Home Page and user name will be added on the Navbar (right side)
8. Mobile Responsive </br> </br>



## MyProfile Page </br>
1. Name and Email are bolded
2. Logout and Login Again
3. Mobile Responsive </br> </br>

## MyBookingsPage </br>
1. If no bookings made, then will be empty
2. Mobile Responsive </br> </br>


## MyAccommodationsPage </br>
1. If no accommodation added, then will be empty
2. If got then the Accommodation will be displayed 
3. Mobile Responsive </br> </br>

## MyAccommodationsFormPage
1. Places can be added, updated and deleted
2. Show isEmpty Validations
3. Show Add by link featur
4. Show Upload from device feature
5. Delete photo feature
6. Set Main Photo feature
7. Show when user want to Add Accommodation, then the button will be displayed as 'Add Accommodation
8. Existing places can be edited (Edit the title and set new main photo)
9. When user Updating Accommodation Details, then the button will be displayed as 'Save Accommodation
10. Add another Accommodation to show Delete Accomodation feature (Has Confirmation Message)
11. Mobile Responsive </br> </br>


## Single Accommodation Page </br>
1. Accommodation Details such as Title Description, Extra Info, Booking Details
2. Google Maps Location (Show code, the query part)
3. Photos in Grid Layout
4. Click on 'Show more' button (Only appears when there are 5 or more photos) (show code)     (mobile responsive)
5. If correct date filled then extra inputs and prices will be displaye
6. Booking Widget with isEmpty validation and Date validation
7. User Name is automatically added
8. Guests Numbers must be less than the specified Max Guests (Show code, in Booking Widget.jsx
9. Price for certain nights is displayed
10. Service fee is displayed, it is 2.5% of the whole booking (show code)
11. Make 2 Booking
12. Mobile Responsive  </br> </br>


## Single Booking Page </br>
1. Dates and Price is displayed on top 
2. Guest Name, Phone Number, Guests Numbers, and Prices are displayed below
3. Same Photos grid Layout and also Show More Photos Button
4. It will have these details because it is easier for users to read thru the accommodation details in the MyBookings Page, instead of finding for the accommodation in the Home Page, which is full of other accommodations
5. Delete Booking feature with Confirmation Message 
6. Mobile Responsive  </br> </br>

## After presentation, Login to Main/Test  Account and explain the scenario below </br>
(Ask the question and show demo while answering) </br> </br>

### Scenario 1  </br>
Q) Can I book my own rooms? </br>
Ans) Yes, can. Book And Show

</br> 

### Scenario 2 </br>
Q) If Delete Booking or Delete Accommodation, there will not be any issue, but what will happen when we delete a Accommodation that has booking?  </br>
Ans) After Deleting Accommodation and going to the MyBookings.page, there will be a cute sorry message, click on the 'X' and click the Delete button, then the booking will dissapear in every other user's booking page. That is why the message below is displayed. 
'If The Booking You Have Made Is Not Displayed, It Indicates The Accommodation Owner Has Removed The Listing'

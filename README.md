# QuotationCard Module Frontend
### Why a Quotation Module?
Customers often send a Request for Quotation, or an RFQ to suppliers to get the supplier's "quotation" on various products, or more simply put, the supplier's breakdown of the prices they are offering for different products at different quantities.  
The preparation of this quotation can be laborous if manually done, especially if it has to be done repeatedly for several clients. Moreover, such manual effort is difficult to track properly on the part of the supplier.
The purpose of this quotation module is to simplify the process on the supplier's end so that they have a product-based solution to prepare quotations for their clients and then subsequently use that to download well-formatted quotations as PDF files to send to their customers easily, efficiently and in a scalable fashion. 

#### Deployment Link: <a href = "https://quotation-module-frontend.vercel.app/">Click here to visit the frontend deployment of the project</a>

### Product Screenshots
![image](https://github.com/user-attachments/assets/4145e331-fe36-40b7-84e6-1f329bada380)
![image](https://github.com/user-attachments/assets/92927ba1-ae4d-4795-84a2-df03030c5747)
![image](https://github.com/user-attachments/assets/c776fae7-fff2-4763-b99f-20fff52dff7f)

### Product Usage Documentation
All quotations in history will be visible in the All Quotes page, i.e. the first page that opens after clicking on the deployment link given above. Basic details of the quotation, such as the client's name and the quotation's expiry status will be visible as a snapshot from here.
#### To Add A New Quotation
- Visit the home url (the deployment URL shared above)
- Click on Add Quote button at the bottom of the existing quotations
- Enter the client's name
- Enter the quotation expiry date
- Choose the currency system the client follows and the quotation should follow out of INR (Indian Rupees) or USD (US Dollars)
- Click on the Add Quote button
- You should see a confirmation alert telling you that the quotation has been added successfully
- Navigate back to the home page
- Click on the newly added quotation (should be visible with your newly added client name and expiry status)
- Start editing quotation
#### To Add Parts To A Quotation
- Visit the quotation you wish to add parts to
- Click on the Add Part button at the bottom of the existing parts table. This table should be empty if this is a new quotation. Otherwise, the table will contain details of the parts already mentioned in the quotation
- The Add Part button opens a dialog box to add your part's details
- Enter all the pricing details and click on Add Price to add pricing breakdown for different quantities of order of the same part
- When pricing breakdown is done, click on Add Part
- You should see a confirmation telling you that the part has been added
- The Part Details table should update dynamically to display the new part you added with its pricing breakdown

***
### To-Do List
- [x]  Setup and clean React Template
- [X]  Create Components Structures:
    - [X]  Pages:
        - [X]  All Quotes Screen
        - [X] Add Quote Form
        - [X]  Quote View
    - [X]  Components:
        - [X]  QuotationCard Card
        - [X]  Add New Part Form
- [X]  Connect Empty Components with Dummy DB Data (minus quotation form)
- [X]  Connect DB to add new quotations
- [X] Connect DB to add new parts in quotations
- [X] Implement templating engine to download quotation
- [X] Implement 3rd party api connection to convert currencies
- [X] Deploy frontend
- [X] Code clean-up + documentation
- [X] README documentation for users

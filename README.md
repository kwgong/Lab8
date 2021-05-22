# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
   1. Within a Github action that runs whenever code is pushed

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
   No, because the message feature involves interaction with another user's application which may not be covered within the scope of a unit test.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
   Yes, because a unit test can simply check whether the feature really prevented the user to max out on message length or not. 

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
   The beforeAll callback would be: 
   `beforeAll(async () => { await page.goto('http://127.0.0.1:5500/settings'); page.setDefaultTimeout(0); });`
   
    All Tests: 
   [img](images/test.png)


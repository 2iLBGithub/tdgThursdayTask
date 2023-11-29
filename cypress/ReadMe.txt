The tests seen in spec.cy.js were written in my second week at 2i.

The purpose of these tests is to not only run but then clean up after themselves, however this is conducted within the test environment and as such it should be sanitised beforehand.

As such, looking at the top of spec.cy.js and refactor the URL links provided to match those of the directory you're using. 

Please also log into the website: 

        "https://develop.d3nylssqqiptjw.amplifyapp.com/"
        'team3@test.com'
        '123456'

And clear any history, and any template called 'test1'.

Otherwise tests one and two will likely fail.

In order to run the project please follow these steps:

git clone 
cd into the directory
npm install
npx cypress open 
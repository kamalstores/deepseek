Here we are making a AI Chatbot.

So follow these phases and steps


Run this command in terminal "npx create-next-app@latest"

We are using 
ESLint because it is a static code analysis tool for identifying problematic patterns found in JavaScript code
Tailwind CSS for styling
We can store files separate from src as it just one or two folder
App Router as it provides a more structured and efficient way to manage routing, layouts, and data fetching
Turbopack because for its speed and efficiency, particularly in development mode, for large-scale JavaScript and TypeScript applications
Not use import alias as we can deal with relative paths

################################################

We can assets folder for useful things like photo and fevicon etc.
As we have own fevicon so we replace with default one
We make assets.js file and make a object for store files and export as assets to use in future directly

Now we add own title and description in metadata object in layot.js file and also change the font to Inter

####################################################

Remove unnecessary div in page.js file and also remove the image Import as we don't need this
As we want to style on own so remove default styling

In global css we add theme(primary color) and smooth scroll effect in html and remove scrollbar from page to look asthetic

##################################################

We make some folders
components --> It is used to store the components for project
context --> It is used to create context api to store variable and function that is used in multiple componets 
config --> It is used to store the configuration files like MongoDB etc.
models --> It is used to create model files because from these model we store the data in mongoDB database 
.env -->   It is used to store the environment variables

##################################################
Its time to add some elements in home page

So in page.js
we create some state variables like
for expand or collapse sidebar ---> we initilaze by false
for messages --> we initiliaze with empty array
for Loading --> we initilaze by false

Now we add div and within this
we make another div for sidebar and main content and within this div we made another div to group two images(menu icon and chat icon) and add some css
And in menu icon we add on-click property to setExpand make false if already expand otherwise true

and we check messages length as it is array and apply like if else condition,  if meassgae is empty we add image(logo) and p tag

Covert name to jsx as we want to return html

then a p for telling reference etc 

#####################################################

In comonents folder
we make some files
Sidebar jsx --> for sidebar element 
PromptBox jsx --> for prompt


######################################################
In sidebar jsx
Add elemets like open and closed sidebar, button for new chat  , a image when message is there or another image , when msg not there etc
and some property of css


######################################################
In promptbox jsx
we add some text and a form , some icons etc.
and some property of css

####################################################
Make account on clerk
We use clerk for user Authentication as we can easliy management and integrate user authenticate

ADD clerkprovider in page.js then 

#####################################################
Make new file in context folder where we store function and variable which is used by components files


#####################################################
Now we gonna edit or delete chats and store so we make a ChatLabel file in components folder 


#####################################################
Now we gonna show messages so we make a Message file in components folder 




#########################################################
##########################################################
##########################################################

Backend

#########################################################
##########################################################
##########################################################

We install some libraries like
axios --> used to make HTTP requests, allowing applications to interact with APIs and servers to fetch or send data
mongoose --> to connect with mongoDB database
openai --> can make api call and get answer from ai
svix --> manage clerk and simplifies the process of sending and receiving webhooks, enabling reliable, secure, and scalable webhook delivery

frontend libraries
prismjs --> to highlight the syntax
react-hot-toast --> for display toast notification
react-markdown --> structure the response got from ai

for verification they are installed or not we can check at
package.json --> dependencies

#################################################
Create account on mongoDB atlas to store user and chat data


const mongoose = require('mongoose');
const uri = "mongodb+srv://kamalsnitkkr:kamalsnitkkr@cluster0.wpiu7zd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);


copy the part upto .net (mongodb+srv://kamalsnitkkr:<db_password>@cluster0.wpiu7zd.mongodb.net)
and paste into .env file as MONGODB_URI , set password and add /deepseek in last of it

################################################################################
make configuration file named db.js to connect with mongo db 
now we create mongoDB model so because of this model we can store data in mongoDB database ... so create file user.js in model folder

#######################################################
create schema and models like (user model) in user.js file 

######################################################
when user modify data from clerk then it should update the mongoDB database so set up clerk web hooks

to do this we make folder
in app -> make api folder -> make clerk folder -> make route.js file

in this file we write POST function and add a secret key which is present in .env file(we make this)
and add some line of code to get data of user and do different things from this data

We will deploy this webhook to Clerk dashboard because Clerk will send events to this endpoint and we will handle them accordingly.
This is how Clerk will send events to our application and we will handle them accordingly.


we will deploy the project into git and from this we deploy into vercel. from vercel link we add this into clerk and add /app/clerk into it. from there we get SECRET_KEY and we paste into env file and vercel.

then if we add user , data will be stored in mongoDB


########################################################
now we store data of chat. so we make new file Chat.js
in this we store name, messages, userid, timestamp in database

########################################################

We will create some file in api
to create new chat so we make file in app -> api -> chat -> create -> route.js
and make get folder to have all chats of user
and make rename folder to rename the chat
and make delete folder to delete the chat
and make ai folder to call deepseek api
(from openrouter, we can get api)

########################################################

after writing code in api we integrate this with frontend
so in AppContext.js we made function

we add toaster in layout.js for error because toast notifications are used to show success and error messages


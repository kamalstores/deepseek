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
We use clerk for user Authentication as we can easliy management and integrate user authenticate

ADD clerkprovider in page.js then 

#####################################################
Make new file in context folder where we store function and variable which is used by components files


#####################################################
Now we gonna edit or delete chats and store so we make a ChatLabel file in components folder 


#####################################################
Now we gonna show messages so we make a Message file in components folder 
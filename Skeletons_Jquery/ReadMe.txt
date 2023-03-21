William Friend
Program 3

JQuery broken down:

1. I used Jquery in the progress bar, above the nav, on every page
		it's funny sometimes it likes to skip html rendered by jquery, like the progress bar will skip that part,
		and only that part
2. I used JQuery to creat the employee roledex, which reads from an xml employee list, 
	On All it shows the whole gang
	Then, when you select from the drop down, it shows buyers, sellers, developers, and others
3. I used JQuery to generate the form for the user to fill out on the form page. 
	The only non generated html is non-form related on that age, 
			other then the div I need to stick it in obviously, but you know that, you taught it to me.
4. I used Jquery for the cart to keep trac of calculations user is making on market like form		
		Caveats: 
->The user must be able to
transition back and forth between 
any site pages using the site’s navigation controls.  
Suggest you start making header 
and Navigation bar consistent across all pages. 

	I updated the navbar so you can swtch easily between the new pages. 
	They are consistent except for the active page change. 

->There is extra credit if you integrate an XML/JSON data source with the form.  
For example, if the user selects an item they want to purchase from inventory, 
then the price form field is automatically filled in from the external data.  
	The form is attached to a skeletons.xml file, which the jquery reads
	then creates the form according to the xml schema, which is just really simple
	at this point, but since it is tied to the xml, just adding more elements to the 
	skeletons.xml, the form will grow.
	The price dropdowns for downpayments cant exceed the max price set in the xml form.
 

DONE:
Due: 	Wednesday, Mar 15 
You must use JQuery in at least one of these pages. 
Ideally, you will use JQuery in the following three capacities:  
1) as JS shorthand, 2) to implement som visual effect, and 3) to perform some aspect of form processor or validation.  
Include a README file with your submission that briefly explains how you used JQuery.  The more substantial the use of JQuery, 
the better your grade. 


1
Continue to modify and expand your website.  
In particular, you will make use of JavaScript (JS) to add 
functionality to the website.  Further, for the “Informational page” 
from project #2, you will separate structure, style and content. 

		AJAX and XML

2
		Employee.xml 

		Create a data source file (either using XML or JSON) 
that defines the content for the Informational page from project #2.  

3
		Overall Directory Subdirectory project structure with paths to connect it all
Whichever method you use, 
it should enforce the categories previously defined.  
It should also include references to the appropriate images for each item. 

4

AboutUs.html dropdown, for the employes2Jquery.js

Modify the Informational to generate HTML from the above data source.  
Implement JS routine to load the data and generate the associated HTML 
for your web page (e.g., fill in the content of a <div> element).  


5

			AboutUs.html dropdown, for the employes2Jquery.js

The updated page must include a drop down control for selecting by category what data is to be viewed.  
For example, if a user wants to see only those employees in the Sales Dept, 
they will make the appropriate choice on the control and only those individual will be rendered.  
The drop box should also have a [default] ALL choice which will display everything.  
Rely on the data source to define the appropriate categories; these categories will be the basis for displaying a particular 
element or not.  Continue to use CSS for styling. 


					FORM		JQuery/javascript

1

formSkeletonXMLJquery.js did this

careate a new page
Create  a form.  
The purpose of this form is to compute the cost of some product, 
service or loan related to the business.  


2	``
  
  formSkeletonXMLJquery.js did this


You will use JS to implement this form.  
The inputs to the form need to be validated 
and the user alerted when there is an error.  
You have free license to improvise here, but the 
form must do some calculation that involves money ($).  
Some examples: 

a

formSkeletonXMLJquery.js did this


	The form the user to input the skeleton price, down payment, 
	interest rate and term.  When the form is filled out, 
	it will calculate the corresponding payment, including 
	the cumulative interest and total cost of the purchase 
	(original price + fees + tax + interest).   

b

   formSkeletonXMLJquery.js did this

	The form the user to input the skeleton price, down payment, 
	interest rate and term.  When the form is filled out, 
	it will calculate the corresponding payment, including 
	the cumulative interest and total cost of the purchase 
	(original price + fees + tax + interest)
c

	formSkeletonXMLJquery.js did this
	
	If the user is purchasing a service, the form will allow them to customize the parameters of that service.  
	Ultimately, the user will be able to change the parameters to meet their target cost. 
	All calculations done by the form must be correct.  
	It should also validate input data for errors. 

	
3
	I used Jquery at least 3 seperate times in these pages, the argument could be made for more, but I think it counts as three times.
	progress bar -> top of every page
	form -> market/cart
	about -> employee dropdown

You must use JQuery in at least one of these pages.  Ideally, you will use JQuery in the following three capacities:  
1) as JS shorthand, 2) to implement som visual effect, and 3) to perform some aspect of form processor or validation.  
Include a README file with your submission that briefly explains how you used JQuery.  The more substantial the use of JQuery, the better your grade. 

  
Submission:  Keep all project materials in a hierarchical directory structure.  
Create a zip file for the root directory (containing all subdirectories) and upload to D2L.   

TODO:
Due: 	Wednesday, Mar 15 

all done




  


 

  

  

##########
Previous ReadMe.txt (you can ignore this im going to keep adding to these so the readme becomes like a project brag document)
##########

William Friend
Program #2

Animations broken down:

with bootstrap css:
	on Both pages:
		the navbar becuse a clickable collapsed menu
		all buttuns change on hover

with javascript and css opacity and translations:
	on both pages:
		ScrollMagic css uses css properties opacity and translateX to make divs appear as you scroll.

with css keyframes:
	On the about page:
		in the dark box to the right of the pointing skeleton, or above if mobile, a button wiggles to get the users attention, with a little altering this could do all kinds of transfroms
		if I had more time could have switched translations and done alot of other cool ones.

window.onload= init;

// The contact manager as a global variable
let cm; 

function init() { 
	// create an instance of the contact manager
	cm = new ContactManager();
	
  	cm.addTestData();
  	cm.printContactsToConsole();

	  // Display contacts in a table
	  // Pass the id of the HTML element that will contain the table
      cm.displayContactsAsATable("contacts");
      
      // Add event listener to each trashbin img
      activeDeleteTrashbin();
}

function sortName() {
	cm.sortByName();
    cm.displayContactsAsATable("contacts");
    activeDeleteTrashbin();
}

function sortMail() {
	cm.sortByMail();
    cm.displayContactsAsATable("contacts");
    activeDeleteTrashbin();
}

//Foreach row active the deleteContact function onclick
function activeDeleteTrashbin() {
	var trashbinElts = document.getElementsByClassName("trashbinImgs");
	for (var i = 0; i < trashbinElts.length; i++) {
	  var trashbin = trashbinElts[i];
	  trashbin.addEventListener("click", deleteContact, true);
	}
}

function deleteContact(evt) {
	var contact = cm.listOfContacts[evt.target.dataset.contactId];
	cm.remove(contact);
    cm.displayContactsAsATable("contacts");
    activeDeleteTrashbin();
}

function formSubmitted() {
	// Get the values from input fields
	let name = document.querySelector("#name");
  	let email = document.querySelector("#email");
	let newContact = new Contact(name.value, email.value);
	cm.add(newContact);
	
	// Empty the input fields
	name.value = "";
	email.value = "";
	
	// refresh the html table
	cm.displayContactsAsATable("contacts");
	
	// do not let your browser submit the form using HTTP
	return false;
}

////dont work ... cannot display right content need to use displayContactAsaTable
function searchByName(){
    const searchBar = document.forms['searchName'].querySelector('input');
    searchBar.addEventListener('keyup',function(e){
        const term = e.target.value.toLowerCase(); //returns what is in the search bar
        console.log(term);
        const names = cm.listOfContacts;
        names.forEach(function(contact){
            var contacts=[];
            let name=contact.firstElementChild.textContent;
            if(name.toLowerCase().indexOf(term)!= -1){
                contact.style.display = 'block';
                contacts.push(name);
                cm.displayContactsAsATable("contacts");
                attachEventHandlers();
            } else { 
                contact.style.display = 'none';
                cm.displayContactsAsATable("contacts");
                attachEventHandlers();
            }
        })
    })

}

function emptyList() {
	cm.empty();
  	cm.displayContactsAsATable("contacts");
}

function loadList() {
	cm.load();
  	cm.displayContactsAsATable("contacts");
}
class Contact {
	constructor(name, email) {
		this.name = name;
		this.email = email;
	}
}

class ContactManager {
	constructor() {
		// when we build the contact manager, it
		// has an empty list of contacts
		this.listOfContacts = [];
	}
	
	addTestData() {
		var c1 = new Contact("Jimi Hendrix", "jimi@rip.com");
  		var c2 = new Contact("Robert Fripp", "robert.fripp@kingcrimson.com");
  		var c3 = new Contact("Angus Young", "angus@acdc.com");
  		var c4 = new Contact("Arnold Schwarzenneger", "T2@terminator.com");
		
		this.add(c1);
		this.add(c2);
		this.add(c3);
		this.add(c4);
		
		// Let's sort the list of contacts by Name
		//this.sortByName();
	}	
	
	// Will erase all contacts
	empty() {
		this.listOfContacts = [];
	}
	
	add(contact) {
		this.listOfContacts.push(contact);
	}
	
	remove(contact) {
		for(let i = 0; i < this.listOfContacts.length; i++) { 
			var c = this.listOfContacts[i];

			if(c.email === contact.email) {
				// remove the contact at index i
				
				this.listOfContacts.splice(i, 1);		

				// stop/exit the loop
				break;
			}
		}
	}
	
	sortByName() {
		// As our array contains objects, we need to pass as argument
		// a method that can compare two contacts.
		// we use for that a class method, similar to the distance(p1, p2)
		// method we saw in the ES6 Point class in module 4
		// We always call such methods using the name of the class followed
		// by the dot operator
		this.listOfContacts.sort(ContactManager.compareByName);
	}

	sortByMail() {
		this.listOfContacts.sort(ContactManager.compareByMail);
	}
	
	// class method for comparing two contacts by name
	static compareByName(c1, c2) {
		// JavaScript has builtin capabilities for comparing strings
		// in alphabetical order
		if (c1.name < c2.name)
     		return -1;
		
    	if (c1.name > c2.name)
     		return 1;
  
    	return 0;
	}

	// class method for comparing two contacts by email
	static compareByMail(c1, c2) {
		if (c1.email < c2.email)
			return -1;

		if (c1.email > c2.email)
			return 1;

		return 0;
	}
	
	printContactsToConsole() {
		this.listOfContacts.forEach(function(c) {
			console.log(c.name);
		});
	}
	
	load() {
		if(localStorage.contacts !== undefined) {
			// the array of contacts is savec in JSON, let's convert
			// it back to a reak JavaScript object.
			this.listOfContacts = JSON.parse(localStorage.contacts);
		}
	}
	
	save() {
		// We can only save strings in local Storage. So, let's convert
		// ou array of contacts to JSON
		localStorage.contacts = JSON.stringify(this.listOfContacts);
	} 
	

  	displayContactsAsATable(idOfContainer) {
		// empty the container that contains the results
    	let container = document.querySelector("#" + idOfContainer);
    	container.innerHTML = "";

		
		if(this.listOfContacts.length === 0) {
			container.innerHTML = "<p>No contacts to display!</p>";
			// stop the execution of this method
			return;
		}  
  
    	// creates and populate the table with users
		var table = document.createElement("table");


		// insert Header
		var headerRow = table.insertRow();
		headerRow.innerHTML = "<th onclick=\"sortName()\">" + "Name" + "</th><th onclick=\"sortMail()\">" + "Mail" + "</th>";


    	// iterate on the array of users
    	this.listOfContacts.forEach(function(currentContact, index) {
        	// creates a row
			var row = table.insertRow();
			
			// create the img of the trash bin
			let trashbin = document.createElement("img");
			trashbin.src = "http://i.imgur.com/yHyDPio.png";
			trashbin.dataset.contactId = index;
			trashbin.style.setProperty("cursor", "pointer"); // ds le css ou href
			trashbin.className = "trashbinImgs";
			

			row.innerHTML = "<td>" + currentContact.name + "</td>"
							+ "<td>" + currentContact.email + "</td>" 
							+ "<td>" + trashbin.outerHTML + "</td>";  
							
     	});
  
     	// adds the table to the div
		 container.appendChild(table);
	  }
	
	  
}
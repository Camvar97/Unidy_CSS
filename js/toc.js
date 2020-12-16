// Grab the ToC Element
toc = document.getElementById("ToC");

// Generate ToC
tocCard = document.createElement("div");
tocCard.setAttribute("class", "card");
tocCardHeader = document.createElement("div");
tocCardHeader.setAttribute("class", "card-header");
tocCardHeaderTitle = document.createElement("p");
tocCardHeaderTitle.setAttribute("class", "card-header-title");
tocCardHeaderTitle.innerText = "On This Page";

// Get the headers
headers = document.getElementsByTagName("h2");

// Make a list
tocList = document.createElement("ul");
tocList.setAttribute("class", "list-group");

for (i=0;i<headers.length;i++){
    // Give headings a name
    name = "h"+i;
    headers[i].id = name;

    // Generate the links
    tocEntry = document.createElement("a");
    tocEntry.setAttribute("href","#"+name);
    tocEntry.setAttribute("class", "list-group-item");
    tocEntry.innerText=headers[i].innerText;
    tocList.appendChild(tocEntry);
}

// Build ToC
toc.appendChild(tocCard);
tocCard.appendChild(tocCardHeader); 
tocCardHeader.appendChild(tocCardHeaderTitle);  
tocCard.appendChild(tocList); 
function getElementsByTagNames(list,obj) {
	if (!obj) var obj = document;
	var tagNames = list.split(',');
	var resultArray = new Array();
	for (var i=0;i<tagNames.length;i++) {
		var tags = obj.getElementsByTagName(tagNames[i]);
		for (var j=0;j<tags.length;j++) {
			resultArray.push(tags[j]);
		}
	}
	var testNode = resultArray[0];
	if (!testNode) return [];
	if (testNode.sourceIndex) {
		resultArray.sort(function (a,b) {
				return a.sourceIndex - b.sourceIndex;
		});
	}
	else if (testNode.compareDocumentPosition) {
		resultArray.sort(function (a,b) {
				return 3 - (a.compareDocumentPosition(b) & 6);
		});
	}
	return resultArray;
}

function tocEntryGen(name, innerText, tocList, span=false) {
    tocEntry = document.createElement("a");
    tocEntry.setAttribute("href","#"+name);
    tocEntry.setAttribute("class", "list-group-item");
    
    if (span) {
        tocEntrySpan = document.createElement("span");
        tocEntrySpan.setAttribute("class", "list-group-item-sub");
        tocEntrySpan.innerText=headers[i].innerText;
        tocEntry.appendChild(tocEntrySpan);
    } else {
        tocEntry.innerText=innerText;
    }
    tocList.appendChild(tocEntry);
}

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
headers = getElementsByTagNames("h2,h3");

// Make a list
tocList = document.createElement("ul");
tocList.setAttribute("class", "list-group");

currentHeading = 0;
currentSubHeading = 0;

for (i=0;i<headers.length;i++){
    // Give headings a name
    currentHeading++;
    currentSubHeading = 0;
    name = "h"+currentHeading;
    headers[i].id = name;

    // Check if next heading is nested
    if(i+1 <= headers.length){
        if(i+1 == headers.length) {
            // Generate the links
            tocEntry = tocEntryGen(name, headers[i].innerText, tocList);
        }
        else if(headers[i+1].tagName == "H3") {
            tocSub = document.createElement("ul");
            tocSub.setAttribute("class","list-group-item flexwrap-col");
            tocEntry = tocEntryGen(name, headers[i].innerText, tocSub);
            tocList.appendChild(tocSub);
            while(headers[i+1].tagName == "H3"){
                i++;
                currentSubHeading++;
                name = "h"+currentHeading+"-"+currentSubHeading;
                headers[i].id = name;
                tocEntry = tocEntryGen(name, headers[i].innerText, tocSub, true);
                if(i+1>=headers.length){
                    break;
                }
            }
        } else {
            // Generate the links
            tocEntry = tocEntryGen(name, headers[i].innerText,tocList);
        }
    }
}

// Build ToC
toc.appendChild(tocCard);
tocCard.appendChild(tocCardHeader); 
tocCardHeader.appendChild(tocCardHeaderTitle);  
tocCard.appendChild(tocList); 
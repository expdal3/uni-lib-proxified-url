//*************************************************************** */
//|Chrome extension to change current tab's URL into school
//|school's library proxy URL --> quickly access research articles
//|
//| Upon changed URL, school will prompt user to login using their 
//| respective username and password
//**************************************************************** */
// Link to regex editor
// https://regex101.com/r/GQkvsW/1

console.log("Deakin Proxy URL modifier");
let tabUrl = "";
let tabTitle = "";

// >>> Create new RegExp object for the domainpart
let re = new RegExp('\/\/[A-Za-z\.]*\/');
let schoolProxyDomain = ".ezproxy-f.deakin.edu.au";

chrome.browserAction.onClicked.addListener(function(tab) {
    tabUrl = tab.url;
    tabTitle = tab.title;
    let match = re.exec(tabUrl);

    // console.log(tabUrl + tabTitle);
    // console.log(match);
    // >>>Extract the // ..../ part and the articlePart
    let domainPart = match[0].substring(2, match[0].length - 1);
    let articlePart = tabUrl.slice(match.index + domainPart.length + 2, tabUrl.length);
    console.log(articlePart);

    // >>>find and replace all "." into "-"
    let dot1 = domainPart.indexOf("."),
        dot2 = domainPart.indexOf(".", dot1 + 1);
    console.log(dot1, " ", dot2);
    let lookupstr = ".";
    let replacestr = "-";
    let newdomain = domainPart.replaceAt(dot1, replacestr);
    newdomain = newdomain.replaceAt(dot2, replacestr) + schoolProxyDomain;
    // console.log(domainPart);
    // console.log(newdomain);

    var myNewUrl = "https://" + newdomain + articlePart;
    chrome.tabs.update(tab.id, { url: myNewUrl });
});
// TESTING LINK
// https://www.sciencedirect.com/science/article/pii/S0929119916300244


String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
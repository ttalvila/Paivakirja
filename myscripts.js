// Global variables
var tbl;
var errors=['Ready','Input field is empty', 'Input length must be at least 10 characters','Input contains non-word characters'];
var status=0;
window.onload=initPage;
// Run this on page load
function initPage () {
    status=0;
    var input=document.getElementsByTagName('input')[0];
    document.getElementsByTagName('label')[0].innerHTML=errors[status];
    input.value = 'Write a new message here';
    input.onfocus=function () {this.value='';setbgI('#e5fff3');}
    input.onblur=function () {setbgI('white');}
    tbl=document.getElementById('FamilyDiary');
}
// Get date and time localized or not
function getLocalDateTime(lang) {
	status=0;
	document.getElementsByTagName('label')[0].innerHTML=errors[status];
	if (lang!='FI') return new Date().toString();
	else return new Date().toLocaleDateString()+' klo '+	new Date().toLocaleTimeString();
}
// Add new message row to table
function addMessage(e)
{
    var input=e.parentNode.getElementsByTagName('input')[0];
    input.onfocus=function () {setbgI('#e5fff3');};
    if (validateInput(document.forms.myform.msg.value)) {
        var thedate = getLocalDateTime();
    	var node=tbl.childNodes[2];
    	var tr=document.createElement('tr');
    	var td1=document.createElement('td');
    	var td2=document.createElement('td');
    	var td3=document.createElement('td');
        var td4=document.createElement('td');
    	var txt1=document.createTextNode(thedate);
    	var txt2=document.createTextNode(document.forms.myform.msg.value);
    	var txt3=document.createElement('input');
        var txt4=document.createElement('input');
    	txt3.setAttribute('type','button');
    	txt3.setAttribute('value','Remove message');
        tr.setAttribute('name','0');
    	var nbrows=tbl.childNodes.length;
    	txt3.setAttribute('id',nbrows);
        txt3.setAttribute('onclick','removeRow(this)');
        txt4.setAttribute('type','button');
        txt4.setAttribute('value','Add comment');
        txt4.setAttribute('id',nbrows);
        txt4.setAttribute('onclick','addCommentBox(this)');
    	td1.appendChild(txt1);
    	td2.appendChild(txt2);
    	td3.appendChild(txt3);
        td3.appendChild(txt4);
        var br=document.createElement('br');
        td3.appendChild(br);
        var txt5=document.createTextNode('Comments: 0');
        var label=document.createElement('label');
        label.appendChild(txt5);
        td3.appendChild(label);
    	tr.appendChild(td1);
    	tr.appendChild(td2);
    	tr.appendChild(td3);
    	tbl.insertBefore(tr,node);
        input.value='Write a new message here';setbgI('#e5fff3');
        input.onfocus=function () {this.value='';setbgI('#e5fff3');}
    } else {
        document.getElementsByTagName('label')[0].innerHTML=errors[status];
    }
}
// Add textarea comment box to table
function addCommentBox (e) {
        var tr=document.createElement('tr');
        var td=document.createElement('td');

        var txt=document.createElement('textarea');
        var brk=document.createElement('br');
        var guidance=document.createTextNode('Write new comment here ');
        var label=document.createElement('label');
        txt.setAttribute('id','styled');
        txt.setAttribute("onfocus","this.value='';setbg('#e5fff3')");
        txt.setAttribute("onblur","setbg('white')");
        txt.appendChild(guidance);
        td.appendChild(txt);
        td.appendChild(brk);
        td.appendChild(label);
        td.setAttribute('colspan','2');
        td.setAttribute('class','comment');
        tr.setAttribute('class','comment');
        tr.appendChild(td);
        // Save
        var td2=document.createElement('td');
        var txt2=document.createElement('input');
        txt2.setAttribute('onclick','addComment(this)');
        txt2.setAttribute('type','button');
        txt2.setAttribute('value','Save comment');
        // Cancel
        var txt3=document.createElement('input');
        txt3.setAttribute('onclick','removeCommentBox(this)');
        txt3.setAttribute('type','button');
        txt3.setAttribute('value','Cancel');

        td2.appendChild(txt2);
        td2.appendChild(txt3);
        tr.appendChild(td2);
        
        var node=e.parentNode.parentNode.nextSibling;
        tbl.insertBefore(tr,node);
        txt2.focus();
}
// Add new comment row to table
function addComment(e) {
        // Search parent message
        var textarea=e.parentNode.previousSibling.childNodes[0];
        var msgparent=textarea.parentNode.parentNode.previousSibling;
        while (msgparent.getAttribute('name') == null) {
            msgparent = msgparent.previousSibling;
        }
        var comment=textarea.value;
        textarea.onfocus=function () {setbg('#e5fff3');}
        if (validateInput(comment)) {
            var tr=document.createElement('tr');
            // Date
            var txt=document.createTextNode(getLocalDateTime());
            var td=document.createElement('td');
            td.setAttribute('class','comment');
            td.appendChild(txt);
            tr.appendChild(td);
            // Comment
            var id=e.id;
            var td2=document.createElement('td');
            var txt2=document.createTextNode(comment);
            td2.setAttribute('class','comment');
            td2.appendChild(txt2);
            td2.setAttribute('colspan','1');
            tr.appendChild(td2);
            // Remove button
            var td3=document.createElement('td');
            var txt3=document.createElement('input');
            txt3.setAttribute('onclick','removeComment(this)');
            txt3.setAttribute('type','button');
            txt3.setAttribute('value','Remove comment');
            td3.setAttribute('class','comment');
            td3.appendChild(txt3);
            tr.setAttribute('class','comment');
            tr.appendChild(td3);
            updateNbOfComments(msgparent,'add');

            var node=e.parentNode.parentNode;
            tbl.insertBefore(tr,node);
            tbl.removeChild(e.parentNode.parentNode);
        } else {
            e.parentNode.previousSibling.getElementsByTagName('label')[0].innerHTML=errors[status];
        }
}
// Remove a single comment from table
function removeComment(e) {
    var msgparent = e.parentNode.parentNode.previousSibling
    while (msgparent.getAttribute('name') == null) {
        msgparent = msgparent.previousSibling;
    }
    updateNbOfComments(msgparent, 'subtract');
    tbl.removeChild(e.parentNode.parentNode);
}
// Remove a single comment box from table (cancel)
function removeCommentBox(e) {
    tbl.removeChild(e.parentNode.parentNode);
}
// Update nb of comments of parent message
function updateNbOfComments (msgrow, action) {
     var name=msgrow.getAttribute('name');
     if (action == 'add') name++;
     else name--;
     msgrow.setAttribute('name',name);
     var label=msgrow.getElementsByTagName('label')[0];
     label.innerHTML='Comments: '+name;
}
// Remove message and all its related comments
function removeRow(e) {
    var msgrow=e.parentNode.parentNode;
    while ((msgrow.nextSibling!=null) && (msgrow.nextSibling.className=='comment')) {
        tbl.removeChild(msgrow.nextSibling);
    }
    tbl.removeChild(e.parentNode.parentNode);
}
// Validate user input
function validateInput (data) {
    var x=data;
    // Pattern: find non-word characters
    var patt2=/[^a-z A-Z.,;'0-9]/;
    if (x==null || x=="") {status=1; return false;}
    else if (x.length<10) {status=2;return false;}
    else if (patt2.test(x)) {status=3;return false}
    else {status=0;return true;}
}
// Set textarea bg color
function setbg(color)
{
    document.getElementById("styled").style.background=color;
}
// Set input bg color
function setbgI(color)
{
    document.getElementsByTagName("input")[0].style.background=color;
}
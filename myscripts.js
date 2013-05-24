window.onload=getDate;
function getDate() {
	var t= new Date();
	document.forms.myform.mydate.value=t.toLocaleDateString()+' klo '+
	t.toLocaleTimeString();
}
function doSomething()
{
        var thedate = new Date();
	var tbl=document.getElementById('FamilyDiary');
	var node=document.getElementById("FamilyDiary").childNodes[2];
	var tr=document.createElement('tr');
	var td1=document.createElement('td');
	var td2=document.createElement('td');
	var td3=document.createElement('td');
	var txt1=document.createTextNode(thedate);
	var txt2=document.createTextNode(document.forms.myform.msg.value);
	var txt3=document.createElement('input');
	txt3.setAttribute('type','button');
	txt3.setAttribute('value','Remove');
	td1.appendChild(txt1);
	td2.appendChild(txt2);
	td3.appendChild(txt3);
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tbl.insertBefore(tr,node);
	getDate();
}

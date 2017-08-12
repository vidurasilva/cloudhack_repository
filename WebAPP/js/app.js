(function () {
	

    var config = {
    apiKey: "AIzaSyCSj-jVO6HQ_R8OMvw7mrOgsqA8NMOjbW4",
    authDomain: "driverproject-4e877.firebaseapp.com",
    databaseURL: "https://driverproject-4e877.firebaseio.com",
    projectId: "driverproject-4e877",
    storageBucket: "driverproject-4e877.appspot.com",
    messagingSenderId: "770069703401"
  };
  firebase.initializeApp(config);

   //get elements

   const preObject = document.getElementById('object');
   const ulList1 = document.getElementById('list1');
   const ulListal = document.getElementById('listal');

   const id1 = document.getElementById('id1');
   const vehicle1 = document.getElementById('vehicle1');

    const ulList2 = document.getElementById('list2');
    const d1div = document.getElementById('d1div');
    const d2div = document.getElementById('d2div');
    const smokestat1 = document.getElementById('smokestat1');
    const smokestat2 = document.getElementById('smokestat2');

    const id2 = document.getElementById('id2');
   const vehicle2 = document.getElementById('vehicle2');
 


   //create reference

   const dbRefObject1 = firebase.database().ref().child('Driver1');
   const dbRefList1 = dbRefObject1.child('Smoke');
   const dbRefListal = dbRefObject1.child('Alcohol');
   const d1name = dbRefObject1.child('Name');
   const status1 = dbRefObject1.child('Status');
    const iddriver1 = dbRefObject1.child('Id');
    const vehicledriver1 = dbRefObject1.child('Vehicle');


   const dbRefObject2 = firebase.database().ref().child('Driver2');
   const dbRefList2 = dbRefObject2.child('Smoke');
   const d2name = dbRefObject2.child('Name');
   const status2 = dbRefObject2.child('Status');
    const iddriver2 = dbRefObject2.child('Id');
    const vehicledriver2 = dbRefObject2.child('Vehicle');
 
  

   // sync object chages 

 
   dbRefObject1.on('value', snap => {
   	preObject.innerText = JSON.stringify(snap.val(), null, 3);
   });

   // sync list changes

   //driver 1 name

   d1name.on('value', snap => {

   	const h1 = document.createElement('h1');
   	h1.innerText = snap.val();
   	h1.id = snap.key;
   	d1div.appendChild(h1);

   });

   //driver 1 id

   iddriver1.on('value', snap => {

    const h1 = document.createElement('h1');
    h1.innerText = snap.val();
    h1.id = snap.key;
    id1.appendChild(h1);

   });

   //driver 1 vehicle

   vehicledriver1.on('value', snap => {

    const h1 = document.createElement('h1');
    h1.innerText = snap.val();
    h1.id = snap.key;
    vehicle1.appendChild(h1);

   });


//smoke alcho state
    status1.on('child_added', snap => {

   	const li = document.createElement('li');
   	li.innerText = snap.val();
   	li.id = snap.key;
   	smokestat1.appendChild(li);

   });

    status1.on('child_changed', snap => {

   	const lichanged = document.getElementById(snap.key);
   	lichanged.innerText = snap.val();
   	if (snap.val()=='yes') {
   		alert("smoking");
   	}

   });

    
//smoke dates
   dbRefList1.on('child_added', snap => {

   	const li = document.createElement('li');
   	li.innerText = snap.key;
   	li.id = snap.key;
   	ulList1.appendChild(li);

   });

//alchohol dates
    dbRefListal.on('child_added', snap => {

    const li = document.createElement('li');
    li.innerText = snap.key;
    li.id = snap.key;
    ulListal.appendChild(li);

   });

//driver 2
   d2name.on('value', snap => {

   	const h1 = document.createElement('h1');
   	h1.innerText = snap.val();
   	h1.id = snap.key;
   	d2div.appendChild(h1);

   });

   iddriver2.on('value', snap => {

    const h1 = document.createElement('h1');
    h1.innerText = snap.val();
    h1.id = snap.key;
    id2.appendChild(h1);

   });

   vehicledriver2.on('value', snap => {

    const h1 = document.createElement('h1');
    h1.innerText = snap.val();
    h1.id = snap.key;
    vehicle2.appendChild(h1);

   });

   status2.on('child_added', snap => {

   	const li = document.createElement('li');
   	li.innerText = snap.val();
   	li.id = snap.key;
   	smokestat2.appendChild(li);

   });

 


   dbRefList2.on('child_added', snap => {

   	const li = document.createElement('li');
   	li.innerText = snap.key;
   	li.id = snap.key;
   	ulList2.appendChild(li);

   });

    
 
}());
(function () {
	

  const config = {
    apiKey: "AIzaSyBjBD4Y1S5SOmPxD-vukHygJjRzlDJy_P8",
    authDomain: "myapp-7c83a.firebaseapp.com",
    databaseURL: "https://myapp-7c83a.firebaseio.com",
    projectId: "myapp-7c83a",
    storageBucket: "myapp-7c83a.appspot.com",
    messagingSenderId: "322503286044"
  };
  firebase.initializeApp(config);

   //get elements

   const preObject = document.getElementById('object');
   const ulList1 = document.getElementById('list1');
    const ulList2 = document.getElementById('list2');
    const d1div = document.getElementById('d1div');
    const d2div = document.getElementById('d2div');
    const smokestat1 = document.getElementById('smokestat1');
    const smokestat2 = document.getElementById('smokestat2');
 


   //create reference

   const dbRefObject1 = firebase.database().ref().child('driver1');
   const dbRefList1 = dbRefObject1.child('smoke');
   const d1name = dbRefObject1.child('name');
   const status1 = dbRefObject1.child('status');

   const dbRefObject2 = firebase.database().ref().child('driver2');
   const dbRefList2 = dbRefObject2.child('smoke');
   const d2name = dbRefObject2.child('name');
   const status2 = dbRefObject1.child('status');
 
  

   // sync object chages 

 
   dbRefObject1.on('value', snap => {
   	preObject.innerText = JSON.stringify(snap.val(), null, 3);
   });

   // sync list changes

   //driver 1

   d1name.on('value', snap => {

   	const h1 = document.createElement('h1');
   	h1.innerText = snap.val();
   	h1.id = snap.key;
   	d1div.appendChild(h1);

   });

    status1.on('child_added', snap => {

   	const li = document.createElement('li');
   	li.innerText = snap.val();
   	li.id = snap.key;
   	smokestat1.appendChild(li);

   });



    /*d1smoke.on('value', snap => {

   	const h3 = document.getElementById(snap.val());
   	h3.innerText = snap.val();
   
   });*/

    

   dbRefList1.on('child_added', snap => {

   	const li = document.createElement('li');
   	li.innerText = snap.key;
   	li.id = snap.key;
   	ulList1.appendChild(li);

   });

//driver 2
   d2name.on('value', snap => {

   	const h1 = document.createElement('h1');
   	h1.innerText = snap.val();
   	h1.id = snap.key;
   	d2div.appendChild(h1);

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
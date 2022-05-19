async function addTable() {
    /*
    // to send other type of requests

    const DATA={
        user:"name",
        id"21
    }

    //optional params
    const otherParams={
        headers:{
            "content-type":"application/json; charset=UTF-8"
        },
        body:DATA,
        method:"POST"
    }

    */

    // to add new user / update user last_access information

    const DATA={
        sess:"8",
        endtime:"1652799049"
    }

    // const otherParams={
    //     headers:{
    //         "content-type":"application/json; charset=UTF-8"
    //     },
    //     body:JSON.stringify(DATA),
    //     method:"POST"
    // }

    // to get all registered users information

    const otherParams = {
        headers:{
        "content-type":"application/json; charset=UTF-8"
        },
        method:"GET"
    }

    // // to get users info from db
    response = await fetch("https://rest-api-webapp-test-2gwayab7qq-oc.a.run.app/users", otherParams);
    resp_json = await response.json();

    // how many users we got
    rows =  resp_json.length;

    var myTableDiv = document.getElementById("myDynamicTable");
      
    var table = document.createElement('TABLE', );
    table.border='1';
    
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    //header of the table
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
    
    // add user info in table
    var td = document.createElement('TH');
    //td.width=auto;
    td.appendChild(document.createTextNode("Name"));
    tr.appendChild(td);

    var td = document.createElement('TH');
    //td.width=auto;
    td.appendChild(document.createTextNode("Surname"));
    tr.appendChild(td);

    var td = document.createElement('TH');
    //td.width=auto;
    td.appendChild(document.createTextNode("E-mail"));
    tr.appendChild(td);

    debugger;

    var td = document.createElement('TH');
    // td.width=auto;
    td.appendChild(document.createTextNode("Last Access"));
    tr.appendChild(td);

    // fill the table
    for (var i=0; i<rows; i++){

        user = resp_json[i]
        // add new table row
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);
       
        // add user info in table
        var td = document.createElement('TD');
        //td.width=auto;
        td.appendChild(document.createTextNode(user.name));
        tr.appendChild(td);

        var td = document.createElement('TD');
        //td.width=auto;
        td.appendChild(document.createTextNode(user.surname));
        tr.appendChild(td);

        var td = document.createElement('TD');
        //td.width=auto;
        td.appendChild(document.createTextNode(user.email));
        tr.appendChild(td);

        var td = document.createElement('TD');
        
        // conversion of last_access timestamp in date format
        // conversion of end_time of the session in datetime format
        const unixTimestamp = user.last_access
        const milliseconds = unixTimestamp * 1000 
        const  dateObject = new Date(milliseconds)
        const humanDateFormat = dateObject.toLocaleString()

        td.appendChild(document.createTextNode(humanDateFormat));
        tr.appendChild(td);
       
    }
    myTableDiv.appendChild(table);
    
}

var user_to_search;
var prev_elems = 0;


// function submitMe() {
//     var value = document.getElementById('test').value;
//     user_to_search = value;
//     // alert(user_to_search)
//     addSessionTable()
// }

async function addSessionTable() {

    // optional params to get users sessions
    // still need a header
    // still need a method type GET
    const otherParams = {
        headers:{
        "content-type":"application/json; charset=UTF-8"
        },
        method:"GET"
    }

    user_to_search = document.getElementById("user_email").value;
    // debugger;
    // // to get users info from db
    response = await fetch("https://rest-api-webapp-test-2gwayab7qq-oc.a.run.app/getSessions/"+user_to_search, otherParams);
    resp_json = await response.json();

    // how many users we got
    rows =  resp_json.length;

    var myTableDiv = document.getElementById("userSessionDynamicTable");

    var rowCount = prev_elems;
    var table = document.createElement('TABLE', );
    for (var i = rowCount; i > 0; i--) {
        table.deleteRow(i);

    }


    
    table.border='1';
    
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    //header of the table
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
    
    // add user info in table
    var td = document.createElement('TH');
    //td.width=auto;
    td.appendChild(document.createTextNode("Session ID"));
    tr.appendChild(td);

    var td = document.createElement('TH');
    
    //td.width=auto;
    td.appendChild(document.createTextNode("Start"));
    tr.appendChild(td);

    var td = document.createElement('TH');
    //td.width=auto;
    td.appendChild(document.createTextNode("End"));
    tr.appendChild(td);

    var td = document.createElement('TH');
    // td.width=auto;
    td.appendChild(document.createTextNode("Counted MSE"));
    tr.appendChild(td);

    // fill the table
    prev_elems = rows;
    for (var i=0; i<rows; i++){

        user = resp_json[i]
        // add new table row
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);
       
        // add user info in table
        var td = document.createElement('TD');
        //td.width=auto;
        td.appendChild(document.createTextNode(user.id_session));
        tr.appendChild(td);

        var td = document.createElement('TD');
        
        // conversion of timestamp in date format
        var unixTimestamp = user.start_time
        var milliseconds = unixTimestamp * 1000 
        var dateObject = new Date(milliseconds)
        var humanDateFormat = dateObject.toLocaleString()

        td.appendChild(document.createTextNode(humanDateFormat));
        tr.appendChild(td);

        var td = document.createElement('TD');
        
        // conversion of end_time of the session in datetime format
        unixTimestamp = user.end_time
        milliseconds = unixTimestamp * 1000 
        dateObject = new Date(milliseconds)
        humanDateFormat = dateObject.toLocaleString()

        td.appendChild(document.createTextNode(humanDateFormat));
        tr.appendChild(td);

        var td = document.createElement('TD');
        // td.width=auto;
        td.appendChild(document.createTextNode(user.MSE));
        tr.appendChild(td);
       
    }
    myTableDiv.appendChild(table);
    
}
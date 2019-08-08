
function getPatients(){

    // alert("working");
    
    $.ajax({
        url: 'http://localhost:5000/api/healthP/1/patients',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded',   
        dataType: 'json',  
        success: function( data, textStatus, jQxhr ){
            // alert(JSON.stringify(data.patients[0]) );
            
            // $(data).appendTo('.task-list ul').hide().fadeIn();

            for (i = 0; i<data.patients.length; i++){
                var patientData = `<tr><td>`+data.patients[0].FName+`</td>
                                    <td>`+data.patients[0].SName+`</td>
                                    <td>`+data.patients[0].FName+`</td>
                                    <td>`+data.patients[0].Dob+`</td>
                                    <td><button type="button" class="btn btn-info style="width:100%;" onclick="viewPatient(`+data.patients[i].PatientID+`)">View Patient</button></td>`;
                $("#dataTable tbody").append(patientData);
            }
        },
        error: function( jqXhr, textStatus, errorThrown ){
            alert("error");
        }
    });

    e.preventDefault();
};
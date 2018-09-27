var update = false;
document.onload = $("#jForm").hide();
document.onload = $.get("api/all-jobs", function(data){
    update = false;
    for(i = data.length - 1; i > -1; i--){
        $("#jobTable").append(`<tr id='job ${data[i].id}'> <td>${data[i].jobTitle}</td> <td>${data[i].company}</td> <td>${data[i].location}</td> <td>${data[i].dateApplied}</td> <td>${data[i].status}</td> <td>${data[i].contactInfo}</td> <td class='truncated'><div class='truncateBody'><a href='${data[i].url}' target='_blank'>${data[i].url}</a></div></td> <td><button type='button' class='btn btn-default btn-xs' id='${data[i].id}'><span class='glyphicon glyphicon-cog' aria-hidden="true"></span></td> </tr>`)
    }
});

$("#newJob").on("click", function(event){
    event.preventDefault();
    $("#jForm").show();
    $("#newJob").hide();
});

$("#cancel").on("click", function(event){
    event.preventDefault();
    $("#jForm").hide();
    $("#newJob").show();
    $("#jobTitle").val('');
    $("#company").val('');
    $("#location").val('');
    $("#status").val('');
    $("#contact").val('');
    $("#url").val('');
    $("#subButton").html("Submit");
    $("#postJob").html("Post New Job:")
    update = false;
    $("#url").removeAttr('disabled');
});

$("#jForm").submit(function(event){
    event.preventDefault();

    var job = {
        jobTitle: $("#jobTitle").val(),
        company: $("#company").val(),
        location: $("#location").val(),
        status: $("#status").val(),
        contactInfo: $("#contact").val(),
        url: $("#url").val()
        }

    if(update === false){
        $.post("api/new-job", job).then(function(response){
            location.reload();
    })
  }
    else{
        $.ajax({
            url: `api/job/${job.url}`,
            type: "PUT",
            data: job,
            success: function(response){
                location.reload();
            }
        })
  };   

});

$("#jobTable").on("click", ".btn.btn-default.btn-xs", function(){
    update = true;
    var jobID = $(this).attr("id")
    $.get(`api/jobs/${jobID}`, function(data){
        console.log(data)
        $("#jForm").show();
        $("#newJob").hide();
        window.scrollTo(0,0);

        $("#jobTitle").val(data.jobTitle)
        $("#company").val(data.company)
        $("#location").val(data.location)
        $("#status").val(data.status)
        $("#contact").val(data.contactInfo)
        $("#url").val(data.url)

        $("#url").attr('disabled','disabled');
        $("#subButton").html("Update")
        $("#postJob").html("Update Job:")
    })
});
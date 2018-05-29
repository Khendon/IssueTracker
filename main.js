document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueSeverity = document.getElementById('issueSeverityInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    let issueId = chance.guid();
    let issueStatus = 'Open';

    let issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if (localStorage.getItem('issues') === null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputform').requestFullscreen();

    fetchIssues();

    e.preventDefault();
}

function fetchIssues(){
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesListe = document.getElementById('issuesList');
  
    issuesList.innerHTML = '';
  
    for (let i = 0; i < issues.length; i++) {
      let id = issues[i].id;
      let desc = issues[i].description;
      let severity = issues[i].severity;
      let assignedTo = issues[i].assignedTo;
      let status = issues[i].status;
  
      issuesList.innerHTML +=   '<div class="card">'+
                                '<div class="card-body">'+
                                '<p class="h4">' + desc + '    <span class="badge badge-pill badge-info">' + status + '</span></p>'+
                                '<p class="font-italic">Issue ID: ' + id + '</p>'+                                
                                '<p><i class="fas fa-stopwatch"></i> ' + severity + '</p>'+
                                '<p><i class="fas fa-user"></i> ' + assignedTo + '</p>'+
                                '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                                '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                                '</div>'+
                                '</div>';
    }
}
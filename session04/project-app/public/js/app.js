// Token
let access_token          = null;
// Forms
let loginform             = document.querySelector('#loginform');
let signupform            = document.querySelector('#signupform');
let projectform           = document.querySelector('#projectform');
// Login Fields
let login_email           = document.querySelector('#login_email');
let login_password        = document.querySelector('#login_password');
// Register Fields
let name                  = document.querySelector('#name');
let email                 = document.querySelector('#email');
let password              = document.querySelector('#password');
let password_confirmation = document.querySelector('#password_confirmation');
// Project Form
let project_name          = document.querySelector('#project_name');
let project_budget        = document.querySelector('#project_budget');
let project_startdate     = document.querySelector('#project_startdate');
let project_duration      = document.querySelector('#project_duration');
let project_numemployees  = document.querySelector('#project_numemployees');
// Project Others
let projectlist           = document.querySelector('#projectlist');
let project_id            = document.querySelector('#project_id');
let project_method        = document.querySelector('#project_method');
// NavBar
let navbar                = document.querySelector('.navbar');
let user_email            = document.querySelector('#user_email');

// Login
const logIn = () => {
    let userdata      = {};
    userdata.email    = login_email.value;
    userdata.password = login_password.value;
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userdata),
    })
    .then(response => response.json())
    .then(data     => {logInAfter(data);});
    return false; 
}
const logInAfter = (data) => {
    if (data.user) access_token = data.access_token;
    if (access_token) {
        initForms();
        localStorage.setItem('user_email', data.user.email);
        localStorage.setItem('user_token', access_token);
        user_email.innerText      = localStorage.getItem('user_email');
        loginform.style.display   = 'none';
        projectform.style.display = 'block';
        navbar.style.display      = 'block';
        getProjects();
    }
}

const closeSession = () => {
    if (localStorage.getItem('user_email') !== null) {
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_token');
        window.location.replace('./');
    }
}

// Show Register User
const registUser = () => {
    loginform.style.display  = 'none';
    signupform.style.display = 'block';
}

// Sign Up
const signUp = () => {
    let userdata                   = {};
    userdata.name                  = name.value;
    userdata.email                 = email.value;
    userdata.password              = password.value;
    userdata.password_confirmation = password_confirmation.value;
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userdata),
    })
    .then(response => response.json())
    .then(data     => {
        if (data.user) {
            initForms();
            loginform.style.display  = 'block';
            signupform.style.display = 'none';
        } 
    });
    return false;
}

// Close Register User
const closeRegist = () => {
    initForms();
    loginform.style.display  = 'block';
    signupform.style.display = 'none';
}

// Get Projects
const getProjects = () => {
    fetch('/api/projects', {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + access_token,
        }
    })
    .then(response => response.json())
    .then(data     => {showProjects(data.projects);});
}

// Show Projects
const showProjects = (projects) => {
    //console.log(projects);
    projects.forEach(function(project) {
        let table = `
        <table class="table table-striped table-hover table-sm">
            <tr>
                <th colspan="2" class="text-center h4"> Project ID # ${project.id}</th>
            </tr>
            <tr>
                <th>Name:</th>
                <td>${project.name}</td>
            </tr>
            <tr>
                <th>Budget:</th>
                <td>${project.budget}</td>
            </tr>
            <tr>
                <th>Start Date:</th>
                <td>${project.startdate}</td>
            </tr>
            <tr>
                <th>Duration:</th>
                <td>${project.duration}</td>
            </tr>
            <tr>
                <th>Number Employees:</th>
                <td>${project.numemployees}</td>
            </tr>
            <tr>
                <td colspan="2">
                    <a href="javascript:editProject(${project.id})" class="btn btn-sm btn-primary">Edit</a>
                    <a href="javascript:removeProject(${project.id})" class="btn btn-sm btn-danger">Delete</a>
                </td>
            </tr>
        </table>
        `;
        projectlist.innerHTML += table;
    });
}

// Save Project
const saveProject = () => {
    let projectdata           = {};
    let sendMethod            = project_method.value;
    let url                   = '/api/projects'
    projectdata.id            = project_id.value;
    projectdata.name          = project_name.value;
    projectdata.budget        = project_budget.value;
    projectdata.startdate     = project_startdate.value;
    projectdata.duration      = project_duration.value;
    projectdata.numemployees  = project_numemployees.value;
    if (sendMethod == "PATCH") {
        url += '/' + projectdata.id;
    }
    fetch(url, {
        method: sendMethod,
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
        body: JSON.stringify(projectdata),
    })
    .then(response => {
        initForms();
        projectlist.innerHTML = "";
        getProjects();
    });
    return false;
}

// Edit Project
const editProject = (id) => {
    fetch('/api/projects/' + id, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + access_token,
        }
    })
    .then(response => response.json())
    .then(data => {
        let project                = data.project;
        project_id.value           = project.id;
        project_method.value       = 'PATCH';
        project_name.value         = project.name;
        project_budget.value       = project.budget;
        project_startdate.value    = project.startdate;
        project_duration.value     = project.duration;
        project_numemployees.value = project.numemployees;
    });
}

// Delete Project
const removeProject = (id) => {
    if(confirm('You really want to delete this Project ?')) {
        let projectdata = {};
        projectdata.id  = id;

        fetch('/api/projects/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
            body: JSON.stringify(projectdata),
    })
    .then(response => {
        initForms();
        projectlist.innerHTML = "";
        getProjects();
    });
        return false;
    }
}

// Init Forms
const initForms = () => {
    // Login
    login_email.value           = "";
    login_password.value        = "";
    // Register
    name.value                  = "";
    email.value                 = "";
    password.value              = "";
    password_confirmation.value = "";
    // Project
    project_name.value          = "";
    project_budget.value        = "";
    project_startdate.value     = "";
    project_duration.value      = "";
    project_numemployees.value  = "";
    // Others
    project_id.value            = "";
    project_method.value        = "POST";
}

if (localStorage.getItem('user_email') !== null) {
    initForms();
    access_token         = localStorage.getItem('user_token');
    user_email.innerText = localStorage.getItem('user_email');
    loginform.style.display   = 'none';
    projectform.style.display = 'block';
    navbar.style.display      = 'block';
    getProjects();
}






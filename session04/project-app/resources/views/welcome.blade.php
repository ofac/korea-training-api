@extends('layouts.app')

@section('title', 'Project Manager')

@section('content')
    <div class="row align-items-center g-5 py-5">
        {{-- LIST PROJECTS --}}
        <div class="col-lg-7 text-center text-lg-start">
            <h1 class="display-4 fw-bold lh-1 mb-4">Project Manager</h1>
            <p id="projectlist" class="col-lg-10"></p>
        </div>
        {{-- LOGIN --}}
        <div id="loginform" class="col-10 mx-auto col-lg-5">
            <form class="p-5 border rounded-3 bg-light" onsubmit="return logIn();">
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="login_email" placeholder="name@example.com" value="admin@gmail.com" required>
                    <label for="login_email">Email address</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="login_password" placeholder="Password" value="admin" required>
                    <label for="login_password">Password</label>
                </div>
                <button class="w-50 btn btn-lg btn-primary" type="submit">Log in</button>
                <a href="javascript:registUser()" class="w-40 btn btn-lg btn-secondary">Sign up</a>
            </form>
        </div>
        {{-- REGISTER --}}
        <div id="signupform" class="col-10 mx-auto col-lg-5" style="display: none;">
            <form class="p-5 border rounded-3 bg-light" onsubmit="return signUp();">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="name" placeholder="name" required>
                    <label for="name">Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="email" placeholder="name@example.com" required="">
                    <label for="email">Email address</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="password" placeholder="Password" required>
                    <label for="password">Password</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="password_confirmation" placeholder="Password" required>
                    <label for="password_confirmation">Password Confirm</label>
                </div>
                <button class="w-50 btn btn-lg btn-primary" type="submit">Sign up</button>
                <a href="javascript:closeRegist()" class="w-40 btn btn-lg btn-secondary">Close</a>
            </form>
        </div>
        {{-- ADD PROJECT --}}
        <div id="projectform" class="col-10 mx-auto col-lg-5" style="display: none;">
            <form class="p-5 border rounded-3 bg-light" onsubmit="return saveProject();">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="project_name" placeholder="project name" required>
                    <label for="name">Project Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="project_budget" placeholder="project budget" required>
                    <label for="name">Project Budget</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="date" class="form-control" id="project_startdate" placeholder="project start date" required>
                    <label for="name">Project Start Date</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="project_duration" placeholder="project duration" required>
                    <label for="name">Project Duration</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="project_numemployees" placeholder="project numemployees" required>
                    <label for="name">Project Number Employees</label>
                </div>
                <input type="hidden" id="project_id">
                <input type="hidden" id="project_method" value="POST">
                <button class="w-100 btn btn-lg btn-primary" type="submit">Save Project</button>
            </form>
        </div>
    </div>
@endsection
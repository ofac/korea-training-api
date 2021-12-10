<template>
	<div class="listContainer">
		<div class="heading">
			<h2 id="title">Project List</h2>
			<add-project-form v-on:reloadlist="getList()" v-if="isLogin == true" />
		</div>
		<list-view 
			:projects="projects" 
			v-on:reloadlist="getList()"
			/>
		<div id="loginform" v-bind:class="[ isLogin ? 'hide' : 'show' ]">
			<form v-on:submit.prevent="loginUser">
				<p class="h4 text-center mb-4">Sign in</p>
				<div class="grey-text">
					<input placeholder="email" id="email" type="email" ref="email" value="admin@gmail.com"/>
					<input placeholder="password" id="password" type="password" ref="password" value="admin"/>
				</div>
				<div class="text-center">
					<button>Login</button>
				</div>
			</form>
		</div>	
		<div id="regform" v-bind:class="[ isLogin ? 'hide' : 'show' ]">
			<form v-on:submit.prevent="registerUser">
				<p class="h4 text-center mb-4">Sign Up</p>
				<div class="grey-text">
					<input placeholder="name" id="name" type="text" ref="iname" />
					<input placeholder="email" id="email" type="email" ref="iemail" />
					<input placeholder="password" id="password" type="password" ref="ipassword" />
					<input placeholder="password_confirmation" id="password_confirmation" type="password" ref="ipassword_confirmation" />
				</div>
				<div class="text-center">
					<button>Register</button>
				</div>
			</form>
		</div>	
		<div v-if="isLogin == true">
		  <button v-on:click="closeSesion()">Close Session</button>
		</div>	
	</div>

</template>
<script>
import addProjectForm from "./addProjectForm"
import listView from "./listView"
export default {
	components: {
		addProjectForm,
		listView
	},
	data: function () {
		return {
			projects: [],
			isLogin: false,
			token: ''
		}
	},
	methods: {
		closeSesion() {
			this.isLogin = false;
			this.token   = '';
			localStorage.clear();
			window.location.replace('/');
		},
		getList () {
			let headers = {
					'headers': {
						'Content-Type':  'application/json;charset=utf-8',
    					'Accept':        'application/json',
    					'Authorization': 'Bearer ' + localStorage.token						
					}
				};
			axios.get('/api/projects', headers)
			.then(response => {
				this.projects = response.data.projects
			})
			.catch( error => {
				console.log( error )
			})
		},
		loginUser() {
			let headers = {
				'headers': {
    				'Content-Type': 'application/json;charset=utf-8',
    				'Accept':       'application/json'
    			}
  			};
			var email    = this.$refs.email.value;
			var password = this.$refs.password.value;
			axios.post('/api/login', {
				email:    email,
				password: password
			}, headers)
			.then(response => {
				let user = response.data;
				let access_token = user.access_token;
				localStorage.token = access_token;
				console.log(localStorage.token);
				this.isLogin = true;
				this.getList();
			})
			.catch ((err) => {
				console.log (err)
			})
		},
		registerUser() {
			let headers = {
				'headers': {
    				'Content-Type': 'application/json;charset=utf-8',
    				'Accept':       'application/json'
    			}
  			};
  			var name                  = this.$refs.iname.value;
			var email                 = this.$refs.iemail.value;
			var password              = this.$refs.ipassword.value;
			var password_confirmation = this.$refs.ipassword_confirmation.value;
			axios.post('/api/register', {
				name:                  name,
				email:                 email,
				password:              password,
				password_confirmation: password_confirmation
			}, headers)
			.then(response => {
				window.location.replace('/');
			})
			.catch ((err) => {
				console.log (err)
			})
		}
	},
	created() {
		if (localStorage.token) {
			this.isLogin = true;
			this.token   = localStorage.access_token;
			this.getList();
		} else {
			this.isLogin = false;
			this.token   = '';
		}
	}	
}
</script>
<style scoped>
    * {
        color: #777;
        font-family: Poppins; 
        font-weight: 400;
    }
    p.h4 {
        font-weight: 800;
        margin: 20px 0px 4px 0px;
    }
    input {
        border: 1px solid #ddd;
        border-radius: 4px;
        font-family: Poppins; 
        font-weight: 400;
        padding: 4px 8px;
        width: 44.8%;
    }
    button {
        background-color: #555;
        border: none;
        border-radius: 4px;
        color: #fff;
		cursor: pointer;
        font-family: Poppins; 
        font-weight: 400;
        padding: 4px 8px;
    }
	.listContainer {
		width: 400px;
		margin: 4rem auto;
	}
	.heading {
		background: #ddd;
		padding: 10px;
	}
	#title {
		text-align: center;
	}
	.hide { display: none; }
	.show { display: block; }
</style>

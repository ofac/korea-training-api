<template>
	<div class="addProject">
		<input type="text"   placeholder="Name"             v-model="project.name"         />
		<input type="number" placeholder="Budget"           v-model="project.budget"       />
		<input type="date"   placeholder="Start Date"       v-model="project.startdate"    />
		<input type="number" placeholder="Duration"         v-model="project.duration"     />
		<input type="number" placeholder="Number Employees" v-model="project.numemployees" />
		<button :disabled="isDisabled" @click="addProject()" class="plus-square">
			<font-awesome-icon icon="plus-square" /> Add
		</button>
	</div>
</template>
<script>
export default {
	data: function () {
		return {
			project: {
				name:         '',
				budget:       '',
				startdate:    '',
				duration:     '',
				numemployees: ''
			}
		}
	},
	computed: {
      isDisabled() {
        if( this.project.name          != '' &&
		    this.project.budget        != '' && 
			this.project.startdate     != '' && 
			this.project.duration      != '' && 
			this.project.numemployees  != '') {
			return false;
		} else {
			return true;
		}
      },
    },
	methods: {
		addProject() {
			let headers = {
					'headers': {
						'Content-Type':  'application/json;charset=utf-8',
    					'Accept':        'application/json',
    					'Authorization': 'Bearer ' + localStorage.token						
					}
				};			
			if( this.project.name == '' ) return;
			axios.post('api/projects', {
				name:         this.project.name,
				budget:       this.project.budget,
				startdate:    this.project.startdate,
				duration:     this.project.duration,
				numemployees: this.project.numemployees
			}, headers)
			.then( response => {
				if( response.status == 201 ) {
					this.project.name         = '';
					this.project.budget       = '';
					this.project.startdate    = '';
					this.project.duration     = '';
					this.project.numemployees = '';
					this.$emit('reloadlist');
				}
			})
			.catch(error => {
				console.log(error);
			})
		}
	}
}	
</script>
<style scoped>
input {
	border: 1px solid #ddd;
	border-radius: 4px;
	font-family: Poppins; 
	font-weight: 400;
	padding: 4px 8px;
	width: 42.8%;
}
button {
	background-color: #555;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	color: #fff;
	font-family: Poppins; 
	font-weight: 400;
	padding: 4px 8px;
}
button:disabled {
	cursor: not-allowed;
	opacity: .2;
}
</style>
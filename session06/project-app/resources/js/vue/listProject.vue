<template>
	<div class="project">
        <p>
            <strong>Name: </strong>
			<input type="text" v-model="project.name">
        </p>
		<p>
            <strong>Budget: </strong>
			<input type="number" v-model="project.budget">
        </p>
        <p>
            <strong>Start Date: </strong>
			<input type="date" v-model="project.startdate">
        </p>
        <p>
            <strong>Duration: </strong>
			<input type="number" v-model="project.duration">
        </p>
        <p>
            <strong>Employees: </strong>
			<input type="number" v-model="project.numemployees">
        </p>
		<button @click="updateProject()" class="pen">
			<font-awesome-icon icon="pen" />
		</button>
		<button @click="removeProject()" class="trashcan">
			<font-awesome-icon icon="trash" />
		</button>
	</div>
</template>
<script>
export default {
	props: ['project'],
	methods: {
		removeProject() {		
			//console.log(localStorage.token);
			if(confirm('Are you sure to delete this project ?')) {
				let headers = {
					'headers': {
						'Content-Type': 'application/json;charset=utf-8',
						'Accept': 'application/json',
						'Authorization': 'Bearer ' + localStorage.token						
					}
				};
				axios.post('api/projects/' + this.project.id, {
					project: this.project,
					_method: "DELETE"
				}, headers)
				.then( response => {
					if( response.status == 200 ) {
						this.$emit('projectchanged');
					}
				})
				.catch( error => {
					console.log( error );
				})
			}
		},
		updateProject() {
			let headers = {
				'headers': {
					'Content-Type': 'application/json;charset=utf-8',
					'Accept': 'application/json',
					'Authorization': 'Bearer ' + localStorage.token						
				}
			};
			axios.put('api/projects/' + this.project.id, {
				//project: this.project,
				name:         this.project.name,
				budget:       this.project.budget,
				startdate:    this.project.startdate,
				duration:     this.project.duration,
				numemployees: this.project.numemployees
			}, headers)
			.then( response => {
				if( response.status == 200 ) {
					this.$emit('projectchanged');
				}
			})
			.catch( error => {
				console.log( error );
			})
		}
	}

}	
</script>
<style scoped>
	.project {
		position: relative;
	}
	p {
		margin: 0px 4px;
        font-weight: 400;
        font-size: 0.8rem;
	}
	strong {
		display: inline-block;
		width: 6rem;
	}
	input {
        border: 1px solid #ddd;
        border-radius: 4px;
        font-family: Poppins; 
        font-weight: 400;
        padding: 4px 8px;
        width: 32%;
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
		position: absolute;
		top: 10px;
		right: 10px;
	}
	.pen {
		right: 40px;
	}
</style>
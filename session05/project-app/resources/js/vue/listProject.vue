<template>
	<div class="project">
        <p>
            <strong>Name: </strong><span> {{ project.name }} </span>
        </p>
		<p>
            <strong>Budget: </strong><span> {{ project.budget }} </span>
        </p>
        <p>
            <strong>Start Date: </strong><span> {{ project.startdate }} </span>
        </p>
        <p>
            <strong>Duration: </strong><span> {{ project.duration }} </span>
        </p>
        <p>
            <strong>Number Employees: </strong><span> {{ project.numemployees }} </span>
        </p>
	</div>
</template>
<script>
export default {
	props: ['project'],
	methods: {
		removeProject() {		

		}
	}

}	
</script>
<style scoped>
	.project {
		position: relative;
	}
	p {
		margin: 4px;
        font-weight: 400;
        font-size: 0.8rem;
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
	.trashcan {
		right: 40px;
	}
</style>
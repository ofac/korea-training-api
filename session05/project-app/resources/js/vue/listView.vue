<template>
	<div>
		<div v-for="(project, index) in projects" :key="index">
			<list-project
				:project="project"
				class="project"
				v-on:projectchanged="$emit('reloadlist')"
			 	/>
		</div>
	</div>
</template>
<script>
import listProject from "./listProject"
export default {
	props: ['projects'], 
	components: {
		listProject
	}
}	
</script>
<style scoped>
	.project {
		background: #e6e6e6e6;
		padding: 5px;
		margin-top: 5px;
	}
</style>
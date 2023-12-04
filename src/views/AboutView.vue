<template>
	<div>
		<h2>About View</h2>
		<p>{{ $route.path }}</p>
		<p>{{ $route.name }}</p>
		<button class="btn btn-primary" @click="goAboutPage">home으로 이동</button>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const goAboutPage = () => {
	router.push('/');
};
</script>

<style lang="scss" scoped></style>

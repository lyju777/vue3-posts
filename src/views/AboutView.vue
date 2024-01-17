<template>
	<div>
		<h2>About View</h2>
		<p>{{ $route.path }}</p>
		<p>{{ $route.name }}</p>
		<button class="btn btn-primary" @click="goHomePage">Home으로 이동</button>
		<h2>Store</h2>
		<p>counter:{{ store.counter }}</p>
		<p>doubleCount:{{ store.doubleCount }}</p>
		<button @click="store.increment()">Click!!</button>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useCounterStore } from '@/stores/counter';

const router = useRouter();
const goHomePage = () => {
	router.push('/');
};

const store = useCounterStore();
</script>

<style lang="scss" scoped></style>

<template>
	<div>
		<h2>Home View</h2>
		<p>{{ $route.path }}</p>
		<p>{{ $route.name }}</p>
		<button class="btn btn-primary" @click="goAboutPage">About으로 이동</button>
		<hr class="my-4" />
		<AppGrid :items="items" v-slot="{ item }">
			<AppCard>{{ item }}</AppCard>
		</AppGrid>
		<h2>{{ position }}</h2>
		<h3>x:{{ x }} y:{{ y }}</h3>
	</div>
</template>

<script setup>
import { reactive, ref, toRef } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goAboutPage = () => {
	router.push('/about');
};

const items = ref(['사과', '딸기', '포도', '바나나']);

const position = reactive({
	x: 100,
	y: 1000,
});

const x = toRef(position, 'x');
const y = toRef(position, 'y');
</script>

<style lang="scss" scoped></style>

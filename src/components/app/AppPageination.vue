<template>
	<nav class="mt-5" aria-label="Page navigation example">
		<ul class="pagination justify-content-center">
			<li class="page-item">
				<a
					:class="isPrevPage"
					class="page-link"
					href="#"
					aria-label="Previous"
					@click.prevent="$emit('page', currentPage - 1)"
				>
					<span aria-hidden="true">&laquo;</span>
				</a>
			</li>
			<li
				v-for="page in pageCount"
				:key="page"
				class="page-item"
				:class="{ active: currentPage === page }"
			>
				<a @click.prevent="$emit('page', page)" class="page-link" href="#">{{
					page
				}}</a>
			</li>
			<li class="page-item" :class="isNextPage">
				<a
					@click.prevent="$emit('page', currentPage + 1)"
					class="page-link"
					href="#"
					aria-label="Next"
				>
					<span aria-hidden="true">&raquo;</span>
				</a>
			</li>
		</ul>
	</nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	currentPage: {
		type: Number,
		required: true,
	},
	pageCount: {
		type: Number,
		required: true,
	},
});

defineEmits({});

const isPrevPage = computed(() => ({ disabled: !(props.currentPage > 1) }));
const isNextPage = computed(() => ({
	disabled: !(props.currentPage < props.pageCount),
}));
</script>

<style lang="scss" scoped></style>

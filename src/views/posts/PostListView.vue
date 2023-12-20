<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<postFilter
			v-model:title="params.title_like"
			v-model:limit="params._limit"
		></postFilter>

		<hr class="my-4" />
		<AppGrid :items="posts">
			<template v-slot="{ item }">
				<PostItem
					:title="item.title"
					:content="item.content"
					:createdAt="item.createdAt"
					@click="goPage(item.id)"
					@modal="openModal(item)"
				></PostItem>
			</template>
		</AppGrid>
		<AppPageination
			:current-page="params._page"
			:page-count="pageCount"
			@page="page => (params._page = page)"
		/>
		<Teleport to="#modal">
			<postModal
				v-model="show"
				:title="modalTitle"
				:content="modalContent"
				:created-at="modalCreatedAt"
			/>
		</Teleport>

		<template v-if="posts && posts.length > 0">
			<hr class="my-5" />
			<AppCard>
				<PostDetailView :id="posts[0].id"></PostDetailView>
			</AppCard>
		</template>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import AppPageination from '@/components/AppPageination.vue';
import postFilter from '@/components/posts/postFilter.vue';
import postModal from '@/components/posts/postModal.vue';
import AppGrid from '@/components/AppGrid.vue';
import AppCard from '@/components/AppCard.vue';
import { getPosts } from '@/api/posts';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { watchEffect } from 'vue';
const router = useRouter();
const posts = ref([]);

const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_limit: 3,
	_page: 1,
	title_like: '',
});
// 페이징
const totalCount = ref(0);
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

const fetchPosts = async () => {
	try {
		const { data, headers } = await getPosts(params.value);
		posts.value = data;
		totalCount.value = headers['x-total-count'];
	} catch (error) {
		console.error(error);
	}
};
// fetchPosts();
watchEffect(fetchPosts);

const goPage = id => {
	// router.push(`/posts/${id}`);
	// http://127.0.0.1:5173/posts/2?searchText=hello#wrold
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},
		query: {
			searchText: 'hello',
		},
		hash: '#wrold',
	});
};

//model
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');
const openModal = ({ title, content, createdAt }) => {
	show.value = true;
	modalTitle.value = title;
	modalContent.value = content;
	modalCreatedAt.value = createdAt;
};
</script>

<style lang="scss" scoped></style>

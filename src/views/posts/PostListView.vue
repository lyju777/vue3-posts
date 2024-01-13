<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<postFilter
			v-model:title="params.title_like"
			v-model:limit="params._limit"
		></postFilter>

		<hr class="my-4" />

		<AppLoading v-if="loading"></AppLoading>
		<AppError v-else-if="error" :message="error.message"></AppError>
		<template v-else>
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
		</template>
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

import postFilter from '@/components/posts/postFilter.vue';
import postModal from '@/components/posts/postModal.vue';

import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';
const router = useRouter();

const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_limit: 3,
	_page: 1,
	title_like: '',
});

const {
	response,
	data: posts,
	error,
	loading,
} = useAxios('/posts', { params });

// 페이징
const totalCount = computed(() => response.value.headers['x-total-count']);
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

// const fetchPosts = async () => {
// 	try {
// 		loading.value = true;
// 		const { data, headers } = await getPosts(params.value);
// 		posts.value = data;
// 		totalCount.value = headers['x-total-count'];
// 	} catch (err) {
// 		error.value = err;
// 	} finally {
// 		loading.value = false;
// 	}
// };
// watchEffect(fetchPosts);
// fetchPosts();

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

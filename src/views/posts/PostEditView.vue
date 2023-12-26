<template>
	<div>
		<h2>게시글 수정</h2>
		<hr class="my-4" />
		<PostForm
			v-model:title="form.title"
			v-model:content="form.content"
			@submit.prevent="edit"
		>
			<template #actions>
				<button
					type="button"
					class="btn btn-outline-danger"
					@click="goDetailPage"
				>
					취소
				</button>
				<button class="btn btn-primary">수정</button>
			</template>
		</PostForm>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getPostById, updatePost } from '@/api/posts';
import { ref } from 'vue';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';

const { vAlert, vSuccess } = useAlert();

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const form = ref({
	title: null,
	content: null,
});

const fetchPost = async () => {
	try {
		const { data } = await getPostById(id);
		setForm(data);
	} catch (error) {
		console.error(error);
		vAlert(error.message);
	}
};

const setForm = ({ title, content, createdAt }) => {
	(form.value.title = title),
		(form.value.content = content),
		(form.value.createdAt = createdAt);
};
fetchPost();

const edit = async () => {
	try {
		await updatePost(id, { ...form.value });
		router.push({ name: 'PostDetail', params: { id } });
		vSuccess('수정이 완료 되었습니다!');
	} catch (error) {
		console.error(error);
		vAlert(error.message);
	}
};

const goDetailPage = () => {
	router.push({
		name: 'PostDetail',
		params: { id },
	});
};
</script>

<style lang="scss" scoped></style>

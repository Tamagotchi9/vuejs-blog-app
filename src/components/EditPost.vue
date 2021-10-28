<template>
<suspense>
        <template #default>
          <post-editor />
        </template>
        <template #fallback>
          <loader/>
        </template>
      </suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostEditor from '@/components/PostEditor.vue'
import Loader from '@/components/Loader.vue'

export default defineComponent({
    components: {
        PostEditor,
        Loader
    }
});
</script>

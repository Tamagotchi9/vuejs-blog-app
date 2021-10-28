<template>
<suspense>
        <template #default>
          <post-viewer />
        </template>
        <template #fallback>
          <loader/>
        </template>
      </suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostViewer from '@/components/PostViewer.vue'
import Loader from '@/components/Loader.vue'

export default defineComponent({
    components: {
        PostViewer,
        Loader
    }
});
</script>

<template>
      <suspense>
        <template #default>
          <timeline />
        </template>
        <template #fallback>
          <loader/>
        </template>
      </suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Timeline from "@/components/Timeline.vue";
import Loader from "@/components/Loader.vue";

export default defineComponent({
  name: "App",
  components: {
    Timeline,
    Loader
  },

});
</script>
<template>
    <div class="columns">
        <div class="column">
            <div class="field">
                <div class="label">New Post</div>
                <input 
                type="text" 
                class="input"
                v-model='title'
                data-test="title"
                >
            </div>
        </div>
    </div>

    <div class="columns">
        <div class="column">
                <div 
                contenteditable 
                ref='contentEditable' 
                @input="handleInput" 
                data-test="content"
                />
        </div>
        <div class="column">
                <div v-html="html"></div>
        </div>
    </div>

    <div class="columns">
        <div class="column">
                <button 
                    @click="save"
                    data-test="submit" 
                    class="button is-primary is-pulled-right"
                >
                    Submit
                </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Post } from "@/mocks";
import { defineComponent, onMounted, ref, watch } from "vue";
import {parse} from 'marked'
import highlight from 'highlight.js'
import debounce from 'lodash/debounce'

export default defineComponent({
  name: "App",

  props: {
      post: {
          type: Object as () => Post,
          required: true
      }
  },

  emits: {
      save: (post: Post) => {
        return true      
      }
  },

  setup(props, ctx) {
        const title = ref(props.post.title)
        const contentEditable = ref<HTMLDivElement | null>(null)
        const content = ref(props.post.markdown || '')
        const html = ref('')

        const parseHtml = (str: string) => {
                html.value = parse(str, {
                gfm: true,
                breaks: true,
                highlight: (code: string) => {
                    return highlight.highlightAuto(code).value
                }
            })
        }

        watch(content, debounce((newVal) => {
            parseHtml(newVal)
        }, 250), { immediate: true })

        const handleInput = () => {
            if(!contentEditable.value) {
                throw Error('its not gonna happen')
            }
            content.value = contentEditable.value.innerText || ''
        }

        onMounted(() => {
            if(!contentEditable.value) {
                throw Error('its not gonna happen')
            }
            contentEditable.value.textContent = content.value
        })

        const save = () => {
            const newPost: Post = {
                ...props.post,
                title: title.value,
                html: html.value,
                markdown: content.value
            }

            ctx.emit('save', newPost)
        }

    return {
        save,
        html,
        title,
        contentEditable,
        content,
        handleInput
    }
  }
});
</script>

<style>

</style>

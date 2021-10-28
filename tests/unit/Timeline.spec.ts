import { flushPromises, mount, RouterLinkStub } from '@vue/test-utils'
import Timeline from '@/components/Timeline.vue'  
import { today, thisWeek, thisMonth } from '@/mocks'
import { Store } from '@/store'

jest.mock('axios', () => ({
  get: (url: string) => {
    return Promise.resolve({
      data: [today, thisWeek, thisMonth]
    })
  }
}))

function mountTimeline() {
  const store = new Store({
    posts: {
      ids: [],
      all: new Map(),
      loaded: false,
    },
    authors: {
      ids: [],
      all: new Map(),
      loaded: false,
      currentUserId: undefined
    }
  })

  const testComp = {
    components: { Timeline },
    template: `
      <suspense>
        <template #default>
          <timeline />
        </template>
        <template #fallback>
          Loading...
        </template>
      </suspense>
    `
  }

  return mount(testComp, {
    global: {
      components: {
        RouterLink: RouterLinkStub
      },
      plugins: [store] 
    }
  })
}

describe('Timeline', () => {
  it('renders today post default', async () => {
    const wrapper = mountTimeline()
    await flushPromises()
    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
  })

  it('update when the weekly period is click', async () => {
    const wrapper = mountTimeline()
    await flushPromises()

    await wrapper.get('[data-test="This Week"]').trigger('click')

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
  })

  it('update when the monthly period is click', async () => {
    const wrapper = mountTimeline()
    await flushPromises()

    await wrapper.get('[data-test="This Month"]').trigger('click')

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisMonth.created.format('Do MMM'))
  })
})
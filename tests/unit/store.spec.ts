import { Post, today } from '@/mocks'
import { Store, State } from '@/store'

const mockPost: Post = {
    ...today
}

jest.mock('axios', () => ({
    get: () => {
        return {
            data: [mockPost]
        }
    }
}))

describe('store/fetchPosts', () => {
    it('fetches post and updates state', async () => {
        const store = new Store ({
            posts: {
                ids: [],
                all: new Map(),
                loaded: true
            },
            authors: {
                ids: [],
                all: new Map(),
                loaded: false,
                currentUserId: undefined
            }
        })

        await store.fetchPosts()

        const expected: State = {
            posts: {
                ids: ['1'],
                all: new Map([['1', mockPost]]),
                loaded: true
            },
            authors: {
                ids: [],
                all: new Map(),
                loaded: false,
                currentUserId: undefined
            }
        }

        expect(expected).toEqual(store.getState())
    })
})
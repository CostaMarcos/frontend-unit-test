import Avaliador from '@/views/Avaliador';
import { mount, RouterLinkStub } from '@vue/test-utils';
import { getLeiloes } from '@/http';
import flushPromises from 'flush-promises';

jest.mock('@/http')

const leiloes = [
    { 
        produto: 'Um livro da casa do código',
        lanceInicial: 49,
        descricao: 'Livro'
    },
    { 
        produto: 'Um livro da casa do código',
        lanceInicial: 49,
        descricao: 'Livro'
    }
]

describe('It should connect to the API', () => {
    test('It should list auctions returned by API', async() => {
        getLeiloes.mockResolvedValueOnce(leiloes);
        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        });
        await flushPromises();
        const auctions = wrapper.findAll('.leilao').length;
        expect(auctions).toBe(leiloes.length)
    })

    test('It should list none auctions returned by API', async() => {
        getLeiloes.mockResolvedValueOnce([]);
        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        });
        await flushPromises();
        const auctions = wrapper.findAll('.leilao').length;
        expect(auctions).toBe(0)
    })
})  
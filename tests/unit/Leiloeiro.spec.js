import Leiloeiro from '@/views/Leiloeiro';
import { mount } from '@vue/test-utils';
import { getLeilao, getLances } from '@/http';
import flushPromises from 'flush-promises';

jest.mock('@/http');

const leilao = {
    produto: 'Livro da casa do código',
    lanceInicial: 50, 
    descricao: 'Livro bem bacana sobre Vue'
}

const lances = [
    {
        id: 1,
        valor: 1001,
        data: '2020-01-01T00:00:00.000z',
        leilao_id: 1
    },
    {
        id: 2,
        valor: 1002,
        data: '2020-01-01T00:00:00.000z',
        leilao_id: 1
    },
    {
        id: 3,
        valor: 1003,
        data: '2020-01-01T00:00:00.000z',
        leilao_id: 1
    }
]

describe('It should start a new auction', () => {
    test('It should warning that dont have bids', async () => {

        getLeilao.mockResolvedValueOnce(leilao);
        getLances.mockResolvedValueOnce([]);

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        });

        await flushPromises();

        const alert = wrapper.find('.alert-dark');

        expect(alert.exists()).toBe(true);
    });
});

describe('It should list bids', () => {
    test('It should show message "sem lances"', async () => {
        getLeilao.mockResolvedValueOnce(leilao);
        getLances.mockResolvedValueOnce(lances);

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        });

        await flushPromises();
        const alert = wrapper.find('.alert-dark');
        expect(alert.exists()).toBe(false);
    });
})

describe('It should verify minimum value bid and maximum value bid', () => {
    test('It should verify maximum value bid', async() => {
        getLeilao.mockResolvedValueOnce(leilao);
        getLances.mockResolvedValueOnce(lances);

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        });

        await flushPromises();
        const bid = wrapper.find('.maior-lance');
        expect(bid.element.textContent).toContain('Maior lance: R$ 1003')
    })

    test('It should verify minimum value bid', async() => {
        getLeilao.mockResolvedValueOnce(leilao);
        getLances.mockResolvedValueOnce(lances);

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        });

        await flushPromises();
        const bid = wrapper.find('.menor-lance');
        expect(bid.element.textContent).toContain('Menor lance: R$ 1001')
    })
})
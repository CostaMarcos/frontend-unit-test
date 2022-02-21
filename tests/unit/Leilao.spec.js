import Leilao from '@/components/Leilao';
import { mount } from '@vue/test-utils';

const leilao = { 
    produto: 'Um livro da casa do código',
    lanceInicial: 49,
    descricao: 'Livro'
}

describe('It should insert form data', () => {
    test('It should list auction card data', () => {
        const wrapper = mount(Leilao, {
            propsData: {
                leilao
            }
        });

        const header = wrapper.find('.card-header').element;
        const title = wrapper.find('.card-title').element;
        const text = wrapper.find('.card-text').element;
        
        expect(header.textContent).toContain(`Estamos leiloando um(a): ${leilao.produto}`);
        expect(title.textContent).toContain(`Lance inicial: R$ ${leilao.lanceInicial}`);
        expect(text.textContent).toContain(leilao.descricao);
    })
})
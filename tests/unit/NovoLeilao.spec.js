import NovoLeilao from '@/views/NovoLeilao';
import { mount } from '@vue/test-utils';
import { createLeilao } from '@/http';

jest.mock('@/http');

const $router = {
    push: jest.fn()
}

describe('it should create a new auction', () => {
    test('it should fill the form and perform creation', () => {
        createLeilao.mockResolvedValueOnce()
        const wrapper = mount(NovoLeilao, {
            mocks: {
                $router
            }
        });

        wrapper.find('.produto').setValue('Livro da casa do código');
        wrapper.find('.descricao').setValue('Um livro de programacao');
        wrapper.find('.valor').setValue(50);
        wrapper.find('form').trigger('submit');

        expect(createLeilao).toHaveBeenCalled()
    })
})
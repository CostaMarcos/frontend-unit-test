import Lance from '@/components/Lance';
import { mount } from '@vue/test-utils';

test('Inserts a bid less than zero', () => {
    const wrapper = mount(Lance);

    const input = wrapper.find('input');
    input.setValue(-10);
    const emittedBids = wrapper.emitted('novo-lance');
    wrapper.trigger('submit');
    expect(emittedBids).toBeUndefined();

    // expect that wrapper exists
    // expect(wrapper).toBeTruthy();
});


test('Inserts a bid equals zero', () => {
    const wrapper = mount(Lance);
    const input = wrapper.find('input');
    input.setValue(0);
    const emittedBids = wrapper.emitted('novo-lance');
    wrapper.trigger('submit');
    expect(emittedBids).toBeUndefined();
});


test('Inserts a bid more than zero', () => {
    const wrapper = mount(Lance);

    const input = wrapper.find('input');
    input.setValue(10);
    wrapper.trigger('submit');
    const emittedBids = wrapper.emitted('novo-lance');
    expect(emittedBids).toHaveLength(1);
});

test('Inserts a valid bid', () => {

    const validValue = 100;

    const wrapper = mount(Lance);
    const input = wrapper.find('input');
    input.setValue(validValue);
    wrapper.trigger('submit');
    const emittedBids = wrapper.emitted('novo-lance');
    const bid = parseInt(emittedBids[0][0]);

    expect(bid).toBe(validValue);
});

describe('bid with minimum value', () => {
    test('All bids need to be more than minimum value', () => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        });

        const input = wrapper.find('input');
        input.setValue(400);
        wrapper.trigger('submit');
        const emittedBids = wrapper.emitted('novo-lance');
        expect(emittedBids).toHaveLength(1);
    });

    test('Inserts bid and validate value', () => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        });

        const input = wrapper.find('input');
        input.setValue(400);
        wrapper.trigger('submit');
        const emittedBids = wrapper.emitted('novo-lance');
        const insertedBid = parseInt(emittedBids[0][0]);
        expect(insertedBid).toBe(400);
    });

    test('Inserts value less than minimum value', async() => { 
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        });

        const input = wrapper.find('input');
        input.setValue(100);
        wrapper.trigger('submit');
        
        await wrapper.vm.$nextTick();
        const error = wrapper.find('p.alert').element;
        expect(error).toBeTruthy();                
    });

    test('Validate error for values lass than minimum', async() => { 
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        });

        const input = wrapper.find('input');
        input.setValue(100);
        wrapper.trigger('submit');
        
        await wrapper.vm.$nextTick();
        const error = wrapper.find('p.alert').element.textContent;
        const msgError = 'O valor mínimo para o lance é de R$ 300';
        expect(error).toContain(msgError);                
    });
}); 
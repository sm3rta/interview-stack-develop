import React from "react";
import { create, ReactTestRenderer} from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  let tree: ReactTestRenderer;
  beforeEach(() => {
    tree = create(
        <MemoryRouter>
            <Header links={[{ label: 'test', url: '/test/' }]}/>
        </MemoryRouter>
    );
  });
  afterEach(() => {
    tree.unmount();
  });
  it('rendersMainIcon', async () => {
    const testInstance = tree.root;
    await testInstance.findByProps({ 'data-testid': 'header-container-div'});
    await testInstance.findByProps({ 'data-testid': 'main-icon'});
    await testInstance.findByProps({ 'data-testid': 'link-0'});
  });
});
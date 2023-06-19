import React from 'react';
import { create, ReactTestRenderer} from 'react-test-renderer';
import MainIcon from './MainIcon';

describe('MainIcon', () => {
  let tree: ReactTestRenderer;
  beforeEach(() => {
    tree = create(<MainIcon />);
  });
  afterEach(() => {
    tree.unmount();
  });
  it('rendersMainIcon', async () => {
    const testInstance = tree.root;
    await testInstance.findByProps({ 'data-testid': 'icon-container-div'});
  });
});

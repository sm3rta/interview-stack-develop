import React from "react";
import { create, ReactTestRenderer} from 'react-test-renderer';
import Spinner from './Spinner';

describe('DraggableItem', () => {
  let tree: ReactTestRenderer;
  beforeEach(() => {
    tree = create(<Spinner />);
  });
  afterEach(() => {
    tree.unmount();
  });
  it('rendersDraggableItem', async () => {
    const testInstance = tree.root;
    await testInstance.findByProps({ 'data-testid': `spinner-container`});
  });
});
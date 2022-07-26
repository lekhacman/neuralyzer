import { createDot } from './dot';

describe('Dot', function () {
  it('should create', function () {
    expect(createDot('https://localhost')).not.toBeNull();
  });
});

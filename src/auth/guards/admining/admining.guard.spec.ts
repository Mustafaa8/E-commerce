import { AdminingGuard } from './admining.guard';

describe('AdminingGuard', () => {
  it('should be defined', () => {
    expect(new AdminingGuard()).toBeDefined();
  });
});

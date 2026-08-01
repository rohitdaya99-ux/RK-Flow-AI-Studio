export interface PremiereState {

  projectOpen: boolean;
  sequenceOpen: boolean;
  selectionCount: number;

}

export default class PremiereStateStore {

  private state: PremiereState = {
    projectOpen: false,
    sequenceOpen: false,
    selectionCount: 0
  };

  get() {
    return this.state;
  }

  set(state: Partial<PremiereState>) {
    this.state = {
      ...this.state,
      ...state
    };
  }

}

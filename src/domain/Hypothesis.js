import ProposeHypothesis from '../commands/ProposeHypothesis';
import HypothesisProposed from '../events/HypothesisProposed';
import AddContributor from '../commands/AddContributor';
import ContributorIdentified from '../events/ContributorIdentified';

export default class Hypothesis {
  constructor() {
    this._id = null;
    this._contributorId = null;
    this._description = null;
    this._contributors = [];
  }

  hydrate(evt) {
    if (evt instanceof HypothesisProposed) {
      this._onHypothesisProposed(evt);
    }
  }

  _onHypothesisProposed(evt) {
    this._id = evt.hypothesisId;
    this._description = evt.description;
  }

  execute(command) {
    if (command instanceof ProposeHypothesis) {
      return this._propose(command);
    }
    if (command instanceof AddContributor) {
      return this._addContributor(command);
    }
    throw new Error('Unknown command.');
  }

  _propose(command) {
    if (this._hypothesisId) {
      throw new Error('Hypothesis already exists.');
    }
    return new HypothesisProposed(command.hypothesisId, command.description);
  }

  _addContributor(command) {
    if (this._contributorId) {
      throw new Error('Contributor already added.'); 
    }
    return new ContributorIdentified(this._id, command.contributorId, command.name);
  }
};
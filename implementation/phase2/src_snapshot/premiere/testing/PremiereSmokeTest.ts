import PremiereValidator from "../validation/PremiereValidator";

export default class PremiereSmokeTest {

  async run() {

    const validator = new PremiereValidator();

    return {
      passed: await validator.validate()
    };

  }

}

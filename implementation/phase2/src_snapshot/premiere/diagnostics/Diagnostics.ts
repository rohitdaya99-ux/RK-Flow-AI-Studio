export default class Diagnostics {

  check() {

    return {
      timestamp: new Date().toISOString(),
      status: "ok"
    };

  }

}

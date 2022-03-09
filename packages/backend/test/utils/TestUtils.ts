export class TestUtils {
  static getUnitTestPath(dirname: string, klass: { name: string; }) {
    const path = this.getPath(dirname);
    return `${path}.${klass.name}`;
  }
  static getAcceptanceTestPath(dirname: string, title: string) {
    const path = this.getPath(dirname);
    return `${path}/${title}`;
  }

  private static getPath(dirname: string) {
    return dirname
      .split(process.cwd()).join("")
      .split("/test").join("")
      .split("/").join(".")
      .substring(1)
      ;
  }
}
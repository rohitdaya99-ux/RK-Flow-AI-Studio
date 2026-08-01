import TimelineAnalyzer from "../analyzers/TimelineAnalyzer";

(async () => {
  const analyzer = new TimelineAnalyzer();
  console.log(await analyzer.analyze());
})();
